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
        <ThemedText style={styles.headerTitle}>
          Gestion des Données (RGPD)
        </ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.lastUpdated}>
          Dernière mise à jour : 15 janvier 2025
        </ThemedText>

        <ThemedText style={styles.intro}>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez de droits concernant vos données personnelles.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>
          Vos droits selon le RGPD
        </ThemedText>

        <View style={styles.rightItem}>
          <Ionicons
            name="eye-outline"
            size={20}
            color="#ebff56"
            style={styles.rightIcon}
          />
          <View style={styles.rightContent}>
            <ThemedText style={styles.rightTitle}>
              Droit d&apos;accès
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Vous pouvez demander à consulter toutes les données personnelles
              que nous détenons sur vous.
            </ThemedText>
          </View>
        </View>

        <View style={styles.rightItem}>
          <Ionicons
            name="create-outline"
            size={20}
            color="#ebff56"
            style={styles.rightIcon}
          />
          <View style={styles.rightContent}>
            <ThemedText style={styles.rightTitle}>
              Droit de rectification
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Vous pouvez demander la correction de données inexactes ou
              incomplètes.
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
              Droit à l&apos;effacement
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Vous pouvez demander la suppression de vos données personnelles
              dans certaines conditions.
            </ThemedText>
          </View>
        </View>

        <View style={styles.rightItem}>
          <Ionicons
            name="pause-outline"
            size={20}
            color="#ebff56"
            style={styles.rightIcon}
          />
          <View style={styles.rightContent}>
            <ThemedText style={styles.rightTitle}>
              Droit à la limitation
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Vous pouvez demander la limitation du traitement de vos données
              dans certains cas.
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
              Droit à la portabilité
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Vous pouvez récupérer vos données dans un format structuré et
              lisible par machine.
            </ThemedText>
          </View>
        </View>

        <View style={styles.rightItem}>
          <Ionicons
            name="close-circle-outline"
            size={20}
            color="#ebff56"
            style={styles.rightIcon}
          />
          <View style={styles.rightContent}>
            <ThemedText style={styles.rightTitle}>
              Droit d&apos;opposition
            </ThemedText>
            <ThemedText style={styles.rightDescription}>
              Vous pouvez vous opposer au traitement de vos données à des fins
              de marketing direct.
            </ThemedText>
          </View>
        </View>

        <ThemedText style={styles.sectionTitle}>
          Comment exercer vos droits
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Pour exercer l&apos;un de ces droits, vous pouvez :
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Nous contacter par email : privacy@beebuddy.app
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Utiliser la section &quot;Support&quot; dans votre profil
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Nous écrire à l&apos;adresse : [Adresse postale]
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Délai de réponse</ThemedText>
        <ThemedText style={styles.paragraph}>
          Nous nous engageons à répondre à votre demande dans un délai maximum
          de 30 jours à compter de sa réception. En cas de demande complexe, ce
          délai peut être prolongé de 60 jours supplémentaires.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>
          Conservation des données
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Vos données personnelles sont conservées uniquement pendant la durée
          nécessaire aux finalités pour lesquelles elles sont collectées :
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Données de profil : pendant la durée de votre compte + 3 ans
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Messages et communications : 1 an après la fin du projet
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Données de connexion : 12 mois maximum
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>
          Responsable du traitement
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Le responsable du traitement des données est :{"\n"}
          BeeBuddy{"\n"}
          [Adresse complète]{"\n"}
          Email : privacy@beebuddy.app
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Réclamation</ThemedText>
        <ThemedText style={styles.paragraph}>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          introduire une réclamation auprès de la Commission Nationale de
          l&apos;Informatique et des Libertés (CNIL) :
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          CNIL{"\n"}3 Place de Fontenoy - TSA 80715{"\n"}
          75334 PARIS CEDEX 07{"\n"}
          Téléphone : 01 53 73 22 22{"\n"}
          Site web : www.cnil.fr
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
    marginBottom: 20,
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
