import {Component} from 'react';
import OpponentDeck from './OpponentDeck';
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
                    {color: null, value: "W"},
                    {color: "blue", value: "+2"},
                    {color: "blue", value: "+2"},
                    {color: "blue", value: "+2"},
                    {color: "blue", value: "+2"},
                    {color: "red", value: "5"},
                    {color: "yellow", value: "+2"},
                    {color: "blue", value: "5"},
                    {color: "yellow", value: "+2"},
                    {color: "green", value: "5"}

                ]
            }
        }
    }

    render() {
        return <div className="game" id="game">
                <div className="playerlist">
                    <OpponentDeck numCards={5} opponentName="jeff" highlight/>
                    <OpponentDeck numCards={3} opponentName="jeff"/>
                    <OpponentDeck numCards={10} opponentName="jeff"/>
                </div>
            <div className="rightside">
                <div className="upper"></div>
                <div className="lower">
                    <Deck cards={this.state.gameState.myDeck} playCard={(idx) => {
                        this.state.gameState.myDeck.splice(idx, 1);
                        this.setState({gameState: {myDeck: this.state.gameState.myDeck}})
                    }}></Deck>
                </div>
            </div>
        </div>
    }
}

export default GameContainer;