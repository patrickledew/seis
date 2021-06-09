const LOBBY_ID_LENGTH = 4;

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1).toUpperCase();
}

class LobbyManager {
    constructor(socketServer) {
        this.lobbies = new Map([['TEST', new Lobby('TEST')]]);
        this.io = socketServer;

        setInterval(() => {
            this.lobbies.forEach((_, k, __) => {
                if (this.isDead(k)) {
                    this.removeLobby(k);
                }
            })
            console.log("Active Lobbies: ", Array.from(this.lobbies.keys()));
        }, 60000); //Every minute, remove dead lobbies
    }

    numLobbies() {
        return this.lobbies.size;
    }

    getLobby(id) {
        return this.lobbies.get(id.toUpperCase());
    } 

    lobbyExists(id) {
        return this.lobbies.has(id.toUpperCase());
    }

    isPrivate(id) {
        if (this.lobbyExists(id)) {
            return this.getLobby(id).getState().isPrivate;
        } else {
            return null;
        }
    }

    isInProgress(id) {
        if (this.lobbyExists(id)) {
            return this.getLobby(id).getState().inProgress;
        } else {
            return null;
        }
    }

    isDead(id) {
        if (this.lobbyExists(id)) {
            return this.getLobby(id).getState().players.length == 0; //No players in lobby
        } else {
            return null;
        }
    }


    //Check if the name you've chosen is already taken or not
    isNameTaken(id, name) {
        if (this.lobbyExists(id)) {
            return this.getLobby(id).getState().players.some((v) => (v.name == name));
        } else {
            return null;
        }
    }

    /**
     * 
     * @param {string} id 
     * @returns {Lobby}
     */
    createLobby(id) {
        if (this.numLobbies() > Math.pow(36, LOBBY_ID_LENGTH)) return null; // Number of concurrent lobbies exceeded ):
        if (id.length)
        if (id == null) {
            do {
                id = randomString(LOBBY_ID_LENGTH);
            } while (this.lobbyExists(id))
        }
        const lobby = new Lobby(id, this.io);
        this.lobbies.set(id.toUpperCase(), lobby);
        return lobby;
    }

    removeLobby(id) {
        if (this.lobbyExists(id)) {
            this.getLobby(id).kickAll();
            this.lobbies.delete(id.toUpperCase());
        }
    }
}

class Lobby {
    constructor(id, socketServer) {
        //Sent periodically to clients to update them on lobby parameters, connected players, etc.
        this.state = {
            id: id,
            isPrivate: false,
            inProgress: false,
            maxPlayers: 4,
            players: [],
        };

        this.sockets = new Map();
        /**
         * @type {Server}
         */
        this.io = socketServer;
    }
    getState() {
        return this.state;
    }
    /**
     * @param {Socket} socket 
     */
    addPlayer(socket, name) {
        let userId;
        do {
            userId = randomString(6);
        } while (this.getPlayer(userId) != null)
        this.state.players.push({id: userId, name: name, isLeader: this.state.players.length == 0 ? true : false}); // If player is first to join, they are automatically leader
        this.sockets.set(userId, socket);
        socket.join(this.state.id); //Socket room will have same id as the lobby - used for broadcasts
        socket.emit('connect-success', userId) //Give client userId - it will use it to identify future messages [TODO use socket to id clients instead? problem is it makes it hard to tell clients who did what...]
        this.emitState();
        this.listenTo(socket, userId);
    }

    getPlayer(userId) {
        let player = this.state.players.find((v) => (v.id == userId));
        if (typeof player == 'undefined') {
            return null;
        } else {
            return player;
        }
    }

    emitState() {
        this.io.to(this.state.id).emit('lobbyState', this.state);
    }

    kickPlayer(userId) {
        if (this.state.players.length == 0) return; //how tf u callin this?
        let player = this.getPlayer(userId);
        if (player == null) return;
        console.log("kicking " + player.name)
        if (this.sockets.has(userId)) {
            let poorBastard = this.sockets.get(userId);
            poorBastard.emit('kick');
            poorBastard.disconnect(); //Disconnect will make client send disconnect message - see "socket.on('disconnect' ...)" below.
        }
    }

    //Set up listeners to socket messages associated with a userId
    //Since we call this function when we first add the user, the listeners for one socket will always know what the user id is for that socket. No need for a reverse map.
    listenTo(socket, userId) {
        socket.on('disconnect', () => {
            //Player disconnected from the server/gotten kicked, we should remove them from everything if we haven't already
            if (this.sockets.has(userId)) {
                this.sockets.delete(userId);
            }
            let player = this.getPlayer(userId);
            if (player != null) {
                let playerIdx = this.state.players.indexOf(player);
                if (playerIdx > -1) { // Probably not necessary, just a sanity check
                    if (player.isLeader && this.state.players.length > 1) {
                        this.state.players.splice(playerIdx, 1);
                        this.state.players[0].isLeader = true; //Set another player to be leader
                    } else {
                        this.state.players.splice(playerIdx, 1); //Non-leader disconnected, or it was the last person in the lobby
                    }
                }
            }
            
            this.emitState();
        });
        socket.on('changelobbyparam', (param, newvalue) => {
            if (this.getPlayer(userId).isLeader) {
                switch(param) {
                    case 'maxPlayers': this.state.maxPlayers = (newvalue >= 2 ? newvalue : this.state.maxPlayers); break; //Probably a security vulnerability as we're just blindly setting this with data from the client. Review later.
                    case 'isPrivate': this.state.isPrivate = newvalue; break;
                    default: break;
                }
                this.emitState();
            } else {
                socket.emit('error', {type: 'not-lobby-leader', msg: "Error: You aren't the lobby leader."})
            }
        });
        socket.on('kickplayer', id => {
            console.log("tried to kick");
            if (this.getPlayer(userId).isLeader) {     
                this.kickPlayer(id);
            } else {
                socket.emit('error', {type: 'not-lobby-leader', msg: "Error: You aren't the lobby leader."})
            }
        })
    }


    kickAll() {
        this.state.players = [];
        this.sockets.forEach(s => {
            s.disconnect();
        });
    }
}


module.exports = {LobbyManager, Lobby};