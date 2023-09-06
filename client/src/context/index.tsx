import React, { createContext, useContext } from "react";

const SocketContext = createContext<null>(null);

const SocketProvider: React.FC<any> = (props) => {
  return (
    <SocketContext.Provider value={null}>
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
