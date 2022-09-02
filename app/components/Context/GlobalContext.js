import React, { useContext, useState, useEffect } from "react";

const GlobalContext = React.createContext();
const RemoteContext = React.createContext();

const SERVER_HOST = "localhost";
const SERVER_PORT = 8020;

const wsRC = new WebSocket(`ws://${SERVER_HOST}:${SERVER_PORT}/rc`);

export function useRemote() {
  return useContext(GlobalContext);
}
export function useRemoteUpdate() {
  return useContext(RemoteContext);
}

export const GlobalContextProvider = ({ children }) => {
  const [remoteState, setRemoteState] = useState({
    left: {
      x: 0,
      y: 0,
    },
    right: {
      x: 0,
      y: 0,
    },
    armed: false,
    callibrate: false,
    autoLand: false,
    autoFly: false,
    autoPilot: false,
    demo: false,
    droneConnected: false,
    rcConnected: false,
  });

  const [wsState, setWsState] = useState(null);

  function updateRemote(data) {
    if (data && (data.leftStick || data.rightStick)) {
      setRemoteState({
        ...remoteState,
        left: {
          x: data.leftStick.x,
          y: data.leftStick.y,
        },
        right: {
          x: data.rightStick.x,
          y: data.rightStick.y,
        },
      });
    }

    if (data && data.armed) {
      setRemoteState({
        ...remoteState,
        armed: !remoteState.armed,
      });
    }

    if (data && data.callibrate) {
      setRemoteState({
        ...remoteState,
        callibrate: !remoteState.callibrate,
      });
    }

    if (data && data.autoPilot) {
      setRemoteState({
        ...remoteState,
        autoPilot: !remoteState.autoPilot,
      });
    }

    if (data && data.autoFly) {
      setRemoteState({
        ...remoteState,
        autoFly: !remoteState.autoFly,
      });
    }

    if (data && data.autoLand) {
      setRemoteState({
        ...remoteState,
        autoLand: !remoteState.autoLand,
      });
    }

    if (data && data.demo) {
      setRemoteState({
        ...remoteState,
        demo: !remoteState.demo,
      });
    }
  }

  const ReceiveFC = () => {
    var ws = new WebSocket(`ws://${SERVER_HOST}:${SERVER_PORT}/rc`);
    ws.onopen = () => {
      setRemoteState({
        ...remoteState,
        droneConnected: true,
      });
    };
    ws.onclose = (e) => {
      console.log("closed", e);
      setRemoteState({
        ...remoteState,
        droneConnected: false,
      });
      setTimeout(() => {
        connectionRC();
      }, 3000);
    };
    ws.onerror = (e) => {
      console.log("error", e);
      ws.close();
    };
    ws.onmessage = (e) => {
      console.log("message", e.data);
    };
  };

  useEffect(() => {
    if (wsRC.readyState === 1) {
      console.log("sending data", wsRC.readyState);
      wsRC.send(JSON.stringify(remoteState));
    }
  }, [remoteState]);

  return (
    <GlobalContext.Provider value={remoteState}>
      <RemoteContext.Provider value={updateRemote}>
        {children}
      </RemoteContext.Provider>
    </GlobalContext.Provider>
  );
};
