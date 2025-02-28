import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, BeeColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function DataPolicyScreen() {
  const colorScheme = useColorScheme() ?? "light";

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        },
      ]}
    >
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <IconSymbol
            name="chevron.right"
            color={BeeColors.primary}
            size={24}
            style={styles.backIcon}
          />
          <ThemedText style={styles.backText}>Retour</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Politique de confidentialité
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.container}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            1. Collecte des données
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            BeeBuddy collecte uniquement les informations nécessaires pour vous
            offrir une expérience personnalisée. Nous recueillons votre nom,
            prénom, email et date de naissance lors de votre inscription.
          </ThemedText>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            2. Utilisation des informations
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Nous utilisons vos informations pour :
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Créer et gérer votre compte
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Vous proposer des correspondances pertinentes
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Améliorer nos services
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Vous contacter concernant votre compte
          </ThemedText>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            3. Protection des données
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            La sécurité de vos données est notre priorité. Nous mettons en œuvre
            des mesures de sécurité techniques et organisationnelles pour
            protéger vos informations personnelles.
          </ThemedText>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            4. Partage d'informations
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Nous ne partageons pas vos informations personnelles avec des tiers,
            sauf dans les cas suivants :
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Avec votre consentement
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Pour respecter des obligations légales
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Pour protéger nos droits et ceux des utilisateurs
          </ThemedText>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            5. Vos droits
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Conformément au RGPD, vous disposez des droits suivants :
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Droit d'accès à vos données
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Droit de rectification
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Droit à l'effacement (droit à l'oubli)
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Droit à la limitation du traitement
          </ThemedText>
          <ThemedText style={styles.listItem}>
            • Droit à la portabilité des données
          </ThemedText>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            6. Contact
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Pour toute question concernant cette politique de confidentialité ou
            vos données personnelles, veuillez nous contacter à l'adresse
            suivante : contact@beebuddy.fr
          </ThemedText>

          <ThemedText style={styles.lastUpdate}>
            Dernière mise à jour : le 28 Février 2025
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    flexDirection: "column",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  backIcon: {
    transform: [{ rotate: "180deg" }],
  },
  backText: {
    fontSize: 16,
    marginLeft: 5,
    color: BeeColors.primary,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 22,
  },
  listItem: {
    marginBottom: 5,
    marginLeft: 15,
    lineHeight: 22,
  },
  lastUpdate: {
    marginTop: 30,
    fontStyle: "italic",
    fontSize: 14,
  },
});
