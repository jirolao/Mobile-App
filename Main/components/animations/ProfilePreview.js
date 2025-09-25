import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const ProfilePreview = React.memo(function ProfilePreview({ username, email, genre }) {
  const genreText = genre?.trim() ? genre : "Profile";
  const imgUrl = `https://via.placeholder.com/100?text=${encodeURIComponent(genreText)}`;

  if (!username && !email && !genre) return null;

  return (
    <Animated.View entering={FadeIn.duration(350)} style={styles.card}>
      <Image source={{ uri: imgUrl }} style={styles.avatar} />
      <Text style={styles.name}>{username || "Username"}</Text>
      <Text style={styles.email}>{email || "Email"}</Text>
      <Text style={styles.genre}>{genre || "Genre"}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    alignItems: "center",
    backgroundColor: "#18181b",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
    minWidth: 220,
    maxWidth: 320,
    alignSelf: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    backgroundColor: "#333",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  email: {
    color: "#bbb",
    fontSize: 15,
    marginBottom: 4,
  },
  genre: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 2,
  },
});

export default ProfilePreview;
