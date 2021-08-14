import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import "./playerList.scss";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

const PlayerList = (props) => {
  return (
    <div className="playerList">
      <Typography variant="h2" color="textPrimary">
        Players{" "}
        <ArrowRightAltIcon
          color="disabled"
          fontSize="inherit"
          className={`directionArrow ${props.reversed ? "reversed" : ""}`}
        />
      </Typography>
      <Box mt="20px" className="players">
        {props.players.map((player, i) => (
          <PlayerInfo
            id={`player-${i}`}
            key={i}
            colorIndex={i}
            player={player}
            active={player.active}
          />
        ))}
      </Box>
    </div>
  );
};

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  reversed: PropTypes.bool,
};

export default PlayerList;
