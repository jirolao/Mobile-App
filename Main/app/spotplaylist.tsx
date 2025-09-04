import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Mock playlists
const playlists = [
  {
    id: "1",
    title: "Rap",
    image: "Main/assets/images/coleworld.jpeg",
  },
  {
    id: "2",
    title: "Chill Vibes",
    image: "Main/assets/images/chill.jpg",
  },
  {
    id: "3",
    title: "Workout",
    image: "Main/assets/images/workout.jpg",
  },
  {
    id: "4",
    title: "Pop",
    image: "Main/assets/images/starboy.jpeg",
  },
];

export default function SpotifyPlaylists() {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Playlists</Text>
      <FlatList
        data={playlists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#181818",
    borderRadius: 10,
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
