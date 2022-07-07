import React from "react";
import PropTypes from "prop-types";
import "../Card/card.css";
import "./hiddenCard.css";

const HiddenCard = (props) => {
  return (
    <div
      className={"card hidden" + (props.small ? " small" : "")}
      style={props.cardStyle}
      onMouseEnter={props.onMouseEnter}
    >
      <h2 className="first">?</h2>
      <h1>?</h1>
      <h2 className="last">?</h2>
    </div>
  );
};

HiddenCard.propTypes = {
  small: PropTypes.bool,
  cardStyle: PropTypes.object,
  onMouseEnter: PropTypes.func,
};

export default HiddenCard;
