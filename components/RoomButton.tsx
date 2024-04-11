import { Image, View, Text, SafeAreaView, Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRef } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import RoomModal from "./RoomModal";

export interface RoomButtonProps {
  roomnumber: string;
  name?: string;
  capacity: string;
  max_capacity?: string;
  type?: string;
}

export default function RoomButton({
  roomnumber,
  name,
  type,
  capacity,
  max_capacity,
}: RoomButtonProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();

  const handlePresentModalPress = () => bottomSheetRef.current?.present();

  return (
    <>
      <RoomModal ref={bottomSheetRef} />
      <Pressable
        onPress={handlePresentModalPress}
        className="flex flex-row w-full px-5 py-4 gap-5 border border-accent rounded-2xl items-center justify-start mt-5 active:opacity-60"
      >
        <FontAwesome6 name="location-dot" size={30} color="#86C993" />
        <View className="flex flex-1 flex-col gap-1">
          <Text className="text-offwhite text-lg font-medium text-balance">
            {name ? name : roomnumber}
          </Text>
          <Text className="text-secondary text-base font-regular">
            {name ? `${roomnumber} • ` : ""}
            {type ? `${type} • ` : ""}
            {capacity} Max
          </Text>
        </View>
      </Pressable>
    </>
  );
}
