import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import CausalityClient from "@/api/causality_client";
import * as Linking from "expo-linking";

export default function App() {
  const [redeemedProduct, setRedeemedProduct] = useState<string | null>(null);
  const [deepLink, setDeepLink] = useState<string | null>(null);

  const client = new CausalityClient(
    {
      "Content-Type": "application/json",
    },
    "$2y$10$wjBFiFlS3medyxMYFw6JK.g2KBrv9oLKZ1aO0RMLoO8cdfrEyO5Ty",
    "dhz7wo8J"
  );

  const startRedeem = async () => {
    console.log("starting func");
    try {
      setRedeemedProduct(null);
      const response = await client.requestQrCode();

      console.log("first resp = ", response);
      if (response.status === 200) {
        setDeepLink(response.deeplink as string);
        try {
          const supported = await Linking.canOpenURL(
            response.deeplink as string
          );
          if (supported) {
            console.log("trying open url ", response.deeplink);
            await Linking.openURL(response.deeplink as string);
          } else {
            console.error(
              "Error",
              "App is not installed or deeplink is invalid."
            );
          }
        } catch (error) {
          console.error("Error", ("Failed to open app: " + error) as string);
        }
      } else {
        console.log(response.message);
        setRedeemedProduct(null);
        return;
      }

      let qrCode = response.qrcode;
      for (let i = 5000; i < 30000; i += 5000) {
        setTimeout(
          async (qrCode: string) => {
            const response = await client.apiStatusCheck({
              code: qrCode,
            });
            if (response.status == 200) {
              setRedeemedProduct(response.product_name);
            }
          },
          i,
          qrCode
        );
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top section with large centered text */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>PlateShare</Text>
      </View>

      {/* Middle section with an outlined button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.outlinedButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => {
            startRedeem();
          }}
        >
          <Text style={styles.buttonText}>Redeem</Text>
        </Pressable>
        {redeemedProduct && <Text>{redeemedProduct}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Changed to white
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 2,
    justifyContent: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    marginHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  outlinedButton: {
    borderWidth: 2,
    borderColor: "#6D9FB1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: "transparent",
  },
  buttonPressed: {
    backgroundColor: "#E4EFF2",
  },
  buttonText: {
    fontSize: 18,
    color: "#6D9FB1",
    fontWeight: "600",
  },
});
