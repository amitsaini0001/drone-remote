import React from "react";
import { useRemote } from "../components/Context/GlobalContext";
import { Text } from "react-native";
import RemoteControl from "../screens/RemoteControl";

function Home(props) {
  const remote = useRemote();
  return (
    <>
      <RemoteControl />
      <Text>{remote.droneConnected ? "Connected" : "Connecting ..."}</Text>
    </>
  );
}

export default Home;
