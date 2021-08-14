import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import HourglassEmptyRoundedIcon from "@material-ui/icons/HourglassEmptyRounded";
import "./gameTimer.css";

const GameTimer = (props) => {
  const minutePart = Math.floor(props.seconds / 60);
  const secondPart = props.seconds % 60;
  const timerStr = `${minutePart}:${secondPart.toString().padStart(2, "0")}`;

  return (
    <Box
      height="5em"
      className={
        "gameTimer centerText" + (props.seconds < 10 ? " runningOut" : "")
      }
    >
      <HourglassEmptyRoundedIcon className="timerIcon centerText"></HourglassEmptyRoundedIcon>
      <Typography display="inline" variant="h3" className="timerText">
        {timerStr}
      </Typography>
    </Box>
  );
};

GameTimer.propTypes = {
  seconds: PropTypes.number,
};

export default GameTimer;
