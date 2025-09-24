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

export default function SpotifyLoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username.length < 3 || password.length < 3) {
      Alert.alert("Error", "Username and password must be at least 3 characters.");
      return;
    }
    const stored = await AsyncStorage.getItem("userCreds");
    if (!stored) {
      Alert.alert("Error", "No account found. Please sign up first.");
      return;
    }
    const { username: storedUsername, password: storedPassword } = JSON.parse(stored);
    if (username !== storedUsername || password !== storedPassword) {
      Alert.alert("Error", "Invalid username or password.");
      return;
    }
    await AsyncStorage.setItem("userToken", "demo");
    router.replace("/spotplaylist");
  };

  // This is the handler for the sign-up text link
  const handleGoToSignUp = () => {
    router.push("/spotsign");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={SpotLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Spotify</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email or username"
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.link}>Forgot your password?</Text>
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
      <Text style={styles.signup}>
        Don’t have an account?{" "}
        <Text
          style={styles.link}
          onPress={handleGoToSignUp} // <-- Ensure this uses the new handler
        >
          Sign up for Spotify
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
  loginButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 8,
    alignSelf: "flex-end",
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
  signup: {
    color: "#fff",
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
});
