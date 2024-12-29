// import {
//   StyleSheet,
//   View,
//   Pressable,
//   Image,
//   Platform,
//   Text,
// } from "react-native";
// import{ useState } from "react";

// import CausalityClient from "@/api/causality_client";

// export default function TabTwoScreen() {
//   const [clearResult, setClearResult] = useState<string | null>(null);

//   const client = new CausalityClient(
//     {
//       "Content-Type": "application/json",
//     },
//     "$2y$10$wjBFiFlS3medyxMYFw6JK.g2KBrv9oLKZ1aO0RMLoO8cdfrEyO5Ty",
//     "dhz7wo8J"
//   );

//   return (
//     <View style={styles.buttonContainer}>
//       <Pressable
//         style={({ pressed }) => [
//           styles.outlinedButton,
//           pressed && styles.buttonPressed,
//         ]}
//         onPress={async () => {
//           console.log('hello from func')

//           let response = await client.clearUids();
//           console.log(response)
//           setClearResult(response.message)
//         }}
//       >
//         <Text style={styles.buttonText}>Clear All Vouchers</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FDF7F2", // Changed to white
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerContainer: {
//     flex: 2,
//     justifyContent: "center",
//     width: "100%",
//   },
//   headerText: {
//     fontSize: 36,
//     fontWeight: "700",
//     textAlign: "center",
//     color: "#333",
//     marginHorizontal: 20,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: "center",
//     width: "100%",
//     alignItems: "center",
//   },
//   outlinedButton: {
//     borderWidth: 2,
//     borderColor: "#6D9FB1",
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     backgroundColor: "transparent",
//   },
//   buttonPressed: {
//     backgroundColor: "#E4EFF2",
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#6D9FB1",
//     fontWeight: "600",
//   },
// });

import { StyleSheet, View, Pressable, Text } from "react-native";
import { useState } from "react";

import CausalityClient from "causality-ts";

export default function TabTwoScreen() {
  const [clearResult, setClearResult] = useState<string | null>(null);

  const client = new CausalityClient(
    "$2y$10$wjBFiFlS3medyxMYFw6JK.g2KBrv9oLKZ1aO0RMLoO8cdfrEyO5Ty",
    "dhz7wo8J"
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Functional Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.outlinedButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={async () => {
            console.log("hello from func");
            let response = await client.ClearUids();
            console.log(response);
            setClearResult(response.message);
          }}
        >
          <Text style={styles.buttonText}>Clear All Vouchers</Text>
        </Pressable>
      </View>

      {/* Non-Functional Buttons */}
      <View style={styles.nonFunctionalContainer}>
        <Pressable style={styles.nonFunctionalButton}>
          <Text style={styles.nonFunctionalButtonText}>Update Profile</Text>
        </Pressable>
        <Pressable style={styles.nonFunctionalButton}>
          <Text style={styles.nonFunctionalButtonText}>Change Password</Text>
        </Pressable>
        <Pressable style={styles.nonFunctionalButton}>
          <Text style={styles.nonFunctionalButtonText}>
            Notification Settings
          </Text>
        </Pressable>
        <Pressable style={styles.nonFunctionalButton}>
          <Text style={styles.nonFunctionalButtonText}>Privacy Policy</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF7F2",
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
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
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
  nonFunctionalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  nonFunctionalButton: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  nonFunctionalButtonText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
});
