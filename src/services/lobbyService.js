import { io } from "socket.io-client";
export default (() => {
  /**
   * Variables for storing information about the current lobby connection.
   */
  let socket = null;
  let lobbyId = null; // ID code of the lobby
  let userId = null; // ID of the player
  let lobbyState = null;

  /**
   * Callback functions for when the lobby sends us messages. Overwrite these to update the state of frontend components. (e.g. lobbySocket.handlers.onError = ...)
   */
  const handlers = {
    onUpdate: (state) => {}, // Called when lobby sends us state information (currently connected players, lobby settings, etc.)
    onGameStart: () => {}, // Called when the lobby leader starts a game. This should be set to cause the game UI to load.
    onGameEnd: () => {}, // Called after the game has concluded. This should be set to cause the lobby UI to load again.
    onKicked: () => {}, // Called when client is kicked from the lobby.
    onError: (e) => console.error("[Lobby Error]", e), // Called when there is an error related to the lobby socket. (Client gets kicked, socket connection gets interrupted, etc.)
  };

  /**
   * Checks whether a lobby exists by querying the api.
   *
   * @param {string} id The ID code of the lobby.
   *
   * @returns {Promise<boolean>} A promise which is resolved to a true or false value.
   */
  function checkIfLobbyExists(id) {
    return new Promise((resolve, reject) => {
      fetch(
        import.meta.env.VITE_API_URL + `/api/lobbyinfo?id=${id.toUpperCase()}`
      )
        .then((res) => {
          if (!res.ok) {
            handlers.onError(
              `Could not check if lobby exists: ${res.status} ${res.statusText}`
            );
            reject(new Error(`${res.status} ${res.statusText}`));
          } else {
            res.json().then((info) => {
              resolve(info.exists);
            });
          }
        })
        .catch((e) => {
          handlers.onError(`Could not check if lobby exists: ${e.message}`);
          reject(e);
        });
    });
  }

  function createLobby() {
    return new Promise((resolve, reject) => {
      fetch(import.meta.env.VITE_API_URL + "/api/createlobby", {
        method: "POST",
      })
        .then((res) => {
          if (!res.ok) {
            handlers.onError(
              `Could not create a new lobby: ${res.status} ${res.statusText}`
            );
            reject(new Error(`${res.status} ${res.statusText}`));
          } else {
            res.text().then((id) => {
              resolve(id);
            });
          }
        })
        .catch((e) => {
          handlers.onError(`Could not create a new lobby: ${e.message}`);
          reject(e);
        });
    });
  }

  /**
   * Opens the socket connection to the lobby.
   */
  function connect() {
    /*
     *  If in development mode, uses port 4000.
     *  If in a production build, this will default to using the same port as the server.
     */
    socket = io(import.meta.env.VITE_API_URL + "/api/lobby", {
      forceNew: false,
      transports: ["websocket"],
    });
  }

  /**
   * Disconnect the socket connection.
   */
  function disconnect() {
    if (socket) {
      socket.disconnect();
    }
    socket = null;
    userId = null;
    lobbyId = null;
  }

  /**
   *
   * @param {string} id The lobby id/code.
   * @param {string} username The username
   */

  function startListeners() {
    socket.on("error", (e) => {
      handlers.onError(e);
    });
    socket.on("update", (state) => {
      lobbyState = state;
      handlers.onUpdate(state);
    });
    socket.on("kick", () => {
      handlers.onError("You were kicked from the lobby.");
      handlers.onKicked();
    });
    socket.on("game-starting", () => {
      handlers.onGameStart();
    });
    socket.on("game-ending", () => {
      handlers.onGameEnd();
    });
  }

  function stopListeners() {
    if (socket) {
      socket.removeAllListeners("error");
      socket.removeAllListeners("update");
      socket.removeAllListeners("kick");
      socket.removeAllListeners("gamestarting");
      socket.removeAllListeners("gameending");
    }
  }

  /**
   * Join a lobby.
   * @param {string} id
   * @param {string} username
   * @returns {Promise<string>} Promise containing the user id should the connection be successful.
   */
  function joinLobby(id, username) {
    return new Promise((resolve, reject) => {
      if (!socket) {
        handlers.onError("Socket connection not available to join lobby.");
        reject(new Error("Socket did not connect."));
        return;
      }
      lobbyId = id;
      socket.emit("join", lobbyId, username);

      const timeout = setTimeout(() => {
        handlers.onError("Timed out.");
        reject(new Error("Timed out."));
      }, 2000);

      function joinErrorListener(e) {
        clearTimeout(timeout);
        socket.off("joined", joinSuccessListener);
        reject(new Error(e));
      }

      function joinSuccessListener(uid) {
        clearTimeout(timeout);
        socket.off("error", joinErrorListener);
        userId = uid;
        resolve(uid);
      }

      // Listen to an error response
      socket.once("error", joinErrorListener);

      // Listen to a successful response
      socket.once("joined", joinSuccessListener);

      startListeners();
    });
  }

  function leaveLobby() {
    stopListeners();
    disconnect();
  }

  function startGame() {
    socket.emit("start-game");
  }

  function kickPlayer(id) {
    socket.emit("kick", id);
  }

  function changeLobbyParam(param, newvalue) {
    socket.emit("lobby-settings", param, newvalue);
  }

  function setMaxPlayers(newvalue) {
    changeLobbyParam("maxPlayers", newvalue);
  }

  function setPrivateLobby(newvalue) {
    changeLobbyParam("isPrivate", newvalue);
  }

  return {
    checkIfLobbyExists: checkIfLobbyExists,
    createLobby: createLobby,
    connect: connect,
    disconnect: disconnect,
    startListeners: startListeners,
    stopListeners: stopListeners,
    joinLobby: joinLobby,
    leaveLobby: leaveLobby,
    startGame: startGame,
    kickPlayer: kickPlayer,
    changeLobbyParam: changeLobbyParam,
    setMaxPlayers: setMaxPlayers,
    setPrivateLobby: setPrivateLobby,
    handlers: handlers,
    getLobbyState: () => {
      return lobbyState;
    },
    getUserId: () => {
      return userId;
    },
    _getSocket: () => {
      return socket;
    }, // Have to use a getter here because it doesn't pass a reference if we don't (will just give null every time it's accessed)
  };
})();
