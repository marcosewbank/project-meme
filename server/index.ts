const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'
import type { CardT, GameT, PlayersT } from "./types/typing";
import { phrases } from "./mock/phrases";
import { gifs } from "./mock/gifs";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let game: GameT = {
  phase: "waiting",
  phrase: phrases,
  deck: gifs,
  players: {},
};

const shuffle = () => game.deck.sort(() => Math.random() - 0.5);

const draw = (deleteCount = 5, start = 0) =>
  game.deck.splice(start, deleteCount);

io.on("connection", (socket) => {
  console.log("🚀 ~ file: index.ts:23 ~ game:", game.deck.length);
  console.log("🚀 ~ file: index.ts:27 ~ players:", game.players);

  socket.on("player-joined", (player: string) => {
    game.players[socket.id] = {
      score: 0,
      hand: [],
      name: player,
    };

    io.sockets.emit("game-update", game);
  });

  socket.on("draw-card", (player) => {
    const cardsOnHand = game.players[player].hand.length;
    const maxOnHand = 5;
    const cardsToBuy = maxOnHand - cardsOnHand;

    console.log("🚀 ~ file: index.ts:48 ~ socket.on ~ cardsToBuy:", cardsToBuy);

    if (cardsToBuy > 0) {
      const playerDraw = draw(cardsToBuy);

      game.players[player].hand = playerDraw;
    }

    io.sockets.emit("game-update", game);
  });

  socket.on("disconnect", () => {
    delete game.players[socket.id];
  });
});

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001')
})
