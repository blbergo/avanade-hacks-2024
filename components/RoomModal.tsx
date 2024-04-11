import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Chatbar from "@/components/Chatbar";
import Messages from "@/components/Messages";
import { MessageProps } from "@/components/Message";
import RoomButton, { RoomButtonProps } from "@/components/RoomButton";
import RoomModal from "@/components/RoomModal";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
export type Ref = BottomSheetModal;

const CustomBackground = ({
  style,
  animatedIndex,
}: {
  style: any;
  animatedIndex: any;
}) => {
  //#region styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#2C2C2C", "#1E1E1E"],
    ),
    borderRadius: 30,
  }));

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );
  //#endregion
  // render
  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

const CustomBottomSheetModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["60%", "90%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundComponent={CustomBackground}
    >
      {/* Start of Modal View */}
      <View className="flex flex-grow flex-col mx-6 my-6">
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
      </View>
    </BottomSheetModal>
  );
});

export default CustomBottomSheetModal;
