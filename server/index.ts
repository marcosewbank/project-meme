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

const draw = (deleteCount = 1, start = 0) =>
  game.deck.splice(start, deleteCount);

io.on("connection", (socket) => {
  socket.on("player-joined", (playerName: string) => {
    const playerDraw = draw(5);

    game.players[socket.id] = {
      score: 0,
      hand: playerDraw,
      name: playerName,
      ready: 0,
    };

    io.sockets.emit("game-update", game);
  });

  socket.on(
    "player-ready",
    ({
      playerId,
      selectedCardIndex,
    }: {
      playerId: string;
      selectedCardIndex: number;
    }) => {
      const player = game.players[playerId];
      console.log("🚀 ~ file: index.ts:56 ~ io.on ~ player:", player);
      const selectedCard = player.hand[selectedCardIndex];
      console.log(
        "🚀 ~ file: index.ts:58 ~ io.on ~ selectedCard:",
        selectedCard
      );

      player.ready += 1;

      if (game.phase === 0) {
        // Remove selected card from players hand
        player.hand.splice(selectedCardIndex, 1);
        // Add card to the voting cards array
        game.votingCards.push({ ...selectedCard, votes: 0 });
      }

      if (game.phase === 1) {
        game.votingCards.at(selectedCardIndex)!.votes! += 1;
      }

      const isAllPlayersReady = Object.values(game.players)?.every(
        (player) => player.ready !== game.phase
      );

      if (isAllPlayersReady) {
        game.phase += 1;
        const drawCard = draw();
        player.hand.push(...drawCard);
      }

      io.sockets.emit("game-update", game);
    }
  );

  socket.on("disconnect", () => {
    delete game.players[socket.id];
    io.sockets.emit("game-update", game);
  });
});

server.listen(3001, () => {
  console.log("✔️ Server listening on port 3001");
});
