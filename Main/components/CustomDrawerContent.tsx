import React, { useState } from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Switch, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, setTheme } from "../store/themeSlice";
import { RootState } from "../store";
import ThemeColorPicker from "../components/ThemeColorPicker";

export default function CustomDrawerContent(props: any) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const accent = useSelector((state: RootState) => state.theme.accent);
  const dispatch = useDispatch();
  const isDark = theme === "dark";
  const isCustom = theme === "custom";
  const [pickerVisible, setPickerVisible] = useState(false);

  // Toggle switch ONLY toggles light/dark (not custom)
  return (
    <>
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
            Theme: {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Custom"}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch
              value={isDark}
              onValueChange={() => dispatch(toggleTheme())}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDark ? "#fff" : "#f4f3f4"}
            />
            <TouchableOpacity
              style={{
                marginLeft: 18,
                backgroundColor: isCustom ? accent : "#ddd",
                padding: 8,
                borderRadius: 7,
              }}
              onPress={() => setPickerVisible(true)}
            >
              <Text style={{ color: isCustom ? "#fff" : "#18181b" }}>Custom</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
      <ThemeColorPicker visible={pickerVisible} onClose={() => setPickerVisible(false)} />
    </>
  );
}
