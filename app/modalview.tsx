import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Chatbar from "@/components/Chatbar";
import Messages from "@/components/Messages";
import { MessageProps } from "@/components/Message";
import RoomButton, { RoomButtonProps } from "@/components/RoomButton";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import RoomModal from "@/components/RoomModal";

export default function ModalView() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();

  const handlePresentModalPress = () => bottomSheetRef.current?.present();

  return (
    <LinearGradient
      colors={["#2D2FF", "#484848"]}
      start={{ x: 0.3, y: 1.0 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <RoomModal ref={bottomSheetRef} />
      <SafeAreaView className="flex flex-1">
        {/* Start of Modal View */}
        <View className="flex flex-1 flex-col justify-between m-4 border border-red-400">
          <View className="flex flex-col">
            <View className="flex flex-col gap-2">
              <FontAwesome6 name="location-dot" size={30} color="#86C993" />
              <Text className="text-offwhite text-3xl font-medium mt-1">
                CLASS Teaching Computer Lab
              </Text>
              <Text className="text-secondary text-lg font-regular">
                Building 5 Room 122
              </Text>
            </View>

            <View className="flex flex-col gap-2 mt-10">
              <View className="flex flex-row justify-between">
                <Text className="text-secondary text-lg font-regular">
                  Max Capacity
                </Text>
                <Text className="text-offwhite text-lg font-medium">24</Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-secondary text-lg font-regular">
                  Max Capacity
                </Text>
                <Text className="text-offwhite text-lg font-medium">24</Text>
              </View>
            </View>

            <View className="flex flex-col gap-2 mt-10">
              <View className="flex flex-row justify-between">
                <Text className="text-secondary text-lg font-regular">
                  Max Capacity
                </Text>
                <Text className="text-offwhite text-lg font-medium">24</Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-secondary text-lg font-regular">
                  Max Capacity
                </Text>
                <Text className="text-offwhite text-lg font-medium">24</Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={handlePresentModalPress}
            className="bg-accent flex-row items-center justify-center gap-4 p-4 rounded-2xl active:opacity-60"
          >
            <FontAwesome6 name="book" size={24} color="#F2F2F2" />
            <Text className="text-offwhite text-2xl font-extra">
              Reserve Now
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
