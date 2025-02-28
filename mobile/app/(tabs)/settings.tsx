import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsScreen() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navigateToDataPolicy = () => {
    router.push("/confidentiality"); // et non plus "/(tabs)/confidentiality"
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Paramètres
      </ThemedText>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Compte
        </ThemedText>

        <TouchableOpacity style={styles.option}>
          <ThemedText>Modifier mon profil</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <ThemedText>Changer mon mot de passe</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Confidentialité
        </ThemedText>

        <TouchableOpacity style={styles.option} onPress={navigateToDataPolicy}>
          <ThemedText>Politique de confidentialité</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <ThemedText>Gestion des données personnelles</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Aide
        </ThemedText>

        <TouchableOpacity style={styles.option}>
          <ThemedText>Contacter le support</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <ThemedText>FAQ</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutText}>Se déconnecter</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.version}>Version 1.0.0</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  logoutButton: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 30,
  },
  logoutText: {
    fontWeight: "bold",
    color: "#000",
  },
  version: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    opacity: 0.6,
  },
});
