import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./cardPile.css";

const CardPile = (props) => {
  // Seeded random number generator, credit: https://www.timemox.com/en/tricks/generate-random-number-using-seed
  function rand(min, max, seed) {
    min = min || 0;
    max = max || 1;
    let rand;
    if (typeof seed === "number") {
      seed = (seed * 9301 + 49297) % 233280;
      let rnd = seed / 233280;
      const disp = Math.abs(Math.sin(seed));
      rnd = rnd + disp - Math.floor(rnd + disp);
      rand = Math.floor(min + rnd * (max - min + 1));
    } else {
      rand = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return rand;
  }

  return (
    <div className="cardpile">
      {props.cards.map((card, i) => {
        const cardRotation = `${rand(-10, 10, i * 213737)}deg`;
        if (i < props.cards.length - 10) return null;

        return (
          <Card
            color={card.color}
            value={card.value}
            cardStyle={{
              transform: `rotateZ(${cardRotation}) translateY(${i * 2}px)`,
            }}
            topCard={i === props.cards.length - 1}
            key={i}
          />
        );
      })}
    </div>
  );
};

CardPile.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
};

export default CardPile;
