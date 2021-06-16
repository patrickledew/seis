const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {Lobby, LobbyManager} = require('./lobby');
const { Socket } = require('dgram');
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, process.env.NODE_ENV === 'development' ? {
    cors: {
        origin: "http://localhost:3000", //Needed for webpack dev server running on different port
        methods: ["GET", "POST"]
    }
} : {});

const lobbyManager = new LobbyManager(io);

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "/../client/build"))); //static files

app.get("/api/createlobby", (req, res) => {
    let id = lobbyManager.createLobby(null);
    if (id == null) res.status(500).send("No more lobbies available. Please contact Ricky and tell him to get his shit together.");
    else res.status(200).send(id);
})

app.get("/api/lobbyexists", (req, res) => {
    let id = req.query["id"];
    if (typeof id === 'undefined') {
        res.status(400).send("Please specify the id of the lobby.");
    } else {
        if (lobbyManager.lobbyExists(id)) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    }
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build/index.html")) //Needed for the react app to work across different endpoints
});


console.log("Starting server on port " + (process.env.PORT || 4000))

server.listen(process.env.PORT || 4000);

io.on("connection", (sock) => {
    sock.on('joinlobby', (lobbyId, userName) => {
        console.log("Attempting to join lobby. ID: " + lobbyId + ", Name: " + userName);
        if (lobbyManager.lobbyExists(lobbyId)) {
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
            sock.emit('error', {type: 'invalid-lobby', msg: "Error connecting to lobby. Lobby doesn't exist."})
            return;
        }
        let lobby = lobbyManager.getLobby(lobbyId);
        
        lobby.addPlayer(sock, userName);
    });
});


