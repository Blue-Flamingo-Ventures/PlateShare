// app/auth/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  // Detect system color scheme (light/dark)
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    try {
      console.log("attempting login()");
      await login(email, password);
      console.log("Attempting login...", email);
      // If login succeeds, redirect to tabs
      router.replace("/(tabs)");
    } catch (error) {
      console.error("LOGIN FAILED!!!!!!!", error);
    }
  };

  // Define styles dynamically based on colorScheme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
      backgroundColor: colorScheme === "dark" ? "#000" : "#FFF",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: colorScheme === "dark" ? "#FFF" : "#000",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 12,
      borderRadius: 4,
      // Text color inside input
      color: colorScheme === "dark" ? "#FFF" : "#000",
      // (Optional) background color for the text field
      backgroundColor: colorScheme === "dark" ? "#333" : "#FFF",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! Please Log In</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colorScheme === "dark" ? "#AAA" : "#888"}
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colorScheme === "dark" ? "#AAA" : "#888"}
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
