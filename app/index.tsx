import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';

const App = () => {
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
            pressed && styles.buttonPressed
          ]}
          onPress={() => { /* your action here */ }}
        >
          <Text style={styles.buttonText}>Redeem</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Changed to white
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  outlinedButton: {
    borderWidth: 2,
    borderColor: '#6D9FB1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    backgroundColor: '#E4EFF2',
  },
  buttonText: {
    fontSize: 18,
    color: '#6D9FB1',
    fontWeight: '600',
  },
});

export default App;
