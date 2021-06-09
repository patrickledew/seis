const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {Lobby, LobbyManager} = require('./lobby');
const app = express();

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "/../client/build"))); //static files

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build/index.html")) //Needed for the react app to work across different endpoints
});

console.log("Starting server on port " + process.env.PORT || 4000)

const server = app.listen(process.env.PORT || 4000);
const io = require("socket.io")(server, process.env.NODE_ENV === 'development' ? {
    cors: {
        origin: "http://localhost:3000", //Needed for webpack dev server running on different port
        methods: ["GET", "POST"]
    }
} : {});
const lobbyManager = new LobbyManager(io);

io.on("connection", (sock) => {
    sock.on('joinlobby', (lobbyId, userName) => {
        console.log("Attempting to join lobby. ID: " + lobbyId + ", Name: " + userName);
        if (lobbyId == null) {
            lobbyId = lobbyManager.createLobby(null);
            sock.emit('changelobby', lobbyId);
            return;
        }
        else if (lobbyManager.lobbyExists(lobbyId)) {
            if (lobbyManager.isPrivate(lobbyId)) {
                sock.emit('error', {type: 'private-lobby', msg: "Error connecting to lobby. This lobby is private."})
                return;
            } else if (lobbyManager.isInProgress(lobbyId)) {
                sock.emit('error', {type: 'in-progress', msg: "Error connecting to lobby. This lobby is currently in a game that's in progress. Try again when the game is over."})
                return;
            } else if (lobbyManager.isNameTaken(lobbyId, userName)) {
                sock.emit('error', {type: 'name-taken', msg: "Error connecting to lobby. Username already in use."})
                return;
            }
        } else {
            if (lobbyManager.createLobby(lobbyId) == null) sock.emit('error', {type: 'no-more-lobbies', msg: "Maximum concurrent lobby limit exceeded. There are too many active lobbies, try again later."})
        }
        let lobby = lobbyManager.getLobby(lobbyId);
        
        lobby.addPlayer(sock, userName);
    })
});


