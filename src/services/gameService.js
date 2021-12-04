/**
 * Game Service. Will be used to interface with the socket server and provide game functionality on the client side.
 **/
export default (() => {
  /**
   * Variables for storing information about the current game.
   */
  let socket = null;
  let gameState = null;

  function bindSocket(io) {
    socket = io;
  }

  function ready() {
    console.log("socket:", socket);
    if (!socket) {
      handlers.onError("No socket bound to game service.");
      return;
    }

    startListeners();

    socket.emit("ready"); // Tell server that we're ready
  }
  /**
   * Callback functions for when the lobby sends us messages. Overwrite these to update the state of frontend components. (e.g. lobbySocket.handlers.onError = ...)
   */
  const handlers = {
    onUpdate: (state) => {}, // Called when lobby sends us state information (currently connected players, lobby settings, etc.)
    onCardDealt: (uid) => {},
    onCardRecieved: (card) => {},
    onColorPrompt: () => {},
    onError: (e) => console.error("[Game Error]", e), // Called when there is an error related to the lobby socket. (Client gets kicked, socket connection gets interrupted, etc.)
  };

  function getState() {
    return gameState;
  }

  function playCard(card) {
    socket.emit("play-card", card);
  }

  function drawCards() {
    socket.emit("draw-cards");
  }

  function chooseColor(color) {
    socket.emit("card-color", color);
  }

  function startListeners() {
    socket.on("game-error", (e) => {
      handlers.onError(e);
    });
    socket.on("game-state", (state) => {
      gameState = state;
      handlers.onUpdate(state);
    });
    socket.on("deal-card", (uid, card) => {
      if (card === null) {
        handlers.onCardDealt(uid);
      } else {
        handlers.onCardRecieved(card);
      }
    });
    socket.on("choose-color", () => {
      handlers.onColorPrompt();
    });
  }

  function stopListeners() {
    if (socket) {
      socket.removeAllListeners("error");
      socket.removeAllListeners("game-state");
      socket.removeAllListeners("deal-card");
    }
  }

  return {
    bindSocket: bindSocket,
    ready: ready,
    handlers: handlers,
    getState: getState,
    startListeners: startListeners,
    stopListeners: stopListeners,
    playCard: playCard,
    drawCards: drawCards,
    chooseColor: chooseColor,

    _getSocket: () => {
      return socket;
    }, // Have to use a getter here because it doesn't pass a reference if we don't (will just give null every time it's accessed)
  };
})();
