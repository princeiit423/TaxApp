import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Landing() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {/* ================= HERO ================= */}
      <LinearGradient
        colors={["#0ea5e9", "#0284c7"]}
        style={styles.hero}
      >
        <Animated.Text
          entering={FadeInDown.duration(1000)}
          style={styles.heroTitle}
        >
          ZN Tax Consultant
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.delay(400)}
          style={styles.heroSubtitle}
        >
          Asansol’s Most Trusted Taxation & Compliance Partner
        </Animated.Text>

        <Animated.View
          entering={FadeInUp.delay(800)}
          style={styles.heroBtnWrap}
        >
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.primaryBtnText}>Login / Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push("/contact")}
          >
            <Text style={styles.secondaryBtnText}>Talk to Expert</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      {/* ================= TRUST STRIP ================= */}
      <View style={styles.trustStrip}>
        <Text style={styles.trustText}>
          ⭐ Trusted by 500+ Happy Clients in Asansol
        </Text>
      </View>

      {/* ================= WHY CHOOSE US ================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose ZN Tax?</Text>

        <View style={styles.grid}>
          <View style={styles.featureCard}>
            <Ionicons name="shield-checkmark" size={28} color="#0284c7" />
            <Text style={styles.featureText}>100% Confidential</Text>
          </View>

          <View style={styles.featureCard}>
            <Ionicons name="people" size={28} color="#0284c7" />
            <Text style={styles.featureText}>500+ Happy Clients</Text>
          </View>

          <View style={styles.featureCard}>
            <Ionicons name="briefcase" size={28} color="#0284c7" />
            <Text style={styles.featureText}>10+ Years Experience</Text>
          </View>

          <View style={styles.featureCard}>
            <Ionicons name="location" size={28} color="#0284c7" />
            <Text style={styles.featureText}>Top Firm in Asansol</Text>
          </View>
        </View>
      </View>
      

      {/* ================= SERVICES ================= */}
      <View style={styles.sectionAlt}>
        <Text style={styles.sectionTitle}>Our Services</Text>

        <View style={styles.serviceItem}>
          <MaterialIcons name="check-circle" size={22} color="#22c55e" />
          <Text style={styles.serviceText}>Income Tax Filing (ITR)</Text>
        </View>

        <View style={styles.serviceItem}>
          <MaterialIcons name="check-circle" size={22} color="#22c55e" />
          <Text style={styles.serviceText}>GST Registration & Returns</Text>
        </View>

        <View style={styles.serviceItem}>
          <MaterialIcons name="check-circle" size={22} color="#22c55e" />
          <Text style={styles.serviceText}>
            Business Compliance & Audit
          </Text>
        </View>

        <View style={styles.serviceItem}>
          <MaterialIcons name="check-circle" size={22} color="#22c55e" />
          <Text style={styles.serviceText}>
            Project Reports & Financial Statements
          </Text>
        </View>
      </View>

      {/* ================= TESTIMONIALS ================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Clients Say</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              “ZN Tax handled my GST & ITR smoothly. Very professional.”
            </Text>
            <Text style={styles.testimonialName}>— Rohit Sharma</Text>
          </View>

          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              “Best tax consultant in Asansol. Clear guidance & trust.”
            </Text>
            <Text style={styles.testimonialName}>— Amit Verma</Text>
          </View>

          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              “Fast response, honest advice. Highly recommended.”
            </Text>
            <Text style={styles.testimonialName}>— Neha Gupta</Text>
          </View>
        </ScrollView>
      </View>

      {/* ================= CTA ================= */}
      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Ready to simplify your taxes?</Text>

        <Text style={styles.ctaText}>
          Join Asansol’s top taxation enterprise today.
        </Text>

        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.ctaBtnText}>Start Now</Text>
        </TouchableOpacity>
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
  hero: {
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#fff",
  },
  heroSubtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#e0f2fe",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  heroBtnWrap: {
    marginTop: 30,
    width: width * 0.8,
    gap: 14,
  },
  primaryBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
  },
  primaryBtnText: {
    textAlign: "center",
    color: "#0284c7",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#e0f2fe",
    padding: 14,
    borderRadius: 14,
  },
  secondaryBtnText: {
    textAlign: "center",
    color: "#e0f2fe",
    fontWeight: "600",
  },

  trustStrip: {
    backgroundColor: "#e0f2fe",
    padding: 12,
    alignItems: "center",
  },
  trustText: {
    color: "#0369a1",
    fontWeight: "600",
  },

  section: {
    padding: 20,
  },
  sectionAlt: {
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
    color: "#0f172a",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
  },
  featureText: {
    marginTop: 8,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },

  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 15,
    color: "#334155",
  },

  testimonialCard: {
    width: width * 0.75,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginRight: 14,
    elevation: 4,
  },
  testimonialText: {
    fontStyle: "italic",
    color: "#475569",
  },
  testimonialName: {
    marginTop: 10,
    fontWeight: "700",
    color: "#0284c7",
  },

  cta: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#0284c7",
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  ctaText: {
    color: "#e0f2fe",
    marginVertical: 10,
    textAlign: "center",
  },
  ctaBtn: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginTop: 10,
  },
  ctaBtnText: {
    color: "#0284c7",
    fontWeight: "700",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    padding: 16,
    color: "#94a3b8",
    fontSize: 12,
  },
});
