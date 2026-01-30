import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type UserType = { email: string };
type AuthContextType = {
  user: UserType | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token & user from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedToken && storedEmail) {
        setToken(storedToken);
        setUser({ email: storedEmail });
      }
    };
    loadUser();
  }, []);

  // Login: call backend, store JWT & email
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(
        "https://zback-csw5.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("email", email);

      setToken(data.token);
      setUser({ email });
    } catch (err: any) {
      Alert.alert("Login Failed", err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("email");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
