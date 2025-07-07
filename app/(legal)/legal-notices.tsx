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

        <ThemedText style={styles.sectionTitle}>
          Éditeur de l&apos;application
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy{"\n"}
          Société : [Nom de votre société]{"\n"}
          Forme juridique : [SAS/SARL/Auto-entrepreneur]{"\n"}
          Capital social : [Montant du capital]{"\n"}
          Siège social : [Adresse complète]{"\n"}
          RCS : [Numéro RCS]{"\n"}
          SIRET : [Numéro SIRET]{"\n"}
          TVA intracommunautaire : [Numéro TVA]
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>
          Directeur de publication
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          [Nom du directeur de publication]{"\n"}
          Qualité : [Fonction dans l&apos;entreprise]
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
        <ThemedText style={styles.paragraph}>
          Email : contact@beebuddy.app{"\n"}
          Téléphone : [Numéro de téléphone]{"\n"}
          Adresse : [Adresse postale]
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Hébergement</ThemedText>
        <ThemedText style={styles.paragraph}>
          L&apos;application BeeBuddy est hébergée par :{"\n"}
          Supabase Inc.{"\n"}
          970 Toa Payoh North #07-04{"\n"}
          Singapore 318992{"\n"}
          Site web : https://supabase.com
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>
          Propriété intellectuelle
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          L&apos;ensemble de cette application, y compris mais sans s&apos;y
          limiter, la structure générale, les textes, images fixes ou animées,
          sons, savoir-faire, marques, et tous les autres éléments composant
          l&apos;application sont la propriété exclusive de BeeBuddy ou de ses
          partenaires.
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          Toute reproduction, représentation, modification, publication,
          adaptation de tout ou partie des éléments de l&apos;application, quel
          que soit le moyen ou le procédé utilisé, est interdite, sauf
          autorisation écrite préalable de BeeBuddy.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Responsabilité</ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy ne pourra être tenu responsable des dommages directs et
          indirects causés au matériel de l&apos;utilisateur, lors de
          l&apos;accès à l&apos;application, et résultant soit de
          l&apos;utilisation d&apos;un matériel ne répondant pas aux
          spécifications techniques requises, soit de l&apos;apparition
          d&apos;un bug ou d&apos;une incompatibilité.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Droit applicable</ThemedText>
        <ThemedText style={styles.paragraph}>
          Les présentes mentions légales sont régies par le droit français. En
          cas de litige, les tribunaux français seront seuls compétents.
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
