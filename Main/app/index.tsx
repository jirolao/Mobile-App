import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#ede9e0", dark: "#1D3D47" }} // softer beige for light mode
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* Hero Section */}
      <ThemedView style={styles.heroContainer}>
        <ThemedText type="title" style={styles.heroTitle}>
          Welcome Back
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Choose a section from the Stack Menu or open the Drawer Menu at the top right corner.
        </ThemedText>
      </ThemedView>

      {/* Quick Navigation */}
      <View style={styles.navSection}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "#a38f85" }]} // warm taupe
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.navButtonText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "#8d977f" }]} // sage green
          onPress={() => router.push("/spotlogin")}
        >
          <Text style={styles.navButtonText}>Spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "#b9a066" }]} // muted golden brown
          onPress={() => router.push("/componentshowcase")}
        >
          <Text style={styles.navButtonText}>Random Buttons</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Note */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Lao, Rei Jiro B. • Demo Android Application
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#3b3a36", // earthy dark brown
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#5a5956",
    textAlign: "center",
  },
  navSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 18,
  },
  navButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  footer: {
    padding: 24,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: "#6b6a67",
  },
  reactLogo: {
    height: 160,
    width: 260,
    bottom: 0,
    left: 0,
    position: "absolute",
    opacity: 0.1, // subtle watermark
  },
});
