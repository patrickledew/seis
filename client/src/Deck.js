import { useRef, useEffect, useState } from "react";
import Card from "./Card";
import './Deck.css';
const Deck = (props) => {

    const [selectedCard, setSelectedCard] = useState(null);
    const [shouldBump, setShouldBump] = useState(true);

    return <div className="mydeck">
    <div className="deck-margins"><div className="deck">
            {props.cards.map((card, i) => {
                //Calculate card position
                let cardOffset = `calc(${(i/(props.cards.length - 1)) * 100}% - 5em`;
                return <Card color={card.color} value={card.value} cardStyle={(() => {
                    let style = {};
                    if (i < selectedCard) {
                        if(shouldBump) {
                            style = {left: cardOffset, transform: `translate(-3em, 1em)`};
                        } else {
                            style = {left: cardOffset, transform: `translate(-2em, 1em)`};
                        }
                    } else if (i > selectedCard) {
                        if(shouldBump) {
                            style = {left: cardOffset, transform: `translate(5em, 1em)`};
                        } else {
                            style = {left: cardOffset, transform: `translate(4em, 1em)`};
                        }
                    } else {
                        style = {left: cardOffset, transform: `translate(-10px, -10em)`};
                    }
                    setTimeout(() => setShouldBump(false), 300);
                    return style;
                })()} onMouseEnter={() => {setSelectedCard(i); setShouldBump(true)}} selected={i == selectedCard}></Card>;
            }
            )}
        </div></div></div>
}

export default Deck;