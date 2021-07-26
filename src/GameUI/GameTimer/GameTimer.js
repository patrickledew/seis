import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import "./gameTimer.css";

const GameTimer = (props) => {
    const [secondsLeft] = useState(123);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const timerStr = `${minutes}:${seconds.toString().padStart(2, '0')}`
    return (
        <Box height="5em" mr={2} className="gameTimer centerText">
            <HourglassEmptyRoundedIcon class="timerIcon centerText"></HourglassEmptyRoundedIcon>
            <Typography display="inline" variant="h3" className="timerText centerText">{timerStr}</Typography>
        </Box>
    )
}

export default GameTimer;