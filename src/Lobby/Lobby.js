import React from "react";
import PropTypes from "prop-types";

import { Paper, Fade } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import LobbyJoinMenu from "./LobbyJoinMenu/LobbyJoinMenu";

import lobbyService from "../services/lobbyService";
import "../LoginPage/loginPage.scss";
import "./lobby.css";

class Lobby extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string, // The lobby id, passed from react-router's Route component
      }),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      lobbyExists: null,
      lobbyId: props.match.params.id.toUpperCase(),
      gameStarted: false,
      connected: false,
      lobbyState: null,
      myId: null,
      displayError: false,
      lastError: null,
    };

    this.usernameInputRef = React.createRef();

    console.log("Running in " + process.env.NODE_ENV);
  }

  showError(e) {
    this.setState({
      displayError: true,
      lastError: e,
    });
    setTimeout(() => {
      this.setState({
        displayError: false,
      });
    }, 5000);
  }

  reset() {
    this.setState({
      connected: false,
      lobbyState: null,
      myId: null,
    });
    lobbyService.disconnect();
    lobbyService.connect();
  }

  getPlayerById(id) {
    if (this.state.lobbyState && this.state.lobbyState.players) {
      const player = this.state.lobbyState.players.find((v) => v.id === id);
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
    this.setupHandlers();
    // Check if lobby actually exists
    lobbyService
      .checkIfLobbyExists(this.state.lobbyId)
      .then((exists) => {
        if (exists) {
          this.setState({ lobbyExists: true });
          lobbyService.connect(); // Open a socket connection
        } else {
          this.setState({ lobbyExists: false });
        }
      })
      .catch(() => {
        this.showError("Couldn't check if lobby exists. Backend may be down.");
      });
  }

  componentWillUnmount() {}

  setupHandlers() {
    lobbyService.handlers.onError = (e) => {
      console.error("[Lobby Error]", e);
      this.showError(e);
    };

    lobbyService.handlers.onJoined = (userId) => {
      this.setState({ connected: true, myId: userId });
    };

    lobbyService.handlers.onUpdate = (state) => {
      this.setState({ lobbyState: state });
    };

    lobbyService.handlers.onKicked = () => {
      this.reset();
    };

    lobbyService.handlers.onGameStart = () => {
      this.setState({
        lobbyState: { ...this.state.lobbyState, inProgress: true },
      });
    };

    lobbyService.handlers.onGameEnd = () => {
      this.setState({
        lobbyState: { ...this.state.lobbyState, inProgress: false },
      });
    };
  }

  joinLobby() {
    lobbyService
      .joinLobby(this.state.lobbyId)
      .then((userId) => {
        this.setState({ myId: userId, connected: true });
      })
      .catch(() => {});
  }

  startGame() {
    lobbyService.startGame();
  }

  render() {
    return (
      <Paper className="LoginPage fullWidth fullHeight centerVertically centerHorizontally backgroundGradient">
        <Fade in={this.state.displayError} id="lobby-alert">
          <Alert variant="standard" severity="error">
            {this.state.lastError}
          </Alert>
        </Fade>
        {!this.state.connected && (
          <LobbyJoinMenu
            lobbyId={this.state.lobbyId}
            joinLobby={() => {
              this.joinLobby();
            }}
            setUsername={(name) => {
              this.setState({ username: name });
            }}
          ></LobbyJoinMenu>
        )}
      </Paper>
    );
  }
}

export default Lobby;
