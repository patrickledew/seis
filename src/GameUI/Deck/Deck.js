import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./deck.css";

const Deck = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [shouldBump, setShouldBump] = useState(true);
  const [cardSound] = useState(new Audio());
  const [cardPlaySound] = useState(new Audio());

  useEffect(() => {
    cardSound.src = "/sounds/card3.mp3";
    cardSound.load();
    cardPlaySound.src = "/sounds/card2.mp3";
    cardPlaySound.load();
  }, [cardSound, cardPlaySound]);

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
    const copy = cardPlaySound.cloneNode(true);
    copy.mozPreservesPitch = false;
    copy.playbackRate = Math.random() / 5 + 1;
    copy.play();

    if (!props.inactive && selectedCard != null) {
      props.playCard(selectedCard);
      setSelectedCard(null);
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

  return (
    <div className="mydeck">
      <div className="deck-margins">
        <div
          className={`deck ${shouldBump ? "bump" : ""} ${
            props.inactive ? "inactive" : ""
          } ${props.highlight ? "highlight" : ""}`}
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
              position={
                selectedCard !== null
                  ? i < selectedCard
                    ? "left"
                    : i > selectedCard
                    ? "right"
                    : ""
                  : "left"
              }
              onMouseEnter={cardMouseEnterFn.bind(this, i)}
              selected={i === selectedCard}
              onClick={cardClickFn}
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
};

export default Deck;
