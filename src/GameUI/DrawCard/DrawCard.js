import React from "react";
import PropTypes from "prop-types";
import "../Card/card.css";
import "./drawCard.css";

const DrawCard = (props) => {
  return (
    <div className={`card card-draw small ${props.inactive && "inactive"}`} onClick={() => {
      if (!props.inactive) props.onDraw();
    }}>
      <h1>+</h1>
    </div>
  );
};

DrawCard.propTypes = {
  onDraw: PropTypes.func,
  inactive: PropTypes.bool,
};

export default DrawCard;
