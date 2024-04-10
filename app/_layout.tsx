import { Slot } from "expo-router";

// Import your global CSS file
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

export default function Layout() {
  return (
    <>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </>
  );
}
