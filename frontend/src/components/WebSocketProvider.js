import React, { createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const WebsocketContext = createContext(false, null, () => {});
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumers.
export const WebsocketProvider = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);
  const [reconnect, setReconnect] = useState(false);
  const [reconnectInterval, setReconnectInterval] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    if (userInfo) {
      const socket = new WebSocket(
        "ws://localhost:8000/ws/notifications/?token=" + userInfo.token
      );

      socket.onopen = () => {
        setIsReady(true);
      };
      socket.onclose = () => {
        setIsReady(false);
        setTimeout(() => {
          setReconnect(!reconnect);
        }, 5000);
      };
      socket.onmessage = (event) => {
        setVal(JSON.parse(event.data));
        // console.log(event.data);
      };
      socket.onerror = (error) => {
        setTimeout(() => {
          setReconnect(!reconnect);
        }, 5000);
      };

      ws.current = socket;

      return () => {
        socket.close();
      };
    }
  }, [userInfo, reconnect]);

  const ret = [isReady, val, ws.current?.send.bind(ws.current)];

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};
