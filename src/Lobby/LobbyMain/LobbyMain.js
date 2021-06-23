import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import StarIcon from "@material-ui/icons/Star";

const LobbyMain = (props) => {
  function getPlayerById(id) {
    if (props.lobbyState && props.lobbyState.players) {
      const player = props.lobbyState.players.find((v) => v.id === id);
      return typeof player !== "undefined" ? player : null;
    } else {
      return null;
    }
  }
  function amLobbyLeader() {
    const player = getPlayerById(props.myId);
    if (player == null) return false;
    else return player.isLeader;
  }

  function handlePrivateCheckbox(e) {
    if (amLobbyLeader()) {
      props.lobbyService.setPrivateLobby(e.target.checked);
    }
  }

  return (
    <Grid item xs={12} md={10}>
      <Box m={2}>
        <Paper elevation={12} className="padding35">
          <Box mb={2}>
            <Typography align="center" variant="h3" color="textSecondary">
              Lobby {props.lobbyId}{" "}
              <Link
                color="textSecondary"
                href={`/lobby/${props.lobbyId.toUpperCase()}`}
                target="_blank"
              >
                <LinkIcon fontSize="large" color="inherit"></LinkIcon>
              </Link>
            </Typography>
            {amLobbyLeader() && (
              <Box align="center">
                <Typography align="center" component="em" color="textSecondary">
                  You are the lobby leader.
                </Typography>
              </Box>
            )}
          </Box>
          <Divider></Divider>
          <Box px={2} mt={5}>
            <Grid container direction="row" justify="left" spacing={4}>
              <Grid item lg={4} spacing={2}>
                <Box p={2}>
                  <Typography align="left" variant="h4" color="textPrimary">
                    {props.lobbyState.players.length +
                      " Player" +
                      (props.lobbyState.players.length !== 1 ? "s" : "")}
                  </Typography>
                  <Typography component="p">This is the player list</Typography>
                  <List>
                    {props.lobbyState.players.map((p, i) => {
                      return (
                        <ListItem key={i}>
                          <ListItemIcon>
                            {amLobbyLeader() && !p.isLeader && (
                              <Tooltip title="Kick Player" enterDelay="1s">
                                <IconButton
                                  onClick={() =>
                                    props.lobbyService.kickPlayer(p.id)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {p.isLeader && (
                              <Tooltip title="Lobby Leader" enterDelay={200}>
                                <IconButton>
                                  <StarIcon style={{ color: "#faea76" }} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </ListItemIcon>
                          <ListItemText>
                            {p.id === props.myId ? (
                              <strong>{p.name} (You)</strong>
                            ) : (
                              p.name
                            )}
                          </ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item lg={7}>
                <Box p={2}>
                  <Typography align="left" variant="h4" color="textPrimary">
                    Lobby Settings
                  </Typography>
                </Box>
                <Box mx={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.lobbyState.isPrivate}
                          disabled={!amLobbyLeader()}
                          onChange={handlePrivateCheckbox}
                        ></Checkbox>
                      }
                      label="Private Lobby"
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};

LobbyMain.propTypes = {
  lobbyId: PropTypes.string.isRequired,
  lobbyState: PropTypes.object.isRequired,
  myId: PropTypes.string.isRequired,
  lobbyService: PropTypes.object.isRequired,
  showError: PropTypes.func,
};

export default LobbyMain;
