"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const Room = ({ params }: { params: { slug: string } }) => {
  useEffect(() => {
    const socket: Socket<any> = io(`http://localhost:3001/${params}`, {
      auth: {
        username: localStorage.getItem("player"),
      },
      autoConnect: false,
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      eaeae222
    </main>
  );
};

export default Room;
