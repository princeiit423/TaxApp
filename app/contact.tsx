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

      {/* ================= HERO ================= */}
      <View style={styles.hero}>
        <Text style={styles.heroBadge}>CONTACT US</Text>

        <Text style={styles.heroTitle}>
          Talk To <Text style={styles.brand}>ZN Tax Consultant</Text>
        </Text>

        <Text style={styles.heroSubtitle}>
          Clear answers. Honest advice. Trusted taxation support for
          individuals, startups & businesses.
        </Text>
      </View>

      {/* ================= QUICK HELP ================= */}
      <View style={styles.quickHelp}>
        <Text style={styles.sectionTitle}>How Can We Help You?</Text>

        <View style={styles.helpRow}>
          <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
          <Text style={styles.helpText}>Income Tax & ITR Filing</Text>
        </View>

        <View style={styles.helpRow}>
          <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
          <Text style={styles.helpText}>GST Registration & Returns</Text>
        </View>

        <View style={styles.helpRow}>
          <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
          <Text style={styles.helpText}>Business Compliance & Audit</Text>
        </View>

        <View style={styles.helpRow}>
          <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
          <Text style={styles.helpText}>Financial Statements & Reports</Text>
        </View>
      </View>

      {/* ================= CONTACT OPTIONS ================= */}
      <View style={styles.cardGrid}>

        {/* Call */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL("tel:+917482049372")}
        >
          <Ionicons name="call" size={30} color="#0284c7" />
          <Text style={styles.cardTitle}>Call Us</Text>
          <Text style={styles.cardText}>+91 74820 49372</Text>
          <Text style={styles.cardSubText}>Mon – Sat | 10 AM – 7 PM</Text>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL("mailto:zntaxation2023@gmail.com")
          }
        >
          <Ionicons name="mail" size={30} color="#0284c7" />
          <Text style={styles.cardTitle}>Email Support</Text>
          <Text style={styles.cardText}>zntaxation2023@gmail.com</Text>
          <Text style={styles.cardSubText}>Response within 24 hours</Text>
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity
          style={[styles.card, styles.whatsappCard]}
          onPress={() =>
            Linking.openURL("https://wa.me/917482049372")
          }
        >
          <FontAwesome name="whatsapp" size={34} color="#22c55e" />
          <Text style={styles.cardTitle}>WhatsApp Chat</Text>
          <Text style={styles.cardText}>Instant & Easy Support</Text>

          <View style={styles.whatsappBtn}>
            <Text style={styles.whatsappText}>Chat Now</Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* ================= OWNER / TRUST ================= */}
      <View style={styles.ownerSection}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
          }}
          style={styles.ownerImage}
        />

        <Text style={styles.ownerTitle}>
          Personal Attention. Professional Guidance.
        </Text>

        <Text style={styles.ownerText}>
          ZN Tax Consultant is led by a dedicated professional who believes
          taxation should be simple, transparent, and stress-free.
          {"\n\n"}
          You will always speak directly with an expert — no call centers,
          no confusion, no hidden advice.
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
            <Text style={styles.outlineBtnText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= TRUST STRIP ================= */}
      <View style={styles.trustStrip}>
        <Ionicons name="shield-checkmark" size={22} color="#0284c7" />
        <Text style={styles.trustTitle}>100% Confidential & Secure</Text>
        <Text style={styles.trustText}>
          Your financial data is handled with complete privacy and care.
        </Text>
      </View>

      {/* ================= FOOTER ================= */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} ZN Tax Consultant • Asansol
      </Text>

    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
  },

  hero: {
    padding: 26,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#e0f2fe",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  heroBadge: {
    backgroundColor: "#0284c7",
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
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
    color: "#475569",
    textAlign: "center",
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },

  quickHelp: {
    padding: 20,
  },

  helpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },

  helpText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "600",
  },

  cardGrid: {
    padding: 16,
    gap: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    elevation: 4,
  },

  whatsappCard: {
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  cardText: {
    marginTop: 6,
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
  },

  cardSubText: {
    marginTop: 4,
    fontSize: 12,
    color: "#94a3b8",
  },

  whatsappBtn: {
    marginTop: 14,
    backgroundColor: "#22c55e",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 14,
  },

  whatsappText: {
    color: "#fff",
    fontWeight: "700",
  },

  ownerSection: {
    backgroundColor: "#fff",
    marginTop: 24,
    padding: 20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },

  ownerImage: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    marginBottom: 16,
  },

  ownerTitle: {
    fontSize: 22,
    fontWeight: "800",
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
    borderRadius: 16,
    alignItems: "center",
  },

  callBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0284c7",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  outlineBtnText: {
    color: "#0284c7",
    fontWeight: "700",
  },

  trustStrip: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    gap: 6,
  },

  trustTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },

  trustText: {
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
