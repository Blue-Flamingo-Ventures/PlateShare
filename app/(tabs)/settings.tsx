import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  SafeAreaView // <-- Add this
} from "react-native";
import CausalityClient from "causality-ts";
import { useAuth } from "@/app/context/AuthContext";

export default function TabTwoScreen() {
  const { logout } = useAuth();
  const [clearResult, setClearResult] = useState<string | null>(null);

  const client = new CausalityClient(
    "$2y$10$wjBFiFlS3medyxMYFw6JK.g2KBrv9oLKZ1aO0RMLoO8cdfrEyO5Ty",
    "dhz7wo8J"
  );

  const handleClearVouchers = async () => {
    console.log("Clearing vouchers...");
    const response = await client.ClearUids();
    console.log(response);
    setClearResult(response.message);
  };

  const handleLogout = () => {
    try {
      logout();
      console.log("User logged out");
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}> {/* <-- Wrap in SafeAreaView */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        {/* Bottom Links / Buttons */}
        <View style={styles.bottomContainer}>
          <Pressable
            style={({ hovered, pressed }) => [
              styles.logoutButton,
              hovered && styles.logoutHovered,
              pressed && styles.logoutPressed,
            ]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

//
// STYLESHEET
//
const styles = StyleSheet.create({
  // The SafeAreaView needs its own style or can reuse container styles
  safeArea: {
    flex: 1,
    backgroundColor: "#FDF7F2",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  logoutButton: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#cc0000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ffcccc",
    alignItems: "center",
  },
  logoutHovered: {
    backgroundColor: "#ff9999",
  },
  logoutPressed: {
    backgroundColor: "#ff7777",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
