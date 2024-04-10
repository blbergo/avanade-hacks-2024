import { Pressable, View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Chatbar() {
  return (
    <View className="flex flex-row p-[7px] gap-x-3 items-center">
      <Pressable className="bg-primary w-[34px] h-[34px] flex items-center justify-center rounded-full drop-shadow-md">
        <Text className="text-secondary">+</Text>
      </Pressable>
      <TextInput className="border-[1px] border-primary w-[70%] rounded-full drop-shadow-md py-[10px] px-[12px] flex-grow text-white"></TextInput>
      <Pressable className="bg-accent rounded-full p-2 drop-shadow-md">
        <Ionicons name="arrow-up-outline" color={"white"} size={27} />
      </Pressable>
    </View>
  );
}
