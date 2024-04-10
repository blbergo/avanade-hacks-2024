import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function AppStack() {
  return (
    <View className="bg-green-500 w-full min-h-screen flex flex-col items-center justify-center">
      <Text>appstack</Text>
      <Link href="./signIn">Sign In</Link>
    </View>
  );
}
