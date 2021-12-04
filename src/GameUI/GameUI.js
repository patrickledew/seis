import React from "react";
import Deck from "./Deck/Deck";
import CardPile from "./CardPile/CardPile";
import GameNavbar from "./GameNavbar/GameNavbar";
import GameTimer from "./GameTimer/GameTimer";
import ColorPrompt from "./ColorPrompt/ColorPrompt";
import { Prompt } from "react-router-dom";
import { Box, Fade } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ThemeProvider } from "@material-ui/core/styles";
import gameTheme from "./theme/Theme";

import "./gameUI.css";
import DrawCard from "./DrawCard/DrawCard";
import PlayerList from "./PlayerList/PlayerList";

import gameService from "../services/gameService";
import PropTypes from "prop-types";
import { Socket } from "socket.io-client";

class GameUI extends React.Component {
  static propTypes = {
    io: PropTypes.instanceOf(Socket).isRequired,
  };

  constructor(props) {
    super(props);

    gameService.bindSocket(props.io);

    this.state = {
      gameState: {
        my: {
          turn: false,
          uid: null,
          deck: [],
        },
        players: [],
        cardPile: [{ color: "red", value: "+2" }],
        timer: 0,
        activeUid: null,
      },
      colorPrompt: false,
      displayError: false,
      lastError: "",
    };
  }

  getPlayer(uid) {
    return this.state.gameState.players.find((p) => p.uid === uid);
  }

  getActivePlayer() {
    return this.getPlayer(this.state.gameState.activeUid);
  }

  setupHandlers() {
    gameService.handlers.onError = (e) => {
      console.error("[Game Error]", e);
      this.showError(e);
    };
    gameService.handlers.onUpdate = (state) => {
      this.setState({ gameState: state });
    };
    gameService.handlers.onColorPrompt = () => {
      this.setState({ colorPrompt: true });
    };
  }

  componentDidMount() {
    this.setupHandlers();
    gameService.ready();
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

  playCard(idx) {
    const card = this.state.gameState.my.deck[idx];
    gameService.playCard(card);
  }

  drawCards() {
    gameService.drawCards();
  }

  render() {
    return (
      <ThemeProvider theme={gameTheme}>
        <Box>
          <Box id="game-alerts" style={{ zIndex: 100 }}>
            <Fade in={this.state.displayError}>
              <Alert variant="standard" severity="error">
                {this.state.lastError}
              </Alert>
            </Fade>
          </Box>
          <Prompt message="Game in progress. Are you sure you want to leave?"></Prompt>
          <GameNavbar></GameNavbar>
          <Box
            display="flex"
            flexDirection="column"
            class="fullHeight"
            id="game"
          >
            <Box width="30em">
              <PlayerList
                players={this.state.gameState.players}
                reversed={this.state.gameState.reversed}
              ></PlayerList>
            </Box>
            <Box
              position="absolute"
              width="20em"
              top="2em"
              left="calc(50% - 20em/2)"
            >
              <CardPile
                cards={this.state.gameState.cardPile}
                myUid={this.state.gameState.my.uid}
              ></CardPile>
              <ColorPrompt
                active={this.state.colorPrompt}
                onChoice={(color) => {
                  gameService.chooseColor(color);
                  setTimeout(() => {
                    this.setState({ colorPrompt: false });
                  }, 500);
                }}
              />
            </Box>
            <Box
              position="absolute"
              bottom="0px"
              left="calc(50% - max(( 100% - (20em * 2)), 30em)/2)"
              width="calc(max(100% - (20em * 2), 30em))"
            >
              <Deck
                cards={this.state.gameState.my.deck}
                playCard={this.playCard.bind(this)}
                inactive={!this.state.gameState.my.turn}
              ></Deck>
            </Box>
            <Box width="20em" ml="auto">
              <GameTimer seconds={this.state.gameState.timer}></GameTimer>
            </Box>
            <Box
              position="absolute"
              bottom="calc(var(--card-size-factor) * 18em + 2em)"
              right="calc(var(--card-size-factor) * 10em + 3em)"
            >
              <DrawCard
                inactive={!this.state.gameState.my.turn}
                onDraw={this.drawCards.bind(this)}
              ></DrawCard>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default GameUI;
