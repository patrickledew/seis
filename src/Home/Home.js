import React, { useRef } from "react";

import "./home.css";
import lobbyService from "../services/lobbyService";
const { checkIfLobbyExists, createLobby } = lobbyService;

const Home = (props) => {
  const errorRef = useRef();
  const lobbyIdInputRef = useRef();
  return (
    <div>
      <h1>Seis</h1>
      <h3>If you have a lobby code, please enter it here.</h3>
      <p>
        <input id="lobbyId" type="text" ref={lobbyIdInputRef}></input>{" "}
        <button
          onClick={() => {
            const id = lobbyIdInputRef.current.value;
            checkIfLobbyExists(id)
              .then((exists) => {
                if (exists) {
                  window.location.href = `/lobby/${id}`;
                } else {
                  errorRef.current.innerText =
                    "That lobby doesn't exist. Try creating a new lobby below.";
                }
              })
              .catch((e) => {
                errorRef.current.innerText = e.message;
              });
          }}
        >
          Join Lobby
        </button>
      </p>
      <p style={{ color: "red" }} id="join-error-msg" ref={errorRef}></p>

      <br />
      <h3>Otherwise, you can create a fresh new lobby:</h3>
      <p>
        <button
          onClick={() => {
            createLobby().then((id) => {
              window.location.href = `/lobby/${id}`;
            });
          }}
        >
          Create New Lobby
        </button>
      </p>
      <p style={{ color: "red" }} id="create-error-msg"></p>
    </div>
  );
};
export default Home;
