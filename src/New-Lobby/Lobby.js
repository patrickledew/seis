import React from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import "./lobby.css";

const LobbyNew = () => {
  const lobbyCode = "XYZ8G";
  return (
    <Paper className="Lobby centerHorizontally centerVertically">
      <Grid container spacing={3}>
        <Grid item xs={12} className="centerHorizontal">
          <Grid item xs={4} className="lobbyContainer">
            <div className="textCenter">Lobby Code: {lobbyCode}</div>
          </Grid>
        </Grid>
        <Grid item xs={12} className="centerHorizontal">
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              className="startBtn startText"
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LobbyNew;
