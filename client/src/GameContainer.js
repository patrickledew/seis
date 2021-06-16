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
                    {color: null, value: "W"},
                    {color: "blue", value: "+2"},
                    {color: "blue", value: "+2"},
                    {color: "blue", value: "+2"},
                    {color: "blue", value: "+2"}

                ]
            }
        }
    }

    render() {
        return <div className="game" id="game">
            <Deck cards={this.state.gameState.myDeck}></Deck>
        </div>
    }
}

export default GameContainer;