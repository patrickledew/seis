import React from "react";
import OpponentDeck from "./OpponentDeck/OpponentDeck";
import Deck from "./Deck/Deck";
import CardPile from "./CardPile/CardPile";
import "./gameUI.css";

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
      <div className="game" id="game">
        <div className="playerlist">
          <OpponentDeck numCards={5} opponentName="jeff" highlight />
          <OpponentDeck numCards={3} opponentName="what the dog doing" />
          <OpponentDeck numCards={10} opponentName="abdullah" />
        </div>
        <div className="rightside">
          <div className="upper">
            <CardPile cards={this.state.gameState.cardPile}></CardPile>
          </div>
          <div className="lower">
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
          </div>
        </div>
        <div className="playerlist">
          <OpponentDeck numCards={5} opponentName="idiot" />
          <OpponentDeck numCards={3} opponentName="haha" />
          <OpponentDeck numCards={10} opponentName="dumb" />
        </div>
      </div>
    );
  }
}

export default GameUI;
