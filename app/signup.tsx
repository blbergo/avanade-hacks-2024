import {
  View,
  Text,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Signup() {
  return (
    <LinearGradient
      colors={["#4D4D4D", "#1C1C1C"]}
      start={{ x: 0.7, y: 0 }}
      end={{ x: 0.3, y: 0.7 }}
    >
      <SafeAreaView className="flex">
        <ScrollView
          className="h-full w-full align-center py-[85px]"
          decelerationRate={"normal"}
        >
          <View className="w-full h-full px-[30px] flex flex-col items-start justify-center">
            {/* Header */}
            <Text className="text-accent text-6xl font-extrabold mb-[45px]">
              26Live
            </Text>

            {/* Sign In Container */}
            <View className="w-full flex flex-col">
              <Text className="text-offwhite text-2xl font-semibold mb-[24px]">
                Glad to have you with us
              </Text>
              {/* Email Input */}
              <Text className="text-offwhite text-sm font-medium ml-[16px] mb-[8px]">
                Email
              </Text>
              <TextInput
                className="h-[48px] border border-secondary rounded-xl px-[16px] py-[8px] text-offwhite text-lg leading-[20px] focus:border-offwhite mb-[16px]"
                placeholder="Enter email"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="done"
              />
              {/* Password Input */}
              <Text className="text-offwhite text-sm font-medium ml-[16px] mb-[8px]">
                Password
              </Text>
              <View className="mb-[32px] flex">
                <TextInput
                  className="h-[48px] border border-secondary rounded-xl px-[16px] py-[8px] text-offwhite text-lg leading-[20px] focus:border-offwhite"
                  secureTextEntry={true}
                  placeholder="Enter password"
                  textContentType="password"
                  returnKeyType="done"
                />
              </View>

              {/* Sign In Button */}
              <Pressable className="bg-accent flex items-center py-[10px] rounded-xl active:opacity-60">
                <Text className="text-offwhite text-lg font-bold">Sign up</Text>
              </Pressable>

              <View className="w-full h-[.5px] bg-secondary my-[32px]" />

              {/* Google Sign In Button */}
              <Pressable className="bg-offwhite flex flex-row items-center justify-center gap-[8px] py-[10px] rounded-xl active:opacity-60">
                <AntDesign name="google" size={20} color="text" />
                <Text className="text-primary text-lg font-medium">
                  Sign Up With Google
                </Text>
              </Pressable>

              {/* Footer Link */}
              <Pressable className="flex flex-row justify-center gap-[8px] text-sm mt-[32px] active:opacity-60">
                <Text className="text-secondary">Already have an account?</Text>
                <Text className="text-blue-500">Sign in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
