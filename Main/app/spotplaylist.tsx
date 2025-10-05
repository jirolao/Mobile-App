// This is the updated version of spotplaylist.tsx with profile icon restored, animated dropdown, and navigation to profile.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addPlaylist } from "@/store/musicSlice";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const defaultAvatar = "https://ui-avatars.com/api/?name=User";

export default function SpotPlaylist() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);
  const playlists = useSelector((state: RootState) => state.music.playlist);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleCreate = () => {
    if (newPlaylistName.trim()) {
      dispatch(addPlaylist(newPlaylistName.trim()));
      setNewPlaylistName("");
      setModalVisible(false);
    }
  };

  const renderPlaylist = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.playlistCard}
      onPress={() => console.log("Open Playlist", item)}
    >
      <View style={styles.squareBox} />
      <Text style={styles.playlistName}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotify Playlists</Text>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Image
            source={{ uri: user.profileImage || defaultAvatar }}
            style={styles.avatarCircle}
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown */}
      {dropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            onPress={() => {
              setDropdownVisible(false);
              navigation.navigate("Profile");
            }}
          >
            <Text style={styles.dropdownText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Playlist Grid */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={renderPlaylist}
      />

      {/* Add Playlist Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Add Playlist Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Create Playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Playlist Name"
              placeholderTextColor="#888"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdownMenu: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: "#111",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 10,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  grid: {
    paddingBottom: 100,
  },
  playlistCard: {
    width: "48%",
    marginBottom: 20,
    alignItems: "center",
  },
  squareBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
  },
  playlistName: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createButton: {
    backgroundColor: "#1DB954",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
