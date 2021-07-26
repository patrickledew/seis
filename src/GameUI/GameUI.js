import React from "react";
import OpponentDeck from "./OpponentDeck/OpponentDeck";
import Deck from "./Deck/Deck";
import CardPile from "./CardPile/CardPile";
import GameNavbar from "./GameNavbar/GameNavbar";
import GameTimer from "./GameTimer/GameTimer";

import { Prompt } from "react-router-dom";
import { Box, Grid} from "@material-ui/core";

import "./gameUI.css";
import DrawCard from "./DrawCard/DrawCard";

class GameUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: {
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
      },
    };
  }

  render() {
    return (
      <Box>
        <Prompt message="Game in progress. Are you sure you want to leave?"></Prompt>
        <GameNavbar></GameNavbar>
        <Box display="flex" className="fullWidth fullHeight" id="game">
          <Box width="20em" className="playerList">

          </Box>
          <Box position="absolute" width="20em" top="2em" left="calc(50% - 20em/2)"><CardPile cards={this.state.gameState.cardPile}></CardPile></Box>
          <Box position="absolute" bottom="0px" left="calc(50% - max(( 100% - (20em * 2) ), 50em)/2)" width="max(calc( 100% - (20em * 2) ), 50em)">
            <Deck
              cards={this.state.gameState.myDeck}
              playCard={(idx) => {
                const theCard = this.state.gameState.myDeck.splice(idx, 1);
                this.setState({
                  gameState: {
                    myDeck: this.state.gameState.myDeck,
                    cardPile: [...this.state.gameState.cardPile, ...theCard],
                  },
                });
              }}
            ></Deck>
          </Box>
          <Box display="flex" flexDirection="column" width="20em" ml="auto">
            <GameTimer></GameTimer>
          </Box>
          <Box position="absolute" bottom="calc(var(--card-size-factor) * 18em + 2em)" right="calc(var(--card-size-factor) * 10em + 3em)">
            <DrawCard></DrawCard>
            </Box>
        </Box>
      </Box>
    );
  }
}

export default GameUI;
