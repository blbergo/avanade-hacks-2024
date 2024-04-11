import {
  View,
  Text,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
//import GoogleAuth from "@/components/GoogleAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogleAuth = /* async */ () => {
    /* const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })

    if (error) {
      console.log(error);
    } else {
      router.push("../chat");
    } */
  };

  const loginUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
    } else if (session) {
      router.push(`/chat/${session?.user.id}/`);
    }
  };

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
                Welcome back
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
                onChangeText={(email) => setEmail(email)}
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
                  onChangeText={(password) => setPassword(password)}
                />
              </View>

              {/* Sign In Button */}
              <Pressable
                className="bg-accent flex items-center py-[10px] rounded-xl active:opacity-60"
                onPress={loginUser}
              >
                <Text className="text-offwhite text-lg font-bold">Sign in</Text>
              </Pressable>

              <View className="w-full h-[.5px] bg-secondary my-[32px]" />

              {/* Google Sign In Button */}
              {/* <Pressable className="bg-offwhite flex flex-row items-center justify-center gap-[8px] py-[10px] rounded-xl active:opacity-60"
                onPress={() => {router.push("https://neczivukhbelfcbjggip.supabase.co/auth/v1/authorize?provider=google&redirect_to=http://localhost:3000/welcome")}}>
                <AntDesign name="google" size={20} color="text" />
                <Text className="text-primary text-lg font-medium">
                  Sign In With Google
                </Text>
              </Pressable>  */}

              {/* Footer Link */}
              <Pressable
                className="flex flex-row justify-center gap-[8px] text-sm mt-[32px] active:opacity-60"
                onPress={() => {
                  router.push("../signUp");
                }}
              >
                <Text className="text-secondary">Don’t have an account?</Text>
                <Text className="text-blue-500">Sign up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
