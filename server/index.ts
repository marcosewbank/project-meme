const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

import type { GameT } from "./types/typing";
import { phrases } from "./mock/phrases";
import { gifs } from "./mock/gifs";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let game: GameT = {
  phase: 0,
  phrase: phrases,
  deck: gifs,
  players: {},
  votingCards: [],
};

const shuffle = () => game.deck.sort(() => Math.random() - 0.5);

const draw = (deleteCount = 5, start = 0) =>
  game.deck.splice(start, deleteCount);

io.on("connection", (socket) => {
  console.log("🚀 ~ file: index.ts:25 ~ game:", game?.players);

  socket.on("player-joined", (playerName: string) => {
    const playerDraw = draw(5);

    game.players[socket.id] = {
      score: 0,
      hand: playerDraw,
      name: playerName,
      ready: false,
    };

    io.sockets.emit("game-update", game);
  });

  socket.on("player-ready", ({ playerId, selectedCardIndex }) => {
    const player = game.players[playerId];

    player.ready = true;
    // Add card to the voting cards array
    game.votingCards.push(player.hand[selectedCardIndex]);
    // Remove selected card from players hand
    player.hand.splice(selectedCardIndex, 1);

    const isAllPlayersReady = Object.values(game.players)?.every(
      (player) => player.ready === true
    );

    if (isAllPlayersReady) {
      // Update game phase
      game.phase += 1;
      // Draw new card for player
      draw(1);
      io.sockets.emit("game-update", game);
    }
  });

  socket.on("draw-card", (player) => {
    const cardsOnHand = game.players[player].hand.length;
    const maxOnHand = 5;
    const cardsToBuy = maxOnHand - cardsOnHand;

    if (cardsToBuy > 0) {
      const playerDraw = draw(cardsToBuy);

      game.players[player].hand = playerDraw;
    }

    io.sockets.emit("game-update", game);
  });

  socket.on("disconnect", () => {
    delete game.players[socket.id];
    io.sockets.emit("game-update", game);
  });
});

server.listen(3001, () => {
  console.log("✔️ Server listening on port 3001");
});
