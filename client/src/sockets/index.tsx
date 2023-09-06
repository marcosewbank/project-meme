import io from "socket.io-client";

import { socketEvents } from "./events";
import { getQueueLength } from "./emit";

export const socket = io();

export const initSockets = (event: any) => {
  socketEvents(event);

  getQueueLength();
};
