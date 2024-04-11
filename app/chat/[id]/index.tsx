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
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";
import { Json } from "@/supabase/functions/_shared/types";
import { RoomButtonProps } from "@/components/RoomButton";

interface ChatResponse {
  message: string;

  capacity: string;
  max_capacity: string;
  building: string;
  features: string[];
  categories: string[];
  name: string;
  type: string;

  shouldShowRecord: boolean;
}

export default function ChatPage() {
  const local = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<(MessageProps | RoomButtonProps)[]>(
    [],
  );

  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "chats",
      },
      (payload) => {
        if (payload.new.chat_id == local.id) {
          // update the messages
          const data = payload.new.messages as MessageProps[];
          setMessages(data);
        }
      },
    )
    .subscribe();

  const handleSendMessage = async (message: string) => {
    const newMessage = {
      messageid: messages.length + 1,
      message,
      sender: "You",
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]);

    console.log("Invoking chat function");
    const { data, error } = await supabase.functions.invoke("chat", {
      body: {
        message: JSON.stringify(messages),
      },
    });

    if (error) {
      console.error(error);
      setMessages([
        ...messages,
        newMessage,
        {
          messageid: messages.length + 2,
          message: "An error occurred while sending the message",
          sender: "Venue Bot",
          timestamp: Date.now(),
        },
      ]);
      return;
    }

    console.log("finished invoking chat function");
    let trimmed = JSON.stringify(data);

    trimmed = trimmed.match(/json\\n(.*\w)```/)![1];
    trimmed = trimmed.replace(/\\n/g, "").replace(/\\/g, "");
    const response: ChatResponse = JSON.parse(trimmed);

    const newBotMessage = {
      messageid: messages.length + 7,
      message: response.message,
      sender: "Venue Bot",
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newMessage, newBotMessage];

    console.log(response);
    if (response.shouldShowRecord) {
      const roomButton: RoomButtonProps = {
        roomnumber: response.building,
        capacity: response.capacity,
        max_capacity: response.max_capacity,
        name: response.name,
        type: response.type,
        categories: response.categories,
        features: response.features,
        building: response.building,
      };

      console.log(roomButton);
      updatedMessages.push(roomButton);
    }

    const { error: InsertError2 } = await supabase
      .from("chats")
      .update({
        //@ts-ignore
        messages: updatedMessages,
      })
      .match({ chat_id: local.id });

    if (InsertError2) {
      console.error(InsertError2);
    }
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
