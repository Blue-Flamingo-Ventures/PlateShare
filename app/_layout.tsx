import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { Stack } from "expo-router";
import CausalityClient from "../api/causality_client";

export default function RootLayout() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

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
        console.log(response.message);

        setResult(
          `QR Code Link: ${response.qrCodeLink}\nQR Code: ${response.qrcode}\nDeeplink: ${response.deeplink}`
        );
      } else {
        console.log(response.message);
        setError(`Error: ${response.message}`);
      }

      let qrCode = response.qrcode;

      setTimeout(async (qrCode: string) => {
        console.log(qrCode)
        const response = await client.apiStatusCheck({
          code: qrCode
        })

        setStatus(response.message + ' ' + response.status)
      }, 5000, qrCode)

      
    } catch (err: any) {
      console.log(err);

      setError(`Failed to request QR code: ${err.message}`);
    }
  };

  return (
    <>
      <Stack />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Test Causality"
          onPress={handleTestCausalityClient}
        />
        {result && <Text>{result}</Text>}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {status && <Text style={{ color: "red" }}>{status}</Text>}
      </View>
    </>
  );
}