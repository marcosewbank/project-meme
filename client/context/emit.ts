import { socket } from "./index";

export const playerJoined = (data: any) => {
  socket.emit("player-joined", data);
};

export const drawCards = (id: string) => {
  socket.emit("draw-card", id);
};

