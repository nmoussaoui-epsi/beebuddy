import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataManagement() {
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
        <ThemedText style={styles.headerTitle}>Mes Données</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.lastUpdated}>
          Dernière mise à jour : 15 janvier 2025
        </ThemedText>

        <ThemedText style={styles.intro}>
          Gérez vos données personnelles et exercez vos droits RGPD en toute
          simplicité.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Vos droits</ThemedText>

        <View style={styles.rightItem}>
          <Ionicons
            name="eye-outline"
            size={20}
            color="#ebff56"
            style={styles.rightIcon}
          />
          <View style={styles.rightContent}>
            <ThemedText style={styles.rightTitle}>
              Consulter mes données
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Voir toutes les informations que nous avons sur vous
            </ThemedText>
          </View>
        </View>

        <View style={styles.rightItem}>
          <Ionicons
            name="download-outline"
            size={20}
            color="#ebff56"
            style={styles.rightIcon}
          />
          <View style={styles.rightContent}>
            <ThemedText style={styles.rightTitle}>
              Exporter mes données
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Télécharger vos données dans un format portable
            </ThemedText>
          </View>
        </View>

        <View style={styles.rightItem}>
          <Ionicons
            name="trash-outline"
            size={20}
            color="#ebff56"
            style={styles.rightIcon}
          />
          <View style={styles.rightContent}>
            <ThemedText style={styles.rightTitle}>
              Supprimer mon compte
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Supprimer définitivement votre compte et toutes vos données
            </ThemedText>
          </View>
        </View>

        <ThemedText style={styles.sectionTitle}>Comment procéder ?</ThemedText>
        <ThemedText style={styles.paragraph}>
          Pour toute demande concernant vos données :
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Utilisez la section Support dans votre profil
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Envoyez un email à privacy@beebuddy.app
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Réponse sous 30 jours maximum
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
    marginBottom: 16,
  },
  intro: {
    fontSize: 16,
    color: "#CCCCCC",
    lineHeight: 24,
    marginBottom: 24,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ebff56",
    marginTop: 24,
    marginBottom: 16,
  },
  rightItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#262626",
    padding: 16,
    borderRadius: 12,
  },
  rightIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  rightContent: {
    flex: 1,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  rightDescription: {
    fontSize: 14,
    color: "#CCCCCC",
    lineHeight: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#CCCCCC",
    lineHeight: 24,
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    color: "#CCCCCC",
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});
