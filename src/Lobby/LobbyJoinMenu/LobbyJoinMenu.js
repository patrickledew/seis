import React, { useEffect, useRef } from "react";
import { Paper, Grid, TextField, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import LinkIcon from "@material-ui/icons/Link";
import PropTypes from "prop-types";

const LobbyJoinMenu = (props) => {
  function loadUsernameFromStorage() {
    return localStorage.getItem("seis:username");
  }

  function saveUsernameToStorage(name) {
    console.log("hi");
    localStorage.setItem("seis:username", name);
  }

  function setUsernameAndJoin() {
    saveUsernameToStorage(usernameInputRef.current.value);
    props.setUsername(usernameInputRef.current.value);
    props.joinLobby();
  }

  const usernameInputRef = useRef();

  useEffect(() => {
    const username = loadUsernameFromStorage();
    if (username) {
      usernameInputRef.current.value = username;
    }
  }, [usernameInputRef]);

  return (
    <Grid item xs={10} sm={6} md={5} lg={5} xl={3}>
      <Paper elevation={12} className="padding35">
        <Grid item lg={12} className="marginBottom10">
          <Typography variant="h3" align="center">
            {props.lobbyId}{" "}
            <Link to={`/lobby/${props.lobbyId.toUpperCase()}`} target="_blank">
              <LinkIcon fontSize="large" color="inherit"></LinkIcon>
            </Link>
          </Typography>
          <Typography variant="h5" align="center">
            Join Lobby
          </Typography>
        </Grid>
        <Grid item lg={12} className="padding10">
          <TextField
            inputRef={usernameInputRef}
            id="username-input"
            label="Username"
            variant="outlined"
            margin="dense"
            fullWidth
            autoFocus
            onSubmit={setUsernameAndJoin}
          />
        </Grid>

        <Grid item lg={12} className="padding10 centerHorizontally">
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={setUsernameAndJoin}
          >
            Join Lobby
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

LobbyJoinMenu.propTypes = {
  lobbyId: PropTypes.string.isRequired,
  setUsername: PropTypes.func,
  joinLobby: PropTypes.func,
};

export default LobbyJoinMenu;
