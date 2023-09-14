import { socket } from "./index";

export const socketEvents = (event: any) => {
  console.log("🚀 ~ file: events.ts:4 ~ socketEvents ~ event:", event);
  
  socket.on(event.name, (props: any) => {
    console.log("🚀 ~ file: events.ts:4 ~ socket.on ~ props:", props);
  });
};
