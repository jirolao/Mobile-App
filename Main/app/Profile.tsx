import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "expo-router";

const defaultAvatar = "https://ui-avatars.com/api/?name=User";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.theme);
  const isDark = theme.theme === "dark";
  const bgColor = theme.customColor || (isDark ? "#000000" : "#ffffff");
  const textColor = isDark ? "#fff" : "#000";
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Image source={{ uri: user.profileImage || defaultAvatar }} style={styles.avatar} />
      </View>
      <Text style={[styles.header, { color: textColor }]}>Profile</Text>
      <Text style={[styles.item, { color: textColor }]}>First Name: {user.firstName}</Text>
      <Text style={[styles.item, { color: textColor }]}>Last Name: {user.lastName}</Text>
      <Text style={[styles.item, { color: textColor }]}>Email: {user.email}</Text>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 24 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 18 },
  item: { fontSize: 18, marginBottom: 8 },
  editButton: { marginTop: 24, paddingVertical: 10, paddingHorizontal: 18, backgroundColor: "#1DB954", borderRadius: 8 },
  editText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: "#1DB954", backgroundColor: "#bbb" },
});
