import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SpotLogo from "@/assets/images/spotlogo.jpg";

export default function SpotifySignUpScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (
      firstName.trim().length < 2 ||
      lastName.trim().length < 2 ||
      username.length < 3 ||
      password.length < 3 ||
      !gender
    ) {
      setError("Please complete all fields with valid values.");
      return;
    }
    // Store as single user object for demo
    await AsyncStorage.setItem(
      "userCreds",
      JSON.stringify({
        firstName,
        lastName,
        username,
        password,
        gender,
      })
    );
    setError("");
    // Show notification and redirect to login
    Alert.alert("Account created!", "You can now log in.", [
      {
        text: "OK",
        onPress: () => router.replace("/spotlogin"),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={SpotLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Spotify</Text>
      </View>
      <View style={styles.inputContainer}>
        {error ? (
          <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Email or Username"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Gender (e.g. Male, Female, Other)"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={gender}
          onChangeText={setGender}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialIconButtons}>
        <TouchableOpacity style={[styles.iconButton, styles.google]}>
          <AntDesign name="google" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.facebook, styles.iconButtonLast]}>
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.login}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("/spotlogin")}
        >
          Log in to Spotify
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 80 : 40,
    flexGrow: 1,
    alignItems: "center",
    minHeight: "100%",
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 200,
  },
  title: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "600",
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#282828",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  signupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  socialIconButtons: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconButtonLast: {
    marginRight: 0,
  },
  google: {
    backgroundColor: "#fff",
  },
  facebook: {
    backgroundColor: "#3b5998",
  },
  link: {
    color: "#1DB954",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  login: {
    color: "#fff",
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
});
