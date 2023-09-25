const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

type Point = { x: number; y: number };

type PlayersT = {
  [key: string]: {
    score: number;
    hand: string[];
    name: string;
  };
};

let game: any = {};
let players: PlayersT = {};

io.on("connection", (socket) => {
  socket.on("player-joined", (player: string) => {
    players[socket.id] = {
      score: 0,
      hand: [""],
      name: player,
    };

    io.sockets.emit("players-list", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
  });
});

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001')
})
