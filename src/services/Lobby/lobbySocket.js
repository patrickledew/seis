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
    onJoined: (userid) => {}, // Called when the client successfully joins into a lobby
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
      fetch(`/api/lobbyexists?id=${id.toUpperCase()}`)
        .then((res) => {
          res.json().then((exists) => {
            resolve(exists);
          });
        })
        .catch((e) => {
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
    socket = io(
      "ws://localhost" + (process.env.NODE_ENV === "development")
        ? ":4000"
        : "",
      {
        forceNew: false,
        transports: ["websocket"],
      }
    );
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

  function listen() {
    socket.on("error", (err) => {
      handlers.onError(err);
    });
    socket.on("connect-success", (uid) => {
      userId = uid;
      handlers.onJoined(uid);
    });
    socket.on("lobbyState", (state) => {
      lobbyState = state;
      handlers.onUpdate(state);
    });
    socket.on("kick", () => {
      handlers.onError({ msg: "You were kicked from the lobby." });
      handlers.onKicked();
    });
    socket.on("gamestarting", () => {
      handlers.onGameStart();
    });
    socket.on("gameending", () => {
      handlers.onGameEnd();
    });
  }

  function joinLobby(id, username) {
    lobbyId = id;
    listen();
    socket.emit("joinlobby", lobbyId, username);
  }

  function startGame() {
    socket.emit("startgame");
  }

  function kickPlayer(id) {
    socket.emit("kickplayer", id);
  }

  function changeLobbyParam(param, newvalue) {
    socket.emit("changelobbyparam", param, newvalue);
  }

  function setMaxPlayers(newvalue) {
    changeLobbyParam("maxPlayers", newvalue);
  }

  function setPrivateLobby(newvalue) {
    changeLobbyParam("isPrivate", newvalue);
  }

  function _getSocket() {
    return socket;
  }

  return {
    checkIfLobbyExists: checkIfLobbyExists,
    connect: connect,
    disconnect: disconnect,
    listen: listen,
    joinLobby: joinLobby,
    lobbyState: lobbyState,
    startGame: startGame,
    kickPlayer: kickPlayer,
    changeLobbyParam: changeLobbyParam,
    setMaxPlayers: setMaxPlayers,
    setPrivateLobby: setPrivateLobby,
    handlers: handlers,
    _getSocket: _getSocket, // Have to use a getter here because it doesn't pass a reference if we don't (will just give null every time it's accessed)
  };
})();
