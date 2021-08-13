import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import GrayscaleCardIcon from "../../../assets/GrayscaleCardIcon.svg";

import "./playerInfo.scss";

const PlayerInfo = (props) => {
  return (
    <div className={"playerInfo" + (props.active ? " active" : "")}>
      <div className="topRow">
        <div
          className={
            "playerIcon centerHorizontally centerVertically playerGradient-"
            + ((props.colorIndex % 10) + 1).toString() // Which gradient to use
          }
        >
          <Typography
            variant="h3"
            color="textPrimary"
            align="center"
          >
            {props.player.name.toUpperCase()[0]}
          </Typography>
        </div>
        <Typography variant="h4" color="textPrimary" display="inline">{props.player.name}</Typography>
      </div>
      <div className="cardCount">
        <img src={GrayscaleCardIcon} className="cardIcon"></img>
          <Typography variant="h5" color="textSecondary" display="inline">{props.player.numCards}</Typography>
      </div>
    </div>
  );
};

PlayerInfo.propTypes = {
  player: PropTypes.object,
  colorIndex: PropTypes.number.isRequired,
  active: PropTypes.bool
};

export default PlayerInfo;
