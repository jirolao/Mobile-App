import React from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Switch, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { RootState } from "../store";

export default function CustomDrawerContent(props: any) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const isDark = theme === "dark";

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ padding: 20, borderTopWidth: 1, borderColor: "#eee" }}>
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 8,
            color: isDark ? "#fff" : "#18181b",
            textAlign: "left",
          }}
        >
          Theme: {theme === "light" ? "Light" : "Dark"}
        </Text>
        <View style={{ alignItems: "flex-start" }}>
          <Switch
            value={isDark}
            onValueChange={() => dispatch(toggleTheme())}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDark ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
