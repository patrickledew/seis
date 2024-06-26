import React from "react";
import PropTypes from "prop-types";
import { useAnimatePresence } from "use-animate-presence";

import "./card.css";
const Card = (props) => {
  const animation = useAnimatePresence({
    variants: {
      scale: {
        from: 1,
        to: 0,
      },
    },
    initial: "visible",
    duration: 1000,
  });
  return (
    <div
      id={props.idx !== undefined ? `card-${props.idx}` : null}
      className={`card 
        ${
          props.color === "red"
            ? "card-red"
            : props.color === "blue"
            ? "card-blue"
            : props.color === "green"
            ? "card-green"
            : props.color === "yellow"
            ? "card-yellow"
            : "card-wildcard"
        }
        ${props.selected ? "selected" : ""}
        ${props.topCard ? "topcard" : ""}
        ${props.playedByOpponent ? "opponent" : ""}
        ${
          props.canPlay !== undefined
            ? props.canPlay === true
              ? ""
              : "invalid"
            : ""
        }`}
      ref={animation.ref}
      style={props.cardStyle}
      onMouseEnter={props.onMouseEnter}
      onClick={props.onClick}
    >
      <h2 className="first">{props.value}</h2>
      <h1>{props.value}</h1>
      <h2 className="last">{props.value}</h2>
    </div>
  );
};

Card.propTypes = {
  idx: PropTypes.number,
  color: PropTypes.string,
  value: PropTypes.string,
  canPlay: PropTypes.bool,
  selected: PropTypes.bool,
  topCard: PropTypes.bool,
  cardStyle: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func,
  animateUnmount: PropTypes.bool,
  playedByOpponent: PropTypes.bool,
};

export default Card;
