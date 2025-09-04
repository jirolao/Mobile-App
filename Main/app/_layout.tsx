import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#8d977f" }, // earthy green
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#8d977f",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="explore" options={{ title: "Explore" }} />
      <Drawer.Screen name="spotlogin" options={{ title: "Spotify Log In" }} />
      <Drawer.Screen name="spotsign" options={{ title: "Spotify Sign Up" }} />
      <Drawer.Screen name="spotplaylist" options={{ title: "Spotify Playlists" }} />
      <Drawer.Screen name="componentshowcase" options={{ title: "Components" }} />

      {/* Hide Not Found route from drawer */}
      <Drawer.Screen
        name="+not-found"
        options={{ href: null, drawerItemStyle: { display: "none" } }}
      />
    </Drawer>
  );
}
