// app/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store'; // or AsyncStorage
import { universalSecureStore } from '../util/universalStorage';

// Adjust this to match your real user shape or keep it simple
type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app load, check for an existing token
  useEffect(() => {
    const initAuth = async () => {
      try {
        // const storedToken = await SecureStore.getItemAsync('userToken');
        const storedToken = await universalSecureStore.getItemAsync("userToken");
        if (storedToken) {
          // For demo, assume token means user is logged in
          setUser({ email: 'demo@example.com' });
        }
      } catch (error) {
        console.error('Error fetching token', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  // Simulate login by storing token
  const login = async (email: string, _password: string) => {
    // Typically you'd verify with a backend here
    const dummyToken = 'abc12345';
    // await SecureStore.setItemAsync('userToken', dummyToken);
    await universalSecureStore.setItemAsync('userToken', dummyToken)
    setUser({ email });
  };

  // Clear the token to log out
  const logout = async () => {
    // await SecureStore.deleteItemAsync('userToken');
    await universalSecureStore.deleteItemAsync("userToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
