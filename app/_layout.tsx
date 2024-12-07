import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { Stack } from "expo-router";
import CausalityClient from "../api/causality_client";
import * as Linking from "expo-linking";

export default function RootLayout() {
  const [result, setResult] = useState<string | null>(null);
  const [deepLink, setDeepLink] = useState<string | null>(null);

  const client = new CausalityClient({
    "Content-Type": "application/json",
  });

  const startRedeem = async () => {
    try {
      setResult(null);
      const response = await client.requestQrCode({
        key: "$2y$10$wjBFiFlS3medyxMYFw6JK.g2KBrv9oLKZ1aO0RMLoO8cdfrEyO5Ty",
        token: "dhz7wo8J",
      });

      if (response.status === 200) {
        console.log(response.message);

        setResult(
          `QR Code Link: ${response.qrCodeLink}\nQR Code: ${response.qrcode}\nDeeplink: ${response.deeplink}`
        );
        setDeepLink(response.deeplink as string);
        try {
          const supported = await Linking.canOpenURL(deepLink as string);
          if (supported) {
            await Linking.openURL(deepLink as string);
          } else {
            console.error("Error", "App is not installed or deeplink is invalid.");
          }
        } catch (error) {
          console.error("Error", ("Failed to open app: " + error) as string);
        }
      } else {
        console.log(response.message);
        setResult(null);
        return;
      }

      const qrCode = response.qrcode;
      for (let i = 5000; i < 30000; i + 5000) {
        setTimeout(
          async (qrCode: string, setter: any) => {
            console.log(qrCode);
            const response = await client.apiStatusCheck({
              code: qrCode,
            });
            if (response.status == 200) {
              console.log('response! + ', response.message as string)
              setResult(response.product_name);
            }
          },
          i,
          qrCode,
        );
      }
    } catch (err: any) {
      console.log(err);
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
        <Button title="Test Causality" onPress={startRedeem} />
        {result && <Text>{result}</Text>}
      </View>
    </>
  );
}
