import React from "react";
import { Drawer } from "expo-router/drawer";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "../store";
import CustomDrawerContent from "./CustomDrawerContent";
import { TouchableOpacity, View, Text } from "react-native";
import { toggleTheme } from "../store/themeSlice";

function ThemedDrawer() {
  const themeState = useSelector((state: RootState) => state.theme);
  const isDark = themeState.theme === "dark";
  const bgColor = themeState.customColor || (isDark ? "#000000" : "#ffffff");
  const textColor = isDark ? "#fff" : "#000";

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: bgColor },
        headerTintColor: textColor,
        drawerActiveTintColor: "#1DB954",
        drawerLabelStyle: { fontSize: 16, color: textColor },
        drawerStyle: { backgroundColor: bgColor },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="explore" options={{ title: "Explore" }} />
      <Drawer.Screen name="spotlogin" options={{ title: "Spotify" }} />
      <Drawer.Screen name="componentshowcase" options={{ title: "Components" }} />
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
              {/* Only one toggle */}
              <TouchableOpacity
                onPress={() => store.dispatch(toggleTheme())}
                style={{ paddingHorizontal: 8 }}
              >
                <Text style={{ color: "#1DB954", fontWeight: "bold" }}>
                  {isDark ? "Dark" : "Light"}
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemedDrawer />
    </Provider>
  );
}
