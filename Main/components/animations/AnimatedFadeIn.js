import React from "react";
import Animated, { FadeIn } from "react-native-reanimated";

export default function AnimatedFadeIn({ children, style }) {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={style}>
      {children}
    </Animated.View>
  );
}
