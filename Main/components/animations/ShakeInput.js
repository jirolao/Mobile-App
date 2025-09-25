import React from "react";
import { TextInput } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function ShakeInput({ hasError, style, ...props }) {
  const shake = useSharedValue(0);

  React.useEffect(() => {
    if (hasError) {
      shake.value = withSpring(1, { stiffness: 400 }, (isFinished) => {
        if (isFinished) shake.value = withSpring(0);
      });
    }
  }, [hasError]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: shake.value
          ? Math.sin(shake.value * 10 * Math.PI) * 8
          : 0,
      },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TextInput {...props} style={style} />
    </Animated.View>
  );
}
