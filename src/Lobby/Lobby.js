import React from "react";
import PropTypes from "prop-types";

import { Fade, Box } from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import LobbyJoinMenu from "./LobbyJoinMenu/LobbyJoinMenu";
import LobbyNotFound from "./LobbyNotFound/LobbyNotFound";
import LobbyMain from "./LobbyMain/LobbyMain";

import GameUI from "../GameUI/GameUI";

import lobbyService from "../services/lobbyService";
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
      joined: false,
      lobbyState: null,
      myId: null,
      displayError: false,
      lastError: "",
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
      joined: false,
      lobbyState: null,
      myId: null,
    });
    lobbyService.disconnect();
    lobbyService.connect();
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
          this.showError("Lobby doesnt exist. Try creating one.");
        }
      })
      .catch(() => {
        this.showError("Couldn't check if lobby exists. Backend may be down.");
      });
  }

  componentWillUnmount() {
    lobbyService.leaveLobby();
  }

  setupHandlers() {
    lobbyService.handlers.onError = (e) => {
      console.error("[Lobby Error]", e);
      this.showError(e);
    };

    lobbyService.handlers.onJoined = (userId) => {
      this.setState({ joined: true, myId: userId });
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

  joinLobby(username) {
    this.setState({ username: username });
    lobbyService
      .joinLobby(this.state.lobbyId, username)
      .then((userId) => {
        this.setState({ myId: userId, joined: true });
        this.showError(
          <span>
            Successfully joined lobby {this.state.lobbyId} as{" "}
            <em>{username}</em>
          </span>
        );
      })
      .catch((e) => {});
  }

  startGame() {
    lobbyService.startGame();
  }

  render() {
    console.log("exists: ", this.state.lobbyExists);
    console.log("joined: ", this.state.joined);
    return (
      <Box className="lobby">
        <Box className="lobbyBackground"></Box>
        <Box id="lobby-alerts">
          <Fade in={this.state.displayError}>
            <Alert variant="standard" severity="error">
              {this.state.lastError}
            </Alert>
          </Fade>
        </Box>
        {!this.state.lobbyExists ? (
          <LobbyNotFound
            lobbyId={this.state.lobbyId}
            showError={this.showError.bind(this)}
          />
        ) : !this.state.joined ? (
          <LobbyJoinMenu
            lobbyId={this.state.lobbyId}
            showError={this.showError.bind(this)}
            joinLobby={this.joinLobby.bind(this)}
          />
        ) : this.state.lobbyState && this.state.lobbyState.inProgress ? (
          <GameUI></GameUI>
        ) : (
          this.state.joined &&
          this.state.lobbyState && (
            <LobbyMain
              lobbyId={this.state.lobbyId}
              lobbyState={this.state.lobbyState}
              myId={this.state.myId}
              showError={this.showError.bind(this)}
              lobbyService={lobbyService}
            />
          )
        )}
      </Box>
    );
  }
}

export default Lobby;
