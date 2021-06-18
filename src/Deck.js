import { useRef, useEffect, useState } from "react";
import Card from "./Card";
import './Deck.css';



const Deck = (props) => {

    const [cards, updateCards] = useState(props.cards);
    const [canSelectCard, setCanSelectCard] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null);
    const [shouldBump, setShouldBump] = useState(true);
    const [cardSound, _] = useState(new Audio());
    const [cardPlaySound, __] = useState(new Audio());

    useEffect(() => {
        cardSound.src = "/card3.mp3";
        cardSound.load();
        cardPlaySound.src = "/card2.mp3";
        cardPlaySound.load();
    }, [cardSound, cardPlaySound])

    const cardMouseEnterFn = (cardIdx) => {
        let copy = cardSound.cloneNode(true)
        copy.mozPreservesPitch = false;
        copy.playbackRate = Math.random() / 5 + 1;
        copy.play();
        if (canSelectCard) {
            setSelectedCard(cardIdx);
        }
        setShouldBump(true);
        setTimeout(() => setShouldBump(false), 500);
        
    }

    const cardClickFn = () => {
        let copy = cardPlaySound.cloneNode(true)
        copy.mozPreservesPitch = false;
        copy.playbackRate = Math.random() / 5 + 1;
        copy.play();

        if (!props.inactive && selectedCard != null) {
            props.playCard(selectedCard);
        }
    }


    return <div className="mydeck">
    <div className="deck-margins"><div className={`deck ${shouldBump ? "bump" : ""} ${props.inactive ? "inactive" : ""} ${props.highlight ? "highlight": ""}`}>
            {cards.map((card, i) => {
                //Calculate card position
                let cardOffset;
                if (cards.length > 6) {
                 cardOffset = `calc(${(i/(cards.length - 1)) * 100}% - 5em`;
                } else { 
                    cardOffset = `calc(50% - 2.5em - ${6*cards.length/2}em + ${i*6}em)`;
                }
                return <Card idx={i} color={card.color} value={card.value} cardStyle={(() => {
                    let style = {left: cardOffset};
                    
                    return style;
                })()} position={i < selectedCard ? "left" : (i > selectedCard ? "right" : "")} onMouseEnter={cardMouseEnterFn.bind(this, i)} selected={i == selectedCard} onClick={cardClickFn.bind(this)}></Card>;
            }
            )}
        </div></div></div>
}

export default Deck;