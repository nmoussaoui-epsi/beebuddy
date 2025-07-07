import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push("/(auth)/signup");
  };

  const handleSignIn = () => {
    router.push("/(auth)/signin");
  };

  const features = [
    {
      icon: "people-outline",
      title: "Rencontrez des talents",
      description:
        "Connectez-vous avec les meilleurs freelances et clients de votre domaine",
    },
    {
      icon: "chat-bubble-outline",
      title: "Communication directe",
      description:
        "Échangez facilement avec vos matchs grâce à notre système de messagerie",
    },
    {
      icon: "shield-checkmark-outline",
      title: "Profils vérifiés",
      description:
        "Tous les profils sont vérifiés pour garantir des collaborations de qualité",
    },
    {
      icon: "trending-up-outline",
      title: "Développez votre réseau",
      description:
        "Élargissez votre réseau professionnel et trouvez de nouvelles opportunités",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec logo */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.title}>BeeBuddy</ThemedText>
          <ThemedText style={styles.subtitle}>
            La plateforme qui connecte freelances et clients
          </ThemedText>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <ThemedText style={styles.featuresTitle}>
            Pourquoi choisir BeeBuddy ?
          </ThemedText>

          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon as any}
                  size={24}
                  color="#ebff56"
                />
              </View>
              <View style={styles.featureContent}>
                <ThemedText style={styles.featureTitle}>
                  {feature.title}
                </ThemedText>
                <ThemedText style={styles.featureDescription}>
                  {feature.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
          >
            <ThemedText style={styles.primaryButtonText}>Commencer</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignIn}
          >
            <ThemedText style={styles.secondaryButtonText}>
              J&apos;ai déjà un compte
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Legal Section */}
        <View style={styles.legalSection}>
          <ThemedText style={styles.legalTitle}>
            Informations légales
          </ThemedText>

          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => router.push("/legal/privacy")}
          >
            <View style={styles.legalLinkContent}>
              <Ionicons name="shield-outline" size={20} color="#ebff56" />
              <ThemedText style={styles.legalLinkText}>
                Politique de Confidentialité
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => router.push("/legal/terms")}
          >
            <View style={styles.legalLinkContent}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#ebff56"
              />
              <ThemedText style={styles.legalLinkText}>
                Conditions d&apos;Utilisation
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => router.push("/support")}
          >
            <View style={styles.legalLinkContent}>
              <Ionicons name="help-circle-outline" size={20} color="#ebff56" />
              <ThemedText style={styles.legalLinkText}>
                Support & Aide
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            En vous inscrivant, vous acceptez nos Conditions d&apos;Utilisation
            et notre Politique de Confidentialité.
          </ThemedText>
          <ThemedText style={styles.versionText}>
            Version 1.0.0 • © 2025 BeeBuddy
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ebff56",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#333",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#aaa",
    lineHeight: 20,
  },
  actionsSection: {
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#ebff56",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  legalSection: {
    marginBottom: 40,
  },
  legalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  legalLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  legalLinkContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  legalLinkText: {
    fontSize: 15,
    color: "#fff",
    marginLeft: 12,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 11,
    color: "#555",
    textAlign: "center",
  },
});
