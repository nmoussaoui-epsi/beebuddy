import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyScreen() {
  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ebff56" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          Politique de Confidentialité
        </ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.lastUpdated}>
          Dernière mise à jour : 7 juillet 2025
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>1. Introduction</ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy protège votre vie privée. Cette politique explique comment
          nous collectons et utilisons vos données sur notre plateforme.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>
          2. Données collectées
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          • Informations de profil (nom, email, compétences){"\n"}• Messages et
          interactions{"\n"}• Données d&apos;utilisation de l&apos;app{"\n"}•
          Préférences de recherche
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>3. Utilisation</ThemedText>
        <ThemedText style={styles.paragraph}>
          Vos données servent à :{"\n"}• Faciliter les mises en relation{"\n"}•
          Améliorer nos services{"\n"}• Assurer la sécurité{"\n"}• Vous envoyer
          des notifications
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>4. Vos droits</ThemedText>
        <ThemedText style={styles.paragraph}>
          Vous pouvez :{"\n"}• Consulter vos données{"\n"}• Les corriger ou les
          supprimer{"\n"}• Les exporter{"\n"}• Limiter leur utilisation{"\n"}•
          Retirer votre consentement
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>5. Contact</ThemedText>
        <ThemedText style={styles.paragraph}>
          Questions ou demandes :{"\n"}• Email : privacy@beebuddy.app{"\n"}•
          Section Support dans votre profil{"\n"}• En cas de problème : CNIL
          (www.cnil.fr)
        </ThemedText>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    marginTop: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ebff56",
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#CCCCCC",
    lineHeight: 24,
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});
