import React from "react";
import PropTypes from "prop-types";

import utils from "../../services/util";

import Card from "../Card/Card";
import "./cardPile.css";

const CardPile = (props) => {
  // Seeded random number generator, credit: https://www.timemox.com/en/tricks/generate-random-number-using-seed

  return (
    <div className="cardpile">
      {props.cards.map((card, i) => {
        const cardRotation = `${utils.seedRand(-10, 10, i * 213737)}deg`;
        if (i < props.cards.length - 10) return null;

        return (
          <Card
            color={card.color}
            value={card.value}
            cardStyle={{
              transform: `translateY(${i * 2}px) rotateZ(${cardRotation}) `,
            }}
            topCard={i === props.cards.length - 1}
            playedByOpponent={card.from !== props.myUid}
            key={i}
          />
        );
      })}
    </div>
  );
};

CardPile.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  myUid: PropTypes.number,
};

export default CardPile;
