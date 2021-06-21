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

  const cardClickFn = () => {
    const copy = cardPlaySound.cloneNode(true);
    copy.mozPreservesPitch = false;
    copy.playbackRate = Math.random() / 5 + 1;
    copy.play();

    if (!props.inactive && selectedCard != null) {
      props.playCard(selectedCard);
    }
  };

  return (
    <div className="mydeck">
      <div className="deck-margins">
        <div
          className={`deck ${shouldBump ? "bump" : ""} ${
            props.inactive ? "inactive" : ""
          } ${props.highlight ? "highlight" : ""}`}
        >
          {props.cards.map((card, i) => {
            // Calculate card position
            let cardOffset;
            if (props.cards.length > 6) {
              cardOffset = `calc(${
                (i / (props.cards.length - 1)) * 100
              }% - 5em`;
            } else {
              cardOffset = `calc(50% - 2.5em - ${
                (6 * props.cards.length) / 2
              }em + ${i * 6}em)`;
            }
            return (
              <Card
                idx={i}
                color={card.color}
                value={card.value}
                cardStyle={(() => {
                  const style = { left: cardOffset };

                  return style;
                })()}
                position={
                  i < selectedCard ? "left" : i > selectedCard ? "right" : ""
                }
                onMouseEnter={cardMouseEnterFn.bind(this, i)}
                selected={i === selectedCard}
                onClick={cardClickFn.bind(this)}
                key={i}
              ></Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Deck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  inactive: PropTypes.bool,
  highlight: PropTypes.bool,
  playCard: PropTypes.func,
};

export default Deck;
