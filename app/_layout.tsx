import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import CausalityClient from "../api/causality_client";

export default function RootLayout() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestCausalityClient = async () => {
    const client = new CausalityClient({
      "Content-Type": "application/json",
    });

    try {
      setError(null);
      setResult(null);

      const response = await client.requestQrCode({
        key: "$2y$10$W4dqnW2O.GzgpeVqYf2IieWM5rZSikke7WO9bM9wCV3sylVK9WoJ2",
        token: "KchbMwUT",
      });

      if (response.status === 200) {
        setResult(
          `QR Code Link: ${response.qrCodeLink}\nQR Code: ${response.qrcode}\nDeeplink: ${response.deeplink}`
        );
      } else {
        setError(`Error: ${response.message}`);
      }
    } catch (err: any) {
      setError(`Failed to request QR code: ${err.message}`);
    }
  };

  return (
    <View>
      <Stack />
      <Button
        title="Test CausalityClient"
        onPress={handleTestCausalityClient}
      />
      {result && <Text>{result}</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
}
