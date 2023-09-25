import { socket } from "./index";

export const playerJoined = (data: any) => {
  socket.emit("player-joined", data);
};
