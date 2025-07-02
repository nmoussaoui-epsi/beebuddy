import { ProfileIncompleteAlert } from "@/components/ui/ProfileIncompleteAlert";
import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { profile, user } = useAuth();

  // Vérifier si le profil est incomplet
  const isProfileIncomplete = !profile?.full_name || !profile?.role;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2A2A2A", "#1E1E1E", "#2A2A2A"]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>🐝</Text>
              <Text style={styles.appName}>BeeBuddy</Text>
            </View>
            <Text style={styles.greeting}>
              Bonjour{" "}
              {profile?.full_name ||
                user?.email?.split("@")[0] ||
                "Utilisateur"}{" "}
              !
            </Text>
          </View>

          {/* Alerte profil incomplet */}
          {isProfileIncomplete && (
            <ProfileIncompleteAlert visible={isProfileIncomplete} />
          )}

          {/* Contenu principal */}
          <View style={styles.mainContent}>
            {profile?.role === "freelance" ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Tableau de bord Freelance
                </Text>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Projets disponibles</Text>
                  <Text style={styles.cardSubtitle}>
                    Découvrez les projets qui correspondent à votre profil
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Mes candidatures</Text>
                  <Text style={styles.cardSubtitle}>
                    Suivez l&apos;état de vos candidatures
                  </Text>
                </View>
              </View>
            ) : profile?.role === "client" ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tableau de bord Client</Text>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Mes projets</Text>
                  <Text style={styles.cardSubtitle}>
                    Gérez vos projets en cours
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Freelances recommandés</Text>
                  <Text style={styles.cardSubtitle}>
                    Trouvez les meilleurs talents
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bienvenue sur BeeBuddy</Text>
                <Text style={styles.description}>
                  Connectez-vous avec les meilleurs freelances ou trouvez votre
                  prochain projet !
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    fontSize: 32,
    marginRight: 12,
  },
  appName: {
    color: "#C4FF00",
    fontSize: 24,
    fontWeight: "bold",
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    lineHeight: 20,
  },
});
