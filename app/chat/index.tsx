import { SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import Chatbar from "@/components/Chatbar";

export default function Chat() {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView className="flex flex-col h-full justify-end bg-end">
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Chatbar />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
