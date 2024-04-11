import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Chatbar from "@/components/Chatbar";
import Messages from "@/components/Messages";
import { MessageProps } from "@/components/Message";

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      messageid: 1,
      message: "Hello",
      sender: "John Doe",
      timestamp: 1712737844316,
      profilePic:
        "https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg",
    },
  ]);

  const handleSendMessage = (message: string) => {
    setMessages([
      ...messages,
      {
        messageid: Date.now(),
        message,
        sender: "You",
        timestamp: Date.now(),
        profilePic:
          "https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg",
      },
    ]);
  };

  return (
    <LinearGradient
      colors={["#4D4D4D", "#1C1C1C"]}
      start={{ x: 0.7, y: 0 }}
      end={{ x: 0.3, y: 0.7 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View className="px-5 flex-1">
            {/* Header */}
            <View className="flex-row w-full justify-between items-center py-4">
              <Pressable className="p-3 rounded-3 active:opacity-60">
                <Entypo name="menu" size={24} color="#F2F2F2" />
              </Pressable>

              <Text className="text-offwhite text-xl font-medium">26Live</Text>

              <Pressable className="p-3 rounded-3 active:opacity-60">
                <Entypo name="new-message" size={24} color="#F2F2F2" />
              </Pressable>
            </View>

            {/* Messages View */}
            <View className="flex-1">
              <Messages messages={messages} />
              <Chatbar onSendMessage={handleSendMessage} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
