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
  Button,
  Hidden,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import StarIcon from "@material-ui/icons/Star";

import "./lobbyMain.css";

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
    else return player.leader;
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
            <Box marginBottom={4}>
              <Grid container direction="row" justify="left" spacing={4}>
                <Grid item xs={12} md={4} spacing={2}>
                  <Box p={2}>
                    <Typography align="left" variant="h4" color="textPrimary">
                      {props.lobbyState.players.length +
                        " Player" +
                        (props.lobbyState.players.length !== 1 ? "s" : "")}
                    </Typography>
                    <Typography component="p">
                      This is the player list
                    </Typography>
                    <List>
                      {props.lobbyState.players.map((p, i) => {
                        return (
                          <ListItem key={i}>
                            <ListItemIcon>
                              {amLobbyLeader() && !p.leader && (
                                <Tooltip title="Kick Player" enterDelay={200}>
                                  <IconButton
                                    onClick={() =>
                                      props.lobbyService.kickPlayer(p.id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {p.leader && (
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
                <Hidden smDown>
                  <Divider orientation="vertical" flexItem></Divider>
                </Hidden>
                <Grid item xs={12} md>
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
                            color="primary"
                            checked={props.lobbyState.private}
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
            <Box>
              <Grid container fullWidth justify="center">
                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={6}
                  xl={4}
                  className="centerHorizontally"
                >
                  <Button
                    fullWidth
                    style={{ height: "60px" }}
                    variant="contained"
                    color="primary"
                    disabled={!amLobbyLeader()}
                    onClick={() => {
                      props.lobbyService.startGame();
                    }}
                  >
                    {amLobbyLeader()
                      ? "Start Game"
                      : "Waiting for lobby leader to start game."}
                  </Button>
                </Grid>
              </Grid>
            </Box>
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
