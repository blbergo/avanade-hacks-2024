// Import your global CSS file
import "../global.css";

import { Slot, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </>
  );
}
