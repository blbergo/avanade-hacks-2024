import { Pressable, View, Text, TextInput } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { createRef, useState } from "react";

interface ChatbarProps {
  onSendMessage: (message: string) => void;
}

export default function Chatbar({ onSendMessage }: ChatbarProps) {
  const [message, setMessage] = useState<string>("");
  const inputRef = createRef<TextInput>();

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage !== "") {
      onSendMessage(trimmedMessage);
      setMessage("");
      inputRef.current?.clear();
    }
  };

  return (
    <View className="flex flex-row pb-3 pt-6 gap-x-3 items-center">
      <Pressable className="bg-primary rounded-full p-2 drop-shadow-md active:opacity-60">
        <Feather name="plus" size={20} color={"#A6A6A6"} />
      </Pressable>
      <TextInput
        onChangeText={setMessage}
        ref={inputRef}
        className="border-[1px] border-primary w-[70%] rounded-full drop-shadow-md py-[10px] px-[12px] flex-grow text-white"
      />
      <Pressable
        className="bg-accent rounded-full p-2 drop-shadow-md active:opacity-60"
        onPress={handleSendMessage}
      >
        <Ionicons name="arrow-up-outline" color={"#F2F2F2"} size={20} />
      </Pressable>
    </View>
  );
}
