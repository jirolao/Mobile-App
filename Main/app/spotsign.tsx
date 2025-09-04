import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import SpotLogo from "@/assets/images/spotlogo.jpg";

export default function SpotifySignUpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo + Title */}
      <View style={styles.logoContainer}>
        <Image source={SpotLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Spotify</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Social Sign Up */}
      <View style={styles.socialIconButtons}>
        <TouchableOpacity style={[styles.iconButton, styles.google]}>
          <AntDesign name="google" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, styles.facebook, styles.iconButtonLast]}
        >
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Footer Note */}
      <Text style={styles.login}>
        Already have an account? <Text style={styles.link}>Log in here</Text>
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
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#282828",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  signUpButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  socialIconButtons: {
    flexDirection: "row",
    marginTop: 20,
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
