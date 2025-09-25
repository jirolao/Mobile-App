import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "expo-router";

const defaultAvatar = "https://ui-avatars.com/api/?name=User";

export default function SpotPlaylist() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);

  // Dropdown state
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      {/* Header with avatar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotify Playlists</Text>
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
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setDropdownVisible(false);
              navigation.navigate("Profile");
            }}
          >
            <Text style={styles.dropdownText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Spotify content (centered) */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Your Spotify playlists go here.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: "100%",
    backgroundColor: "#000", // Always black background
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" }, // Always white text
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
    top: 70,
    right: 20,
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 120,
    backgroundColor: "#222", // Always dark
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
  dropdownText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
  },
  contentText: {
    color: "#fff", // Always white text
  },
});
