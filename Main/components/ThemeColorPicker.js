import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAccent } from "../store/themeSlice";

const presetColors = [
  "#E91E63", "#1DB954", "#1976D2", "#FBC02D", "#FF5722", "#673AB7",
];

export default function ThemeColorPicker({ visible, onClose }) {
  const accent = useSelector(state => state.theme.accent);
  const dispatch = useDispatch();

  function handlePick(color) {
    dispatch(setAccent(color)); // This sets accent and sets theme to "custom"
    onClose();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Pick an Accent Color</Text>
          <View style={styles.row}>
            {presetColors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => handlePick(color)}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color, borderWidth: accent === color ? 3 : 1 },
                ]}
              />
            ))}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center" },
  box: { backgroundColor: "#222", borderRadius: 16, padding: 22, alignItems: "center" },
  title: { color: "#fff", fontWeight: "bold", fontSize: 18, marginBottom: 16 },
  row: { flexDirection: "row", marginBottom: 24 },
  colorCircle: {
    width: 40, height: 40, borderRadius: 20, marginHorizontal: 8,
    borderColor: "#fff", justifyContent: "center", alignItems: "center"
  },
  btn: { backgroundColor: "#333", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});
