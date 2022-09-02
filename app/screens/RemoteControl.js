import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, Button } from "react-native";
import Joystick from "../components/Joystick";
import {
  useRemoteUpdate,
  useRemote,
} from "../components/Context/GlobalContext";

function RemoteControl(props) {
  const [leftStick, setLeftStick] = useState({
    x: 0,
    y: 0,
  });

  const [rightStick, setRightStick] = useState({
    x: 0,
    y: 0,
  });

  const remote = useRemote();

  const rmUpdate = useRemoteUpdate();

  useEffect(() => {
    rmUpdate({
      leftStick: leftStick,
      rightStick: rightStick,
    });
  }, [leftStick, rightStick]);

  return (
    <View style={styles.page}>
      <Joystick
        text={"L"}
        size={10}
        getData={leftStick}
        setData={setLeftStick}
      ></Joystick>

      <View style={styles.buttonWrapper}>
        <Button
          color={remote.armed ? "green" : "red"}
          title="Arm"
          onPress={() => rmUpdate({ armed: true })}
        />
        <View style={styles.space} />

        <Button
          color={remote.callibrate ? "green" : "red"}
          title="Callibrate"
          onPress={() => rmUpdate({ callibrate: true })}
        />
        <View style={styles.space} />
        <Button
          color={remote.autoPilot ? "green" : "red"}
          title="Auto Pilot"
          onPress={() => rmUpdate({ autoPilot: true })}
        />
        <View style={styles.space} />
        <Button
          color={remote.autoFly ? "green" : "red"}
          title="Auto TakeOff"
          onPress={() => rmUpdate({ autoFly: true })}
        />
        <View style={styles.space} />
        <Button
          color={remote.autoLand ? "green" : "red"}
          title="Auto Land"
          onPress={() => rmUpdate({ autoLand: true })}
        />
        <View style={styles.space} />
        <Button
          color={remote.demo ? "green" : "red"}
          title="Demo"
          onPress={() => rmUpdate({ demo: true })}
        />
      </View>
      <Joystick
        text={"R"}
        size={10}
        getData={rightStick}
        setData={setRightStick}
      ></Joystick>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 100,
    paddingRight: 100,
  },
  buttonWrapper: {
    marginTop: 300,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spaces: {
    minWidth: 10,
    height: "auto",
  },
});

export default RemoteControl;
