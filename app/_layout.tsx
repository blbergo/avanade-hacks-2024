// Import your global CSS file
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./chat";
import SignIn from "./signIn";
import SignUp from "./signUp";

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </>
  );

  {
    /* <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer> */
  }
}
