import React from "react";
import Deck from "./Deck/Deck";
import CardPile from "./CardPile/CardPile";
import GameNavbar from "./GameNavbar/GameNavbar";
import GameTimer from "./GameTimer/GameTimer";

import { Prompt } from "react-router-dom";
import { Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import gameTheme from "./theme/Theme";

import "./gameUI.css";
import DrawCard from "./DrawCard/DrawCard";
import PlayerList from "./PlayerList/PlayerList";

class GameUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      gameState: {
        reversed: false,
        secondsLeft: 5,
        myDeck: [
          { color: "red", value: "5" },
          { color: "yellow", value: "+2" },
          { color: "blue", value: "5" },
          { color: "yellow", value: "+2" },
          { color: "green", value: "5" },
          { color: "green", value: "+2" },
          { color: "red", value: "5" },
          { color: "blue", value: "+2" },
          { color: "green", value: "5" },
          { color: "green", value: "+2" },
          { color: null, value: "W" },
          { color: "blue", value: "+2" },
          { color: "blue", value: "+2" },
          { color: "blue", value: "+2" },
          { color: "blue", value: "+2" },
          { color: "red", value: "5" },
          { color: "yellow", value: "+2" },
          { color: "blue", value: "5" },
          { color: "yellow", value: "+2" },
          { color: "green", value: "5" },
        ],
        cardPile: [{ color: null, value: "W" }],
        currentPlayerIdx: 0,
        players: [
          {
            name: "Ricky",
            numCards: 20,
            active: true,
          },
          {
            name: "JTrops",
            numCards: 5,
            active: false,
          },
          {
            name: "Chowder",
            numCards: 69,
            active: false,
          },
          {
            name: "Tomas",
            numCards: 12,
            active: false,
          },
          {
            name: "8092",
            numCards: 3000,
            active: false,
          },
          {
            name: "bogus",
            numCards: 2,
            active: false,
          },
          {
            name: "Hoodie",
            numCards: 10,
            active: false,
          },
          {
            name: "Churrizo",
            numCards: 8,
            active: false,
          },
          {
            name: "A Really Long Name :) Like seriously tho we should check that names this long aren't allowed cuz it'll probably break the UI",
            numCards: 2,
            active: false,
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        if (this.state.gameState.secondsLeft > 0) {
          const gameStateCpy = this.state.gameState;
          gameStateCpy.secondsLeft--;
          this.setState({ gameState: gameStateCpy });
        } else {
          this.nextTurn();
        }
      }, 1000),
    });
  }

  nextTurn() {
    const gameStateCpy = this.state.gameState;
    gameStateCpy.players[gameStateCpy.currentPlayerIdx].active = false;

    if (gameStateCpy.currentPlayerIdx === gameStateCpy.players.length - 1) {
      gameStateCpy.currentPlayerIdx = 0;
    } else {
      gameStateCpy.currentPlayerIdx++;
    }
    gameStateCpy.players[gameStateCpy.currentPlayerIdx].active = true;
    gameStateCpy.secondsLeft = 5;
    this.setState({ gameState: gameStateCpy });
  }

  render() {
    return (
      <ThemeProvider theme={gameTheme}>
        <Box>
          <Prompt message="Game in progress. Are you sure you want to leave?"></Prompt>
          <GameNavbar></GameNavbar>
          <Box display="flex" className="fullWidth fullHeight" id="game">
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
              <CardPile cards={this.state.gameState.cardPile}></CardPile>
            </Box>
            <Box
              position="absolute"
              bottom="0px"
              left="calc(50% - max(( 100% - (20em * 2)), 30em)/2)"
              width="calc(max(100% - (20em * 2), 30em))"
            >
              <Deck
                cards={this.state.gameState.myDeck}
                playCard={(idx) => {
                  const gameStateCpy = this.state.gameState;
                  const theCard = gameStateCpy.myDeck.splice(idx, 1);
                  gameStateCpy.players[0].numCards -= 1;
                  gameStateCpy.cardPile = gameStateCpy.cardPile.concat(theCard);
                  this.setState({
                    gameState: gameStateCpy,
                  });
                  this.nextTurn();
                }}
                inactive={this.state.gameState.currentPlayerIdx !== 0}
              ></Deck>
            </Box>
            <Box display="flex" flexDirection="column" width="20em" ml="auto">
              <GameTimer seconds={this.state.gameState.secondsLeft}></GameTimer>
            </Box>
            <Box
              position="absolute"
              bottom="calc(var(--card-size-factor) * 18em + 2em)"
              right="calc(var(--card-size-factor) * 10em + 3em)"
            >
              <DrawCard
                inactive={this.state.gameState.currentPlayerIdx !== 0}
              ></DrawCard>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default GameUI;
