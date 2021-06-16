const {Lobby} = require('./lobby');
const {Socket} = require('socket.io');
const { emit } = require('nodemon');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class Game {
    /**
     * 
     * @param {Lobby} lobby 
     * @param {Socket} io 
     * @param {string} roomid 
     * @param {Map<string, Socket>} sockets
     */
    constructor(lobby, io, roomid, sockets) {
        console.log("new game!")
        this.lobby = lobby;
        this.io = io;
        this.roomid = roomid;
        this.sockets = sockets;
        
        this.state = {
            i: 0,
            phase: 'init', //init, dealing, main, 
            turn: 0, //index for gameState.players
            maxPlayers: this.lobby.state.maxPlayers,
            players: this.lobby.state.players.map((p) => {
                return {id: p.id, name: p.name, hand: {
                    numCards: 0,
                    cards: []
                }}
            })
        }
    }
    
    start() {
        return new Promise(async (resolve, reject) => {
            console.log("starting game!");
            this.emitState();
            await timeout(2000);
            await this.dealHands(7);
            for (let i = 0; i < 10; i++) {
                this.state.i++;
                this.emitState();
                await timeout(1000);
            }
            resolve();
        }) 
        
    }

    
    randomCard() {
        let card = {
            color: null,
            symbol: null
        }
        let symbolid = Math.floor(Math.random() * 15) //10 number cards, reverse, skip, +2, +4 and wildcard
        if (symbolid >= 14) { //wild and +4
            color: 'any';
        } else {
            let colorid = Math.floor(Math.random() * 4);
            switch(colorid) {
                case 0: card.color = 'red'; break;
                case 1: card.color = 'yellow'; break;
                case 2: card.color = 'green'; break;
                case 3: card.color = 'blue'; break;
            }
        }
        switch(symbolid) {
            case 0: card.symbol = '0'; break;
            case 1: card.symbol = '1'; break;
            case 2: card.symbol = '2'; break;
            case 3: card.symbol = '3'; break;
            case 4: card.symbol = '4'; break;
            case 5: card.symbol = '5'; break;
            case 6: card.symbol = '6'; break;
            case 7: card.symbol = '7'; break;
            case 8: card.symbol = '8'; break;
            case 9: card.symbol = '9'; break;
            case 10: card.symbol = 'reverse'; break;
            case 11: card.symbol = 'skip'; break;
            case 12: card.symbol = '+2'; break;
            case 13: card.symbol = '+4'; break;
            case 14: card.symbol = 'wild'; break;
        }
        
        return card;
        
    }

    getPlayer(id) {
        let player = this.state.players.find((v) => (v.id == id));
        if (typeof player == 'undefined') {
            return null;
        } else {
            return player;
        }
    }

    filterState(id) {

        let newState = JSON.parse(JSON.stringify(this.state)); //Ugly hack but seems to be common practice to deep clone objects


        let thisPlayer = this.getPlayer(id); //Not gonna be deleting elements so we don't have to clone this
        if (thisPlayer == null) throw new Error("id not valid");
        newState.my = thisPlayer; //e.g. gameState.my.hand or gameState.my.name, just sounds cool

        //Dont let players view other players' cards
        newState.players.forEach(p => {
            if (p.id != id) {
                delete p.hand.cards; //No cheaty >:(
            }
        })

        return newState;
    }


    emitState() {
        this.state.players.forEach((p) => {
            let id = p.id;
            this.sockets.get(id).emit('gameState', this.filterState(id));
        });
    }
    
    dealHands(numCards) {
        return new Promise(async resolve => {
            for (let i = 0; i < numCards; i++) {
                for (let p = 0; p < this.state.players.length; p++) {
                    let card = this.randomCard();
                    let pid = this.state.players[p].id;
                    this.state.players[p].hand.numCards++;
                    this.state.players[p].hand.cards.push(card);
                    this.io.to(this.roomid).emit('card-dealt', pid);
                    this.sockets.get(pid).emit('card-get', card);
                    this.emitState();
                    await timeout(200);
                }
            }


            resolve();
        });
    }

    doTurn() {

    }

    nextTurn() {

    }
    /**
     * 
     * @param {Socket} to 
     * @param {string} msg 
     */
    sendError(to, msg) {
        to.emit('game-error', {msg: msg});
    }
}

module.exports = Game;