import React, { useEffect, useRef } from "react";
import {
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import PropTypes from "prop-types";

const LobbyJoinMenu = (props) => {
  
  function loadUsernameFromStorage() {
    return localStorage.getItem("seis:username");
  }

  function saveUsernameToStorage(name) {
    localStorage.setItem("seis:username", name);
  }

  function saveUsernameAndJoin() {
    saveUsernameToStorage(usernameInputRef.current.value);

    props.joinLobby(usernameInputRef.current.value);
  }

  const usernameInputRef = useRef();

  useEffect(() => {
    const username = loadUsernameFromStorage();
    if (username) {
      usernameInputRef.current.value = username;
    } else {
      usernameInputRef.current.value = "";
    }
  }, [usernameInputRef]);

  return (
    <Grid item xs={10} sm={6} md={5} lg={5} xl={3}>
      <Paper elevation={12} className="padding35">
        <Grid item lg={12} className="marginBottom10">
          <Typography variant="h3" align="center">
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
            InputLabelProps={{ shrink: true }}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUsernameAndJoin();
            }}
          />
        </Grid>

        <Grid item lg={12} className="padding10 centerHorizontally">
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={saveUsernameAndJoin}
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
  showError: PropTypes.func,
};

export default LobbyJoinMenu;
