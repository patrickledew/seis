import React, { useRef } from "react";
import { Button, TextField, Box, Typography } from "@material-ui/core";

import "./home.css";
import lobbyService from "../services/lobbyService";
import Logo from "../assets/Logo-Large.svg";
import { useHistory } from "react-router";
const { checkIfLobbyExists, createLobby } = lobbyService;

const Home = (props) => {
  const joinErrorRef = useRef();
  const createLobbyErrorRef = useRef();
  const lobbyIdInputRef = useRef();

  const history = useHistory();

  return (
      <Box id="home" className="content">
        <Box class="landing">
          <img src={Logo} className="logo"></img>
          
          <Box class="buttons">
            <div className="joinGroup">
              <TextField height="100%" className="lobbyCode" variant="filled" id="lobbyId" type="text" label="Enter Lobby Code" inputRef={lobbyIdInputRef}></TextField>
              <Button variant="contained" color="primary"
                onClick={() => {
                  const id = lobbyIdInputRef.current.value;
                  checkIfLobbyExists(id)
                    .then((exists) => {
                      if (exists) {
                        history.push(`/lobby/${id}`); // Redirect
                      } else {
                        joinErrorRef.current.innerText =
                          "That lobby doesn't exist. Try creating a new lobby below.";
                      }
                    })
                    .catch((e) => {
                      joinErrorRef.current.innerText =
                        "Could not join lobby: " + e.message;
                    });
                }}
              >
                Join w/ Code
              </Button>
            </div>
            <div><Typography variant="caption" ref={joinErrorRef} color="error"></Typography></div>
            <Typography variant="h4" color="textSecondary">or...</Typography>
              <Button variant="contained" color="secondary"
                  onClick={() => {
                    createLobby()
                      .then((id) => {
                        history.push(`/lobby/${id}`);
                      })
                      .catch((e) => {
                        createLobbyErrorRef.current.innerText =
                          "Could not create lobby: " + e.message;
                      });
                  }}
                >
                  Create New Lobby
                </Button> 
                <div><Typography variant="caption" ref={createLobbyErrorRef} color="error"></Typography></div>
            
          </Box>
        </Box>
      </Box>
  );
};
export default Home;
