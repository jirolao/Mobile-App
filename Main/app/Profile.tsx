import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const defaultAvatar = "https://ui-avatars.com/api/?name=User";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("spotplaylist")}
      >
        <AntDesign name="arrowleft" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user.profileImage || defaultAvatar }}
          style={styles.avatar}
        />
      </View>

      {/* User Info */}
      <Text style={styles.header}>Profile</Text>
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{user.firstName || "-"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{user.lastName || "-"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.username || "-"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email || "-"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.value}>{user.genre || "-"}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  avatarContainer: {
    marginTop: 80,
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#bbb",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  infoBox: {
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#1a1a1a",
  },
  label: {
    color: "#999",
    fontSize: 16,
  },
  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  editButton: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});