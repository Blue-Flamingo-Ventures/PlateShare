import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Button,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import * as Linking from "expo-linking";
import CausalityClient from "causality-ts";

export default function App() {
  // const [redeemedProduct, setRedeemedProduct] = useState<string | null>(null);
  // should be default! revert to this!

  const [redeemedProduct, setRedeemedProduct] = useState<string | null>(
    "1 Large Pizza Pie and 2 Fountain Sodas"
  );

  const client = new CausalityClient(
    "$2y$10$W4dqnW2O.GzgpeVqYf2IieWM5rZSikke7WO9bM9wCV3sylVK9WoJ2",
    "KchbMwUT"
  );

  const startRedeem = async () => {
    try {
      setRedeemedProduct(null);
      const response = await client.RequestQrCode();

      if (response.status === 200) {
        try {
          const supported = await Linking.canOpenURL(
            response.deeplink as string
          );
          if (supported) {
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
        setRedeemedProduct(null);
        return;
      }

      let qrCode = response.qrcode;
      for (let i = 5000; i < 30000; i += 5000) {
        setTimeout(
          async (qrCode: string) => {
            const response = await client.ApiStatusCheck({
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
      console.error(err);
    }
  };

  return (
    <LinearGradient
      // colors={["#F5E9DA", "#FFFFFF"]} // Gradient colors
      // colors={["#FDF7F2", "#E8F4F2"]}
      // colors={["#F5E9DA", "#FDEFEA"]}
      colors={["#FDF7F2", "#FAE7C5"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* LOGO */}
        <View style={styles.headerContainer}>
          <Image source={require("../assets/logo2.png")} style={styles.logo} />
          <Text style={styles.headerText}>PlateShare</Text>
        </View>
        {/* ORDER DETAILS CARD */}
        {redeemedProduct && (
          <>
            <View style={styles.card}>
              <Text style={styles.redeemedProductTextBlack}>
                Order: {redeemedProduct}
              </Text>
              <Text style={styles.redeemedProductTextGreen}>Verified</Text>
              {redeemedProduct && (
                <Pressable
                  style={({ pressed }) => [
                    styles.smallResetButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => {
                    setRedeemedProduct(null);
                  }}
                >
                  <Text style={styles.smallResetButtonText}>Confirm</Text>
                </Pressable>
              )}
            </View>
          </>
        )}

        {!redeemedProduct && (
          <View>
            <Text style={styles.instructionText}>
              Press Redeem and tap your NFC tag
            </Text>
          </View>
        )}

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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: "#E8F4F2", // Matches the cream tone of the logo
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 18,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 48,
    fontWeight: "800",
    textAlign: "center",
    color: "#2C3E50", // Navy blue for contrast
    marginHorizontal: 20,
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: "#FFFFFF", // Subtle contrast against cream
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 40,
  },
  redeemedProductTextBlack: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50", // Navy blue for uniformity
    textAlign: "center",
    marginBottom: 10,
  },
  redeemedProductTextGreen: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007F5F", // Teal for "Verified"
    textAlign: "center",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: "#6B7C93", // Muted blue-gray for instructions
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  outlinedButton: {
    borderWidth: 2,
    borderColor: "#007F5F", // Teal to match the logo
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    backgroundColor: "transparent",
    marginBottom: 20,
  },
  smallResetButton: {
    borderWidth: 1,
    borderColor: "#007F5F",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    marginTop: 10,
  },
  buttonPressed: {
    backgroundColor: "#EAF6F2", // Softened teal for pressed buttons
  },
  buttonText: {
    fontSize: 18,
    color: "#007F5F", // Teal
    fontWeight: "600",
  },
  smallResetButtonText: {
    fontSize: 14,
    color: "#007F5F",
    fontWeight: "600",
  },
});
