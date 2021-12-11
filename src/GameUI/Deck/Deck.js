import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./deck.css";

const Deck = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [shouldBump, setShouldBump] = useState(true);
  const [cardSound] = useState(new Audio());
  const [cardPlaySound] = useState(new Audio());
  const [cardErrSound] = useState(new Audio());

  useEffect(() => {
    cardSound.src = "/sounds/card3.mp3";
    cardSound.load();
    cardPlaySound.src = "/sounds/card2.mp3";
    cardPlaySound.load();
    cardErrSound.src = "/sounds/error.mp3"
    cardErrSound.load();
  }, [cardSound, cardPlaySound, cardErrSound]);

  
  const cardMouseEnterFn = (cardIdx) => {
    const copy = cardSound.cloneNode(true);
    copy.mozPreservesPitch = false;
    copy.playbackRate = Math.random() / 5 + 1;
    copy.play();
    setSelectedCard(cardIdx);
    setShouldBump(true);
    setTimeout(() => setShouldBump(false), 500);
  };

  const cardClickFn = (e) => {
    console.log("cardclick e: ", e);
    

    if (!props.inactive && selectedCard != null && isValidCard(props.cards[selectedCard])) {
      const copy = cardPlaySound.cloneNode(true);
      copy.mozPreservesPitch = false;
      copy.playbackRate = Math.random() / 5 + 1;
      copy.play();
      props.playCard(selectedCard);
      setSelectedCard(null);
    } else {
      const copy = cardErrSound.cloneNode(true);
      copy.play();
    }
  };

  // Calculate card position
  const calculateCardOffset = (cardIdx) => {
    let cardOffset;
    if (props.cards.length > 6) {
      cardOffset = `calc(${(cardIdx / (props.cards.length - 1)) * 100}% - 5em`;
    } else {
      cardOffset = `calc(50% - 2.5em - ${(6 * props.cards.length) / 2}em + ${
        cardIdx * 6
      }em)`;
    }
    return cardOffset;
  };

  const isValidCard = (card) => {
    const lastCard = props.topCard;
    if (lastCard === undefined) return false;
    // TODO: Recognize when we are stacking, then only return true for +2/+4 cards
    if (
      lastCard.value === card.value || // Playing same value card
      lastCard.color === card.color || // Playing same color card
      card.color === null // Playing wildcard or +4
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="mydeck">
      <div className="deck-margins">
        <div
          className={`deck ${shouldBump ? "bump" : ""}
            ${props.inactive ? "inactive" : ""}
            ${props.highlight ? "highlight" : ""}
            ${props.drawing ? "drawing" : ""}
            `}
        >
          {props.cards.map((card, i) => (
            <Card
              idx={i}
              color={card.color}
              value={card.value}
              cardStyle={(() => {
                const style = { left: calculateCardOffset(i) };

                return style;
              })()}
              onMouseEnter={cardMouseEnterFn.bind(this, i)}
              selected={i === selectedCard}
              onClick={cardClickFn}
              canPlay={isValidCard(card)}
              topCard={i === props.cards.length - 1}
              key={i}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

Deck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  inactive: PropTypes.bool,
  highlight: PropTypes.bool,
  playCard: PropTypes.func,
  drawing: PropTypes.bool,
  topCard: PropTypes.object
};

export default Deck;
