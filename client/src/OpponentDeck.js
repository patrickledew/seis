import { useRef, useEffect, useState } from "react";
import HiddenCard from "./HiddenCard";
import './Deck.css';
const OpponentDeck = (props) => {
    return <div className="opponentdeck">
            <h2 className="opponent-name">{props.opponentName} - {props.numCards} cards</h2>
            <div className="deck-margins">
                <div className={`deck opponent ${props.highlight ? "highlight": ""}`}>
                    {[...Array(props.numCards)].map((e, i) => {
                        //Calculate card position
                        let cardOffset = props.numCards <= 8 ? `calc(${(i * 3)}em - 5em` : `calc(${(i/(props.numCards - 1)) * 100}% - 5em`;
                        return <HiddenCard cardStyle={{left: cardOffset}} small={true} />;
                    }
                    )}
                </div>
            </div>
        </div>
}

export default OpponentDeck;