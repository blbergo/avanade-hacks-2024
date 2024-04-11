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

import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } else {
      router.push(`/chat/${session?.user.id}/`);
    }
  };

  const addUserToUsers = async (user: any) => {
    const response = await supabase
      .from("users")
      .insert([{ created_at: user.created_at, uuid: user.id }]);

    const response2 = await supabase.from("chats").insert({
      messages: [],
      chat_id: user.id,
    });

    if (response.error || response2.error) {
      console.log(response.error || response2.error);
    } else {
      console.log("user added");
    }
  };

  const signUpUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({ email: email, password: password });
    if (error) {
      console.log(error);
    } else {
      addUserToUsers(user);
      loginUser();
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
                onPress={signUpUser}
              >
                <Text className="text-offwhite text-lg font-bold">Sign up</Text>
              </Pressable>

              <View className="w-full h-[.5px] bg-secondary my-[32px]" />

              {/* Google Sign In Button */}
              {/* <Pressable className="bg-offwhite flex flex-row items-center justify-center gap-[8px] py-[10px] rounded-xl active:opacity-60">
                <AntDesign name="google" size={20} color="text" />
                <Text className="text-primary text-lg font-medium">
                  Sign Up With Google
                </Text>
              </Pressable> */}

              {/* Footer Link */}
              <Pressable
                className="flex flex-row justify-center gap-[8px] text-sm mt-[32px] active:opacity-60"
                onPress={() => {
                  router.back();
                }}
              >
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
