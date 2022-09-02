import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const SIZE = 60.0;
const CIRCLE_RADIUS = SIZE * 2;

const Joystick = ({ text, getData, setData }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    const toggle = setInterval(() => {
      if (getData.x !== translateX.value || getData.y !== translateY.value) {
        setData({
          x: translateX.value,
          y: translateY.value,
        });
      }
    }, 100);

    return () => clearInterval(toggle);
  });

  //   useEffect(() => {
  //     dy = valueY;
  //   }, [valueY]);

  const context = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((e) => {
      if (e.translationX > -100 && e.translationX < 100) {
        translateX.value = e.translationX + context.value.x;
      }
      if (e.translationY > -100 && e.translationY < 100) {
        translateY.value = e.translationY + context.value.y;
      }
      if (e.translationX < -100) {
        translateX.value = -100;
      }
      if (e.translationX > 100) {
        translateX.value = 100;
      }
      if (e.translationY < -100) {
        translateY.value = -100;
      }
      if (e.translationY > 100) {
        translateY.value = 100;
      }
    })
    .onEnd((e) => {
      translateX.value = 0;
      translateY.value = 0;
    });

  const followX = useDerivedValue(() => {
    return withSpring(translateX.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(translateY.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: followX.value,
        },
        {
          translateY: followY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.wrapper}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.circle}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.square, rStyle]}>
              <Text style={styles.text}>{text}</Text>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 150,
    maxHeight: 150,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 256, 0.5)",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 256, 0.5)",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});

export default Joystick;
