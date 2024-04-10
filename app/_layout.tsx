// Import your global CSS file
import "../global.css";

import { SignIn } from "./signIn";
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

  /*     import { Link } from "expo-router";
    import { View, Text } from "react-native";

    export default function AppStack() {
      return (
        <View className="bg-green-500 w-full min-h-screen flex flex-col items-center justify-center">
          <Text>appstack</Text>
          <Link href="./signIn">Sign In</Link>
        </View>
      );
    } */
}
