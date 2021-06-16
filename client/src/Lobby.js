import React from 'react';
import Game from './Game';
import {Redirect, Link} from 'react-router-dom';
import io from 'socket.io-client';
class Lobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lobbyExists: undefined,
            lobbyId: props.match.params.id.toUpperCase(),
            gameStarted: false,
            connected: false,
            lobbyState: null,
            myId: null,
            error: null
        }

        console.log("Running in " + process.env.NODE_ENV);

        this.io = io.connect("ws://localhost" + process.env.NODE_ENV === 'development' ? ":4000" : "", { //Should default to using same port as the express server if used in production. If in dev, use 4000
            forceNew: false,
            transports: ['websocket']
        });
    }

    setupListeners() {
        console.log("setting up listeners")
        this.io.on('error', (err) => {
            console.log("[Lobby/Game Error]: ", err.msg);
            this.setState({error: err})
            setTimeout(()=> {
                this.setState({error: null})
            }, 5000);
        }); 
        this.io.on('connect-success', (userId) => {
            this.setState({connected: true, myId: userId});
        });
        this.io.on('lobbyState', (lobbyState) => {
            this.setState({lobbyState: lobbyState});
        });
        this.io.on('kick', () => {
            this.reset();
            this.setState({error: {type: 'kicked', msg: "You were kicked by the lobby leader. Sorry!"}});
            setTimeout(()=> {
                this.setState({error: null})
            }, 10000);
        });
        this.io.on('gamestarting', () => {
            this.setState({gameStarted: true})
        })
        this.io.on('gameending', () => {
            this.setState({gameStarted: false})
        })
    }

    reset() {
        this.setState({
            lobbyId: this.props.match.params.id.toUpperCase(),
            connected: false,
            lobbyState: null,
            myId: null,
            error: null
        });
        this.io = io.connect("ws://localhost" + process.env.NODE_ENV === 'development' ? ":4000" : "", {
            forceNew: false,
            transports: ['websocket']
        });
    }

    getPlayerById(id) {
        if(this.state.lobbyState && this.state.lobbyState.players) {
            let player = this.state.lobbyState.players.find((v) => (v.id == id));
            return (typeof player != 'undefined') ? player : null;
        } else {
            return null;
        }
    }

    amLobbyLeader() {
        let player = this.getPlayerById(this.state.myId);
        if (player == null) return false;
        else return player.isLeader;
    }

    componentDidMount() {
        //Check if lobby actually exists
        fetch(`/api/lobbyexists?id=${this.props.match.params.id.toUpperCase()}`).then(res => {
            res.json().then(exists => {
                this.setState({lobbyExists: exists});
            })
        }).catch((e) => {
            console.log(e);
            this.setState({lobbyExists: false});
        })
    }

    connect() {
        this.setState({error: null})
        let username = document.getElementById('username').value;
        if (username == "") username = document.getElementById('username').placeholder;
        localStorage.setItem("unoclone:lastUsername", username);
        this.setupListeners();
        this.io.emit('joinlobby', this.state.lobbyId, username);
    }

    changeLobbyParam(param, newvalue) {
        this.io.emit('changelobbyparam', param, newvalue);
    }

    kickPlayer(id) {
        this.io.emit('kickplayer', id);
    }

    startGame() {
        this.io.emit('startgame');
    }


    render() {
        let name = localStorage.getItem("unoclone:lastUsername");
        name = name ? name : "User";
        if (this.state.lobbyExists === undefined) {
            return null;
        } else if (this.state.lobbyExists == false) {
            return <Redirect to="/" />; //Redirect if lobby doesn't exist
        } else if (this.state.lobbyExists == true) {

        if (this.state.lobbyState != null && this.state.lobbyState.inProgress == true) {
            return <Game io={this.io}></Game>
        }
        return <div style={{margin: "10px 10px 10px 10px"}}>
                {this.state.error != null ? <pre style={{color: 'red', backgroundColor: 'black'}}> {this.state.error.msg}</pre> : ""}
                <h1>Lobby {this.state.lobbyId} {this.state.lobbyState && this.state.lobbyState.isPrivate ? "[Private]" : ""}</h1> <a href={`/lobby/${this.state.lobbyId}`}>(Link)</a>
                    {this.state.connected && this.state.lobbyState ? <>
                        <p>You are {this.getPlayerById(this.state.myId) != null ? this.getPlayerById(this.state.myId).name : "[error]"}</p>
                        <br />
                        <div style={{backgroundColor: "lightgrey", padding: "10px 10px 10px 10px"}}>
                            <h2>Lobby Settings</h2>
                            <p>Max Players: {this.state.lobbyState.maxPlayers} {this.amLobbyLeader() ? <span><button onClick={this.changeLobbyParam.bind(this, 'maxPlayers', this.state.lobbyState.maxPlayers - 1)}>-</button> / <button onClick={this.changeLobbyParam.bind(this, 'maxPlayers', this.state.lobbyState.maxPlayers + 1)}>+</button></span> : ""}</p>
                            <p>Private Lobby? <input type="checkbox" disabled={!this.amLobbyLeader()} checked={this.state.lobbyState.isPrivate}  onChange={this.changeLobbyParam.bind(this, 'isPrivate', !this.state.lobbyState.isPrivate)}></input></p>
                            <p><button disabled={!this.amLobbyLeader()} onClick={this.startGame.bind(this)}>Start Game</button></p>
                        </div>
                        <h2>Player List:</h2>
                        <ul>
                            {this.state.lobbyState.players.map((v) => <li>{v.name + (v.isLeader ? " [LEADER]" : "")} {this.amLobbyLeader() && !v.isLeader ? 
                                <button onClick={() => {if (window.confirm("U sure bro?")) {
                                    this.kickPlayer(v.id);
                                }}}>Kick</button>: ""}
                            </li>)} 
                        </ul>
                        
                    </> : <div>
                        <p>Username: <input id="username" placeholder={name}></input></p>
                        
                        <button onClick={this.connect.bind(this)}>Join</button>
                        
                        </div>}
                
                </div>
        }
    }


}

export default Lobby;