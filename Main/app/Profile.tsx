import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "expo-router";

const defaultAvatar = "https://ui-avatars.com/api/?name=User";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Image source={{ uri: user.profileImage || defaultAvatar }} style={styles.avatar} />
      </View>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.item}>First Name: {user.firstName}</Text>
      <Text style={styles.item}>Last Name: {user.lastName}</Text>
      <Text style={styles.item}>Username: {user.username}</Text>
      <Text style={styles.item}>Email: {user.email}</Text>
      <Text style={styles.item}>Genre: {user.genre}</Text>
      <Text style={styles.item}>Gender: {user.gender}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#000", // Always black background
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#fff", // Always white
  },
  item: {
    fontSize: 18,
    marginBottom: 8,
    color: "#fff", // Always white
  },
  editButton: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#1DB954",
    borderRadius: 8,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#1DB954",
    backgroundColor: "#bbb",
  },
});
