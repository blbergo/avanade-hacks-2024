import { Link } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex">
      <View className="w-full h-full flex items-center justify-center gap-15">
        <Text>Appstack</Text>
        <Link href="./signin">Sign in</Link>
        <Link href="./signup">Sign up</Link>
        <Link href="./chatpage">Chat Page</Link>
      </View>
    </SafeAreaView>
  );
}
