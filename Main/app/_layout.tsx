import React, { useEffect, useState, useRef } from "react";
import { Drawer } from "expo-router/drawer";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState } from "../store";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { TouchableOpacity, View, Text, Animated, Easing } from "react-native";
import { setTheme, hydrateTheme } from "../store/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeColorPicker from "../components/ThemeColorPicker";

function ThemedDrawer() {
  const themeState = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const { theme, accent } = themeState;
  const isDark = theme === "dark";
  const isCustom = theme === "custom";
  const bgColor = isDark || isCustom ? "#18181b" : "#fff";
  const textColor = isDark || isCustom ? "#fff" : "#18181b";
  const activeTint = isCustom ? accent : "#1DB954";

  // Animated background color transition
  const [animatedBg] = useState(new Animated.Value(0));
  const prevBg = useRef(bgColor);

  useEffect(() => {
    if (prevBg.current !== bgColor) {
      Animated.timing(animatedBg, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start(() => {
        animatedBg.setValue(0);
        prevBg.current = bgColor;
      });
    }
  }, [bgColor]);

  const animatedBackground = animatedBg.interpolate({
    inputRange: [0, 1],
    outputRange: [prevBg.current, bgColor],
  });

  // Persist and restore theme
  useEffect(() => {
    AsyncStorage.getItem("themeSettings").then((data) => {
      if (data) dispatch(hydrateTheme(JSON.parse(data)));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeSettings", JSON.stringify(themeState));
  }, [themeState]);

  // Color picker modal state
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <Animated.View style={{ flex: 1, backgroundColor: animatedBackground }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: bgColor },
          headerTintColor: textColor,
          drawerActiveTintColor: activeTint,
          drawerLabelStyle: { fontSize: 16, color: textColor },
          drawerStyle: { backgroundColor: bgColor },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="explore" options={{ title: "Explore" }} />
        <Drawer.Screen name="spotlogin" options={{ title: "Spotify" }} />
        <Drawer.Screen name="componentshowcase" options={{ title: "Random Buttons" }} />
        <Drawer.Screen name="spotsign" options={{ drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="spotplaylist" options={{ drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="Profile" options={{ drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="EditProfile" options={{ drawerItemStyle: { display: "none" } }} />

        <Drawer.Screen
          name="+not-found"
          options={{
            href: null,
            drawerItemStyle: { display: "none" },
            headerRight: () => (
              <View style={{ flexDirection: "row", marginRight: 12, alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => dispatch(setTheme("light"))}
                  style={{ paddingHorizontal: 8 }}
                >
                  <Text style={{ color: theme === "light" ? activeTint : textColor, fontWeight: "bold" }}>
                    Light
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => dispatch(setTheme("dark"))}
                  style={{ paddingHorizontal: 8 }}
                >
                  <Text style={{ color: theme === "dark" ? activeTint : textColor, fontWeight: "bold" }}>
                    Dark
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setTheme("custom"));
                    setPickerVisible(true);
                  }}
                  style={{ paddingHorizontal: 8 }}
                >
                  <Text style={{ color: theme === "custom" ? activeTint : textColor, fontWeight: "bold" }}>
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Drawer>
      <ThemeColorPicker visible={pickerVisible} onClose={() => setPickerVisible(false)} />
    </Animated.View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemedDrawer />
    </Provider>
  );
}
