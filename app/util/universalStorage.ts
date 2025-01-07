// universalStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const universalSecureStore = {
  getItemAsync: async (key: string) => {
    return (await AsyncStorage.getItem(key)) ?? null;
  },
  setItemAsync: async (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
  },
  deleteItemAsync: async (key: string) => {
    return AsyncStorage.removeItem(key);
  },
};
