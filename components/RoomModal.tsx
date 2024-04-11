import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { FontAwesome6 } from "@expo/vector-icons";
import { View, Text } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
export type Ref = BottomSheetModal;

interface CustomBottomSheetModalProps {
  categories?: string[];
  features: string[];
  building: string;
  name: string;
}

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

const CustomBottomSheetModal = forwardRef<Ref, CustomBottomSheetModalProps>(
  ({ categories, features, building, name }, ref) => {
    let cats = categories;
    let feats = features;

    if (categories && typeof categories === "string") {
      cats = (categories as string).split(",");
    }

    if (features && typeof features === "string") {
      feats = (features as string).split(",");
    }

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
                {name}
              </Text>
              <Text className="text-secondary text-lg font-regular">
                {building}
              </Text>
            </View>

            <View className="flex flex-col gap-2 mt-10">
              {cats &&
                cats.map((category) => (
                  <View className="flex flex-row justify-between">
                    <Text className="text-secondary text-lg font-regular">
                      {category.split("-")[0]}
                    </Text>
                    <Text className="text-offwhite text-lg font-medium">
                      {category.split("-")[1]}
                    </Text>
                  </View>
                ))}
            </View>

            <View className="flex flex-col gap-2 mt-10">
              {
                // Features
                feats &&
                  feats.map((feature) => (
                    <View className="flex flex-row justify-between">
                      <Text className="text-secondary text-lg font-regular">
                        {feature.split("-")[0]}
                      </Text>
                      <Text className="text-offwhite text-lg font-medium">
                        {feature.split("-")[1]}
                      </Text>
                    </View>
                  ))
              }
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
  },
);

export default CustomBottomSheetModal;
