import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LegalNotices() {
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
        <ThemedText style={styles.headerTitle}>Mentions Légales</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.lastUpdated}>
          Dernière mise à jour : 15 janvier 2025
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Éditeur</ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy SAS{"\n"}
          123 Avenue des Champs-Élysées, 75008 Paris{"\n"}
          Email : contact@beebuddy.app
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Hébergement</ThemedText>
        <ThemedText style={styles.paragraph}>
          Supabase Inc.{"\n"}
          970 Toa Payoh North #07-04, Singapore 318992{"\n"}
          Site web : https://supabase.com
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>
          Propriété intellectuelle
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Tous les éléments de l&apos;application (design, textes, logos) sont
          la propriété de BeeBuddy. Toute reproduction est interdite sans
          autorisation écrite préalable.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
        <ThemedText style={styles.paragraph}>
          Pour toute question :{"\n"}
          Email : legal@beebuddy.app{"\n"}
          Adresse : BeeBuddy SAS, 123 Avenue des Champs-Élysées, 75008 Paris
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
