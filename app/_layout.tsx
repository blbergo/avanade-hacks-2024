// Import your global CSS file
import "../global.css";

import { Stack } from "expo-router";

//const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      {/* <Stack.Screen name="chat" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
