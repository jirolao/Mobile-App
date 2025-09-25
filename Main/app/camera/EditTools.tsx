import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditTools() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uri: string }>();
  const [editedUri, setEditedUri] = useState(params.uri);

  async function crop() {
    const result = await ImageManipulator.manipulateAsync(
      editedUri,
      [{ crop: { originX: 40, originY: 40, width: 240, height: 100 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setEditedUri(result.uri);
  }

  async function rotate() {
    const result = await ImageManipulator.manipulateAsync(
      editedUri,
      [{ rotate: 90 }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setEditedUri(result.uri);
  }

  async function save() {
    const filename = FileSystem.documentDirectory + "Edited_" + Date.now() + ".png";
    await FileSystem.copyAsync({ from: editedUri, to: filename });
    Alert.alert("Saved!", "Photo saved locally:\n" + filename);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
      <Image source={{ uri: editedUri }} style={styles.img} />
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity style={styles.toolBtn} onPress={crop}>
          <Text style={{ color: "#fff" }}>Crop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={rotate}>
          <Text style={{ color: "#fff" }}>Rotate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={save}>
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ marginTop: 28 }}
        onPress={() => router.back()}
      >
        <Text style={{ color: "#1DB954" }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 320,
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#222",
  },
  toolBtn: {
    backgroundColor: "#232323",
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 7,
  },
});
