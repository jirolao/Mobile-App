import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { updateUser } from "../store/userSlice";
import { useNavigation } from "expo-router";

const defaultAvatar = "https://ui-avatars.com/api/?name=User";

export default function EditProfile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [gender, setGender] = useState(user.gender ?? "");
  const [email, setEmail] = useState(user.email ?? "");

  function handleSave() {
    dispatch(updateUser({ firstName, lastName, gender, email }));
    Alert.alert("Profile updated!");
    navigation.navigate("spotplaylist");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#000000" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.fullBlack}>
        <TouchableOpacity style={styles.avatarWrapper}>
          <Image
            source={{ uri: user.profileImage || defaultAvatar }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#bbb"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#bbb"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="#bbb"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={{ marginTop: 18, width: "100%" }}>
          <Button title="Save" onPress={handleSave} color="#1DB954" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullBlack: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#000000",
  },
  header: { fontSize: 26, fontWeight: "bold", marginVertical: 18, color: "#fff" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
    width: "100%",
    maxWidth: 350,
    color: "#fff",
    borderColor: "#fff",
    backgroundColor: "#232323",
  },
  avatarWrapper: {
    marginTop: 18,
    marginBottom: 12,
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "#bbb",
  },
});
