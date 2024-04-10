import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import { Link } from "expo-router";
import { router } from "expo-router";

export default function SignIn() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then((res: any) => {
        const {
          data: { session },
          error,
        } = res;
        setSession(session);
        if (error) {
          console.log(error);
        }
      });

    if (session) {
      router.push("../chat");
    }
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
        <Pressable onPress={loginUser}>
          <Text>Login</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            router.push("../signUp");
          }}
        >
          <Text>Sign Up Page</Text>
        </Pressable>
      </View>
    </View>
  );
}
