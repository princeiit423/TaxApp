import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ===== HERO ===== */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Get In Touch With <Text style={styles.brand}>ZN Tax</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Have questions about tax, GST or compliance?
          We are always here to guide you with clarity & confidence.
        </Text>
      </View>

      {/* ===== CONTACT CARDS ===== */}
      <View style={styles.cardGrid}>

        {/* Phone */}
        <View style={styles.card}>
          <Ionicons name="call" size={32} color="#0284c7" />
          <Text style={styles.cardTitle}>Call Us</Text>
          <Text style={styles.cardText}>+91 7482049372</Text>
          <Text style={styles.cardSubText}>Mon – Sat | 10 AM – 7 PM</Text>
        </View>

        {/* Email */}
        <View style={styles.card}>
          <Ionicons name="mail" size={32} color="#0284c7" />
          <Text style={styles.cardTitle}>Email Us</Text>
          <Text style={styles.cardText}>zntaxation2023@gmail.com</Text>
          <Text style={styles.cardSubText}>Reply within 24 hours</Text>
        </View>

        {/* WhatsApp */}
        <View style={[styles.card, { borderColor: "#22c55e" }]}>
          <FontAwesome name="whatsapp" size={34} color="#22c55e" />
          <Text style={styles.cardTitle}>WhatsApp</Text>
          <Text style={styles.cardText}>+91 7482049372</Text>

          <TouchableOpacity
            style={styles.whatsappBtn}
            onPress={() =>
              Linking.openURL("https://wa.me/917482049372")
            }
          >
            <Text style={styles.whatsappText}>Chat Now</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* ===== OWNER SECTION ===== */}
      <View style={styles.ownerSection}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
          }}
          style={styles.ownerImage}
        />

        <Text style={styles.ownerTitle}>
          We Are Always Ready To Help You
        </Text>

        <Text style={styles.ownerText}>
          ZN Tax Consultant is personally managed by a dedicated professional
          who believes in clear communication, honest guidance, and long-term
          client relationships.
          {"\n\n"}
          Whether you are an individual, startup, or business owner, you will
          always speak directly with an expert — not a call center.
        </Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => Linking.openURL("tel:+917482049372")}
          >
            <Text style={styles.callBtnText}>Call Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() =>
              Linking.openURL("https://wa.me/917482049372")
            }
          >
            <Text style={styles.outlineBtnText}>WhatsApp Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== TRUST STRIP ===== */}
      <View style={styles.trustStrip}>
        <Text style={styles.trustTitle}>
          Trusted • Secure • Confidential
        </Text>
        <Text style={styles.trustText}>
          Your financial data is handled with complete privacy and care.
        </Text>
      </View>

      {/* ===== FOOTER ===== */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} ZN Tax Consultant. All rights reserved.
      </Text>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
  },

  hero: {
    padding: 24,
    paddingTop: 50,
    alignItems: "center",
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },

  brand: {
    color: "#0284c7",
  },

  heroSubtitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
  },

  cardGrid: {
    padding: 16,
    gap: 16,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  cardText: {
    marginTop: 6,
    fontSize: 14,
    color: "#475569",
  },

  cardSubText: {
    marginTop: 4,
    fontSize: 12,
    color: "#94a3b8",
  },

  whatsappBtn: {
    marginTop: 14,
    backgroundColor: "#22c55e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  whatsappText: {
    color: "#fff",
    fontWeight: "600",
  },

  ownerSection: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  ownerImage: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },

  ownerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10,
  },

  ownerText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  callBtn: {
    flex: 1,
    backgroundColor: "#0284c7",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  callBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0284c7",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  outlineBtnText: {
    color: "#0284c7",
    fontWeight: "600",
  },

  trustStrip: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#e0f2fe",
  },

  trustTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  trustText: {
    marginTop: 6,
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    padding: 16,
    fontSize: 12,
    color: "#94a3b8",
  },
});

