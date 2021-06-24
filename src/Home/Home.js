import React from "react";

import "./home.css";

const Home = (props) => {
  return (
    <div>
      <h1>Seis</h1>
      <h3>If you have a lobby code, please enter it here.</h3>
      <p>
        <input id="lobbyId" type="text"></input>{" "}
        <button
          onClick={() => {
            const id = document.getElementById("lobbyId").value;
            fetch(`/api/lobbyexists?id=${id}`, { method: "GET" })
              .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                res.json().then((exists) => {
                  if (exists) {
                    window.location.href = `/lobby/${id}`;
                  } else {
                    document.getElementById("join-error-msg").innerText =
                      "That lobby doesn't exist. Try creating a new lobby below.";
                  }
                });
              })
              .catch((e) => {
                document.getElementById("join-error-msg").innerText =
                  "Unknown Error. Whoops.";
              });
          }}
        >
          Join Lobby
        </button>
      </p>
      <p style={{ color: "red" }} id="join-error-msg"></p>

      <br />
      <h3>Otherwise, you can create a fresh new lobby:</h3>
      <p>
        <button
          onClick={() => {
            fetch("/api/createlobby", { method: "GET" })
              .then((res) => {
                if (!res.ok) throw new Error(res.statusText); // No more lobbies
                res.text().then((id) => {
                  window.location.href = `/lobby/${id}`;
                });
              })
              .catch((e) => {
                document.getElementById("create-error-msg").innerText =
                  "No more lobbies available. Contact Ricky and tell him to get his shit together.";
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
