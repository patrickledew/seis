import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import "./endScreen.css";
import PlayerInfo from "../PlayerList/PlayerInfo/PlayerInfo";



const EndScreen = (props) => {
    return <Box id="endscreen" paddingTop="20vh">
        <Typography variant="h1" align="center">Game Over</Typography>
        <Typography variant="h2" align="center">Winner:</Typography>
        <Box display="flex" marginX="auto" justifyContent="center">
            <PlayerInfo player={props.winner} displayCards={false} colorIndex={props.winnerIdx}></PlayerInfo>
        </Box>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h3" align="center">Returning to lobby in {props.timeLeft}...</Typography> 
    </Box>
}

EndScreen.propTypes = {
    winner: PropTypes.object,
    timeLeft: PropTypes.number,
    winnerIdx: PropTypes.number
}

export default EndScreen;