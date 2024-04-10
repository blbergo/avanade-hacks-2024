import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUserToUsers = (user: any) => {
    supabase
      .from("users")
      .insert([{ created_at: user.created_at, uuid: user.id }])
      .then((res: any) => {
        const { error } = res;
        if (error) {
          console.log(error);
        } else {
          console.log("user added");
        }
      });
  };

  const signUpUser = () => {
    supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then((res: any) => {
        const {
          data: { user },
          error,
        } = res;
        if (error) {
          console.log(error);
        } else {
          addUserToUsers(user);
          router.push("../chat");
        }
      });
  };

  return (
    <View className="bg-green-500 w-full min-h-screen flex flex-col items-center justify-center">
      <View>
        <TextInput
          className="border"
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          className="border"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
        />
        <Pressable onPress={signUpUser}>
          <Text>Sign Up</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Text>Sign In Page</Text>
        </Pressable>
      </View>
    </View>
  );
}
