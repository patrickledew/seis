import React from "react";
import { Paper, Grid, Typography, styled, Link } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
import LinkIcon from "@material-ui/icons/Link";
import PropTypes from "prop-types";

import "./lobbyNotFound.css";

const LobbyNotFound = (props) => {
  const Button = styled(MuiButton)(spacing);

  function createLobby() {
    fetch("/api/createlobby", { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText); // No more lobbies
        res.text().then((id) => {
          window.location.href = `/lobby/${id}`;
        });
      })
      .catch((e) => {
        props.showError(
          "Could not create a new lobby. The backend may be down."
        );
      });
  }

  return (
    <Grid item xs={10} sm={6} md={5} lg={5} xl={3} align="center">
      <Paper elevation={12} className="padding35">
        <Grid item lg={12} className="marginBottom10">
          <Typography variant="h3" noWrap align="center">
            {props.lobbyId}{" "}
            <Link
              color="textSecondary"
              href={`/lobby/${props.lobbyId.toUpperCase()}`}
              target="_blank"
            >
              <LinkIcon fontSize="large" color="inherit"></LinkIcon>
            </Link>
          </Typography>
          <Typography variant="h5" align="center">
            Lobby Not Found.
          </Typography>
        </Grid>
        <Grid item lg={12} className="padding10 centerHorizontally">
          <Button
            m={1}
            size="medium"
            variant="contained"
            color="primary"
            onClick={createLobby}
          >
            Create Lobby
          </Button>
          <Button
            m={1}
            size="medium"
            variant="contained"
            color="secondary"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go Back
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

LobbyNotFound.propTypes = {
  lobbyId: PropTypes.string.isRequired,
  showError: PropTypes.func,
};

export default LobbyNotFound;
