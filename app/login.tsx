import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const ADMIN_EMAIL = "admin@zntax.com";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);

      if (email === ADMIN_EMAIL) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <LinearGradient colors={["#0ea5e9", "#0284c7"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {/* Brand */}
        <Animated.View entering={FadeInDown.duration(900)} style={{ marginBottom: 40 }}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: "900",
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            ZN Tax Consultant
          </Text>
          <Text
            style={{
              marginTop: 6,
              color: "#e0f2fe",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Secure Login to Your Account
          </Text>
        </Animated.View>

        {/* Login Card */}
        <Animated.View
          entering={FadeInUp.delay(300)}
          style={{
            width: width * 0.88,
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 22,
            padding: 26,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 8 },
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          {/* Email */}
          <Text style={{ fontWeight: "600", color: "#475569", marginBottom: 6 }}>
            Email Address
          </Text>
          <TextInput
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#94a3b8"
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 16,
              marginBottom: 18,
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          />

          {/* Password */}
          <Text style={{ fontWeight: "600", color: "#475569", marginBottom: 6 }}>
            Password
          </Text>
          <TextInput
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#94a3b8"
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          />

          {/* Forgot */}
          <TouchableOpacity
            onPress={() => alert("Please contact ZN Tax Support")}
            style={{ alignSelf: "flex-end", marginBottom: 24 }}
          >
            <Text style={{ color: "#0284c7", fontWeight: "600" }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.85}
            style={{
              backgroundColor: "#0284c7",
              paddingVertical: 16,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "800",
                fontSize: 17,
              }}
            >
              Login Securely
            </Text>
          </TouchableOpacity>

          {/* Trust Text */}
          <Text
            style={{
              marginTop: 18,
              textAlign: "center",
              color: "#64748b",
              fontSize: 13,
            }}
          >
            🔒 Your data is encrypted & protected
          </Text>
        </Animated.View>

        {/* Footer */}
        <Animated.Text
          entering={FadeInUp.delay(700)}
          style={{
            marginTop: 30,
            color: "#e0f2fe",
            fontSize: 13,
          }}
        >
          Trusted Tax Experts • Asansol
        </Animated.Text>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
