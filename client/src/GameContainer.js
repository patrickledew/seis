import {Component} from 'react';
import Deck from "./Deck";
import './GameContainer.css';


class GameContainer extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            gameState: {
                myDeck: [
                    {color: "red", value: "5"},
                    {color: "yellow", value: "+2"},
                    {color: "blue", value: "5"},
                    {color: "yellow", value: "+2"},
                    {color: "green", value: "5"},
                    {color: "green", value: "+2"},
                    {color: "red", value: "5"},
                    {color: "blue", value: "+2"},
                    {color: "green", value: "5"},
                    {color: "green", value: "+2"},
                    {color: "red", value: "5"},
                    {color: "blue", value: "+2"}
                ]
            }
        }
    }

    render() {
        return <div className="b" id="game">
            <div className="b" id="playerlist">Player list</div>
            <div className="b" id="play-area">
                <div className="b" id="infobar">Info Bar</div>
                <div className="b" id="cardpile">Card Pile</div>
                <div className="b" id="my-deck"><Deck cards={this.state.gameState.myDeck}></Deck></div>
            </div>
        </div>
    }
}

export default GameContainer;