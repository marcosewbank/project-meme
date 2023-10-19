"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const socket = io("http://localhost:3001");
const SocketContext = createContext<any>(null);

const SocketProvider: React.FC<any> = (props) => {
  const [value, setValue] = useState();

  useEffect(() => {
    socket.on("game-update", (data) => {
      setValue(data);
    });

    return () => {
      socket.off("game-update");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        id: socket.id,
        gameData: value,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocketContext must be used within an EnrollmentContext Provider"
    );
  }

  return context;
};
