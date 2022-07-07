import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import GrayscaleCardIcon from "../../../assets/GrayscaleCardIcon.svg";

import "./playerInfo.scss";

const PlayerInfo = (props) => {
  const ref = useRef();
  useEffect(() => {
    if (props.active) {
      ref.current.scrollIntoView();
    }
  }, [props.active]);
  return (
    <div
      ref={ref}
      id={props.id}
      className={"playerInfo" + (props.active ? " active" : "")}
    >
      <div className="topRow">
        <div
          className={
            "playerIcon centerHorizontally centerVertically playerGradient-" +
            ((props.colorIndex % 10) + 1).toString() // Which gradient to use
          }
        >
          <Typography variant="h3" color="textPrimary" align="center">
            {props.player.name.toUpperCase()[0]}
          </Typography>
        </div>
        <Typography variant="h4" color="textPrimary" display="inline">
          {props.player.name}
        </Typography>
      </div>
      {(props.displayCards === undefined || props.displayCards) && (
        <div className="cardCount">
          <img src={GrayscaleCardIcon} className="cardIcon"></img>
          <Typography variant="h5" color="textSecondary" display="inline">
            {props.player.numCards}
          </Typography>
        </div>
      )}
    </div>
  );
};

PlayerInfo.propTypes = {
  id: PropTypes.string,
  player: PropTypes.object,
  colorIndex: PropTypes.number.isRequired,
  active: PropTypes.bool,
  displayCards: PropTypes.bool,
};

export default PlayerInfo;
