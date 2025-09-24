import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "expo-router";

const defaultAvatar = "https://ui-avatars.com/api/?name=User";

export default function SpotPlaylist() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.theme);
  const isDark = theme.theme === "dark";
  const bgColor = theme.customColor || (isDark ? "#000000" : "#ffffff");
  const textColor = isDark ? "#fff" : "#000";

  // Dropdown state
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header with avatar */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Spotify Playlists</Text>

        {/* Avatar with dropdown */}
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Image
            source={{ uri: user.profileImage || defaultAvatar }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Mini Dropdown */}
      {dropdownVisible && (
        <View style={[styles.dropdown, { backgroundColor: isDark ? "#222" : "#eee" }]}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setDropdownVisible(false);
              navigation.navigate("Profile");
            }}
          >
            <Text style={{ color: isDark ? "#fff" : "#000", fontWeight: "bold" }}>Profile</Text>
          </TouchableOpacity>
          {/* You can add more items here later */}
        </View>
      )}

      {/* Spotify content */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: textColor }}>Your Spotify playlists go here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 46,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#1DB954",
    backgroundColor: "#bbb",
  },
  dropdown: {
    position: "absolute",
    top: 70, // adjust based on header height
    right: 20,
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 120,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
