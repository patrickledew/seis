import React from "react";
import RoughGameTest from "../RoughGameTest/RoughGameTest";
import { Redirect } from "react-router-dom";

import lobbySocket from "../services/Lobby/lobbySocket";

import "./lobby.css";

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.loadUsernameFromStorage() || "User",
      lobbyExists: null,
      lobbyId: props.match.params.id.toUpperCase(),
      gameStarted: false,
      connected: false,
      lobbyState: null,
      myId: null,
      error: null,
    };

    console.log("Running in " + process.env.NODE_ENV);
  }

  reset() {
    this.setState({
      connected: false,
      lobbyState: null,
      myId: null,
    });
    lobbySocket.disconnect();
    lobbySocket.connect();
  }

  getPlayerById(id) {
    if (this.state.lobbyState && this.state.lobbyState.players) {
      const player = this.state.lobbyState.players.find((v) => v.id == id);
      return typeof player !== "undefined" ? player : null;
    } else {
      return null;
    }
  }

  amLobbyLeader() {
    const player = this.getPlayerById(this.state.myId);
    if (player == null) return false;
    else return player.isLeader;
  }

  componentDidMount() {
    // Check if lobby actually exists
    lobbySocket.checkIfLobbyExists(this.state.lobbyId).then((exists) => {
      if (exists) {
        this.setState({ lobbyExists: true });
        this.setupHandlers();
        lobbySocket.connect(); // Open a socket connection
      } else {
        this.setState({ lobbyExists: false });
      }
    });
  }

  componentWillUnmount() {}

  setupHandlers() {
    lobbySocket.handlers.onError = (e) => {
      console.error("[Lobby Error]", e);
      this.setState({ displayError: e });
      setTimeout(() => this.setState({ displayError: null }), 5000);
    };

    lobbySocket.handlers.onJoined = (userId) => {
      this.setState({ connected: true, myId: userId });
    };

    lobbySocket.handlers.onUpdate = (state) => {
      this.setState({ lobbyState: state });
    };

    lobbySocket.handlers.onKicked = () => {
      this.reset();
    };

    lobbySocket.handlers.onGameStart = () => {
      this.setState({
        lobbyState: { ...this.state.lobbyState, inProgress: true },
      });
    };

    lobbySocket.handlers.onGameEnd = () => {
      this.setState({
        lobbyState: { ...this.state.lobbyState, inProgress: false },
      });
    };
  }

  loadUsernameFromStorage() {
    return localStorage.getItem("seis:username");
  }

  saveUsernameToStorage(name) {
    localStorage.setItem("seis:username", name);
  }

  joinLobby() {
    const inputUsername = document.getElementById("username").value;

    if (inputUsername != this.state.username) {
      this.saveUsernameToStorage(inputUsername);
      this.setState({ username: inputUsername });
    }

    lobbySocket.joinLobby(this.state.lobbyId, inputUsername);
  }

  startGame() {
    lobbySocket.startGame();
  }

  render() {
    if (this.state.lobbyExists === null) {
      return null;
    } else if (this.state.lobbyExists == false) {
      return <Redirect to="/" />; // Redirect if lobby doesn't exist
    } else if (this.state.lobbyExists == true) {
      if (this.state.lobbyState && this.state.lobbyState.inProgress == true) {
        // If a game has started, use the game ui
        return (
          <div>
            <RoughGameTest io={lobbySocket._getSocket()}></RoughGameTest>
          </div>
        );
      } else {
        // Otherwise use lobby ui
        if (this.state.connected && this.state.lobbyState != null) {
          return (
            <div style={{ margin: "10px 10px 10px 10px" }}>
              {this.state.displayError && (
                <pre style={{ color: "red", backgroundColor: "black" }}>
                  {" "}
                  {this.state.displayError.msg}
                </pre>
              )}
              <h1>
                Lobby {this.state.lobbyId}{" "}
                {this.state.lobbyState && this.state.lobbyState.isPrivate
                  ? "[Private]"
                  : ""}
              </h1>
              <a href={`/lobby/${this.state.lobbyId}`}>(Link)</a>
              <p>You are {this.state.username}</p>
              <br />
              <div
                style={{
                  backgroundColor: "lightgrey",
                  padding: "10px 10px 10px 10px",
                }}
              >
                <h2>Lobby Settings</h2>
                <p>
                  Max Players:
                  {this.state.lobbyState.maxPlayers}
                  {this.amLobbyLeader() && (
                    <span>
                      <button
                        onClick={() =>
                          lobbySocket.setMaxPlayers(
                            this.state.lobbyState.maxPlayers - 1
                          )
                        }
                      >
                        -
                      </button>
                      /
                      <button
                        onClick={() =>
                          lobbySocket.setMaxPlayers(
                            this.state.lobbyState.maxPlayers + 1
                          )
                        }
                      >
                        +
                      </button>
                    </span>
                  )}
                </p>
                <p>
                  Private Lobby?
                  <input
                    type="checkbox"
                    disabled={!this.amLobbyLeader()}
                    checked={this.state.lobbyState.isPrivate}
                    onChange={() =>
                      lobbySocket.setPrivateLobby(
                        !this.state.lobbyState.isPrivate
                      )
                    }
                  ></input>
                </p>
                <p>
                  <button
                    disabled={!this.amLobbyLeader()}
                    onClick={() => lobbySocket.startGame()}
                  >
                    Start Game
                  </button>
                </p>
              </div>
              <h2>Player List:</h2>
              <ul>
                {this.state.lobbyState.players.map((player) => (
                  <li>
                    {player.name + (player.isLeader ? " [LEADER]" : "")}
                    {this.amLobbyLeader() && !player.isLeader && (
                      <button
                        onClick={() => {
                          if (window.confirm("U sure bro?")) {
                            lobbySocket.kickPlayer(player.id);
                          }
                        }}
                      >
                        Kick
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        } else {
          // If not connected to the lobby yet
          return (
            <div style={{ margin: "10px" }}>
              <h1>Lobby {this.state.lobbyId} </h1>
              <a href={`/lobby/${this.state.lobbyId}`}>(Link)</a>
              <p>
                Username:{" "}
                <input id="username" placeholder={this.state.name}></input>
              </p>
              <button onClick={() => this.joinLobby()}>Join</button>
            </div>
          );
        }
      }
    }
  }
}

export default Lobby;
