import { SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import Chatbar from "@/components/Chatbar";
import Messages from "@/components/Messages";
import { MessageProps } from "@/components/Message";
import { View } from "react-native";

export default function Chat() {
  const headerHeight = useHeaderHeight();

  // TODO: Load from API
  const [messsages, setMessages] = useState<MessageProps[]>([
    {
      message: "Hello",
      sender: "John Doe",
      timestamp: 1712737844316,
      profilePic:
        "https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg",
    },
  ]);

  const handleSendMessage = (message: string) => {
    // TODO: update message in API
    setMessages([
      ...messsages,
      {
        message,
        sender: "You",
        timestamp: Date.now(),
        profilePic:
          "https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg",
      },
    ]);
  };

  return (
    <SafeAreaView className="flex flex-col h-full bg-end">
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* TODO: fix scrolling behavior */}
        <View className="flex flex-col flex-grow h-full">
          <Messages messages={messsages} />
          <Chatbar onSendMessage={handleSendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
