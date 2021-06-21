import React from "react";
import PropTypes from "prop-types";

import "./card.css";
const Card = (props) => {
  return (
    <div
      id={props.idx !== undefined ? `card-${props.idx}` : null}
      className={
        "card " +
        (props.color === "red"
          ? "card-red"
          : props.color === "blue"
            ? "card-blue"
            : props.color === "green"
              ? "card-green"
              : props.color === "yellow"
                ? "card-yellow"
                : "card-wildcard") +
        " " +
        (props.selected ? "selected" : "") +
        " " +
        (props.position ? props.position : "") +
        " " +
        (props.topCard ? "topcard" : "")
      }
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
  selected: PropTypes.bool,
  topCard: PropTypes.bool,
  position: PropTypes.oneOf(["left", "right", ""]),
  cardStyle: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func,
};

export default Card;
