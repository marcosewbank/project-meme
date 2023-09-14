import io from "socket.io-client";

import { socketEvents } from "./events";
import { getQueueLength } from "./emit";

export const socket = io();

export const initSockets = (event: any) => {
  console.log("🚀 ~ file: index.tsx:9 ~ initSockets ~ event:", event);
  socketEvents(event);

  getQueueLength();
};
