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
      const selectedCard = player.hand[selectedCardIndex];

      player.ready += 1;

      if (game.phase === 0) {
        player.hand.splice(selectedCardIndex, 1);

        game.votingCards.push({
          ...selectedCard,
          votes: [],
          player: playerId,
        });
      }

      if (game.phase === 1) {
        game?.votingCards?.at(selectedCardIndex)?.votes.push(playerId);
      }

      if (game.phase === 2) {
        player.ready = 0
        const drawCard = draw();
        player.hand.push(...drawCard);
      }

      const isAllPlayersReady = Object.values(game.players)?.every(
        (player) => player.ready !== game.phase
      );

      if (isAllPlayersReady) {
        game.phase += 1;

        if (game.phase === 2) {
          for (let votedCards of game.votingCards) {
            if (votedCards?.player) {
              game.players[votedCards.player].score += votedCards.votes.length;
            }
          }
        }

        if (game.phase === 3) {
          game.votingCards = [];
          game.phase = 0;
          game.phrase.shift();
        }
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
