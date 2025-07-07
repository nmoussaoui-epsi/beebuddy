import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataManagement() {
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleExportData = () => {
    Alert.alert(
      "Exporter mes données",
      "Nous allons préparer un export de toutes vos données personnelles. Vous recevrez un email avec un lien de téléchargement dans les 24h.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Confirmer",
          onPress: () => {
            // Simulation de l&apos;export
            Alert.alert(
              "Export demandé",
              "Vous recevrez un email avec vos données dans les 24h."
            );
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer mon compte",
      "Cette action est irréversible. Toutes vos données seront définitivement supprimées :\n\n• Profil et informations personnelles\n• Conversations et messages\n• Historique des matchs\n• Préférences et paramètres\n\nÊtes-vous sûr de vouloir continuer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: confirmDeleteAccount,
        },
      ]
    );
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Confirmation finale",
      'Tapez "SUPPRIMER" pour confirmer la suppression définitive de votre compte.',
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "SUPPRIMER",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              // Simulation de la suppression
              await new Promise((resolve) => setTimeout(resolve, 2000));
              await signOut();
              Alert.alert(
                "Compte supprimé",
                "Votre compte et toutes vos données ont été supprimés."
              );
            } catch {
              Alert.alert(
                "Erreur",
                "Une erreur est survenue lors de la suppression."
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleContactDPO = () => {
    Alert.alert(
      "Contacter le DPO",
      "Vous allez être redirigé vers votre client email pour contacter notre Délégué à la Protection des Données.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Continuer",
          onPress: () => {
            // Ici on ouvrirait le client email
            Alert.alert(
              "Email",
              "Votre client email va s&apos;ouvrir avec l&apos;adresse dpo@beebuddy.app"
            );
          },
        },
      ]
    );
  };

  const dataRights = [
    {
      id: "access",
      title: "Droit d&apos;accès",
      description: "Consulter toutes les données que nous avons sur vous",
      icon: "eye-outline",
      action: () => router.push("/legal/privacy"),
    },
    {
      id: "rectification",
      title: "Droit de rectification",
      description: "Modifier ou corriger vos informations personnelles",
      icon: "create-outline",
      action: () => router.push("/(tabs)/profile"),
    },
    {
      id: "portability",
      title: "Droit à la portabilité",
      description: "Récupérer vos données dans un format lisible",
      icon: "download-outline",
      action: handleExportData,
    },
    {
      id: "opposition",
      title: "Droit d&apos;opposition",
      description: "Vous opposer au traitement de vos données",
      icon: "ban-outline",
      action: handleContactDPO,
    },
    {
      id: "limitation",
      title: "Droit à la limitation",
      description: "Limiter l&apos;utilisation de certaines données",
      icon: "pause-outline",
      action: handleContactDPO,
    },
    {
      id: "erasure",
      title: "Droit à l&apos;effacement",
      description: "Supprimer définitivement votre compte et vos données",
      icon: "trash-outline",
      action: handleDeleteAccount,
      isDangerous: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ebff56" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Gestion des données</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.description}>
          Conformément au RGPD, vous disposez de plusieurs droits concernant vos
          données personnelles. Exercez-les facilement depuis cette page.
        </ThemedText>

        {/* Rights Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Vos droits RGPD</ThemedText>

          {dataRights.map((right) => (
            <TouchableOpacity
              key={right.id}
              style={[
                styles.rightItem,
                right.isDangerous && styles.rightItemDangerous,
              ]}
              onPress={right.action}
              disabled={isLoading}
            >
              <View style={styles.rightContent}>
                <Ionicons
                  name={right.icon as any}
                  size={24}
                  color={right.isDangerous ? "#ff4444" : "#ebff56"}
                />
                <View style={styles.rightText}>
                  <ThemedText
                    style={[
                      styles.rightTitle,
                      right.isDangerous && styles.rightTitleDangerous,
                    ]}
                  >
                    {right.title}
                  </ThemedText>
                  <ThemedText style={styles.rightDescription}>
                    {right.description}
                  </ThemedText>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={right.isDangerous ? "#ff4444" : "#666"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Data Usage Info */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Utilisation de vos données
          </ThemedText>

          <View style={styles.infoCard}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#ebff56"
            />
            <View style={styles.infoText}>
              <ThemedText style={styles.infoTitle}>
                Données collectées
              </ThemedText>
              <ThemedText style={styles.infoDescription}>
                Profil, préférences, messages, activité sur l&apos;app
              </ThemedText>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#ebff56"
            />
            <View style={styles.infoText}>
              <ThemedText style={styles.infoTitle}>Finalités</ThemedText>
              <ThemedText style={styles.infoDescription}>
                Matching, communication, amélioration du service
              </ThemedText>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={24} color="#ebff56" />
            <View style={styles.infoText}>
              <ThemedText style={styles.infoTitle}>Conservation</ThemedText>
              <ThemedText style={styles.infoDescription}>
                3 ans après la dernière activité ou suppression immédiate sur
                demande
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Contact DPO */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Contact</ThemedText>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleContactDPO}
          >
            <View style={styles.contactContent}>
              <Ionicons name="person-outline" size={24} color="#ebff56" />
              <View style={styles.contactText}>
                <ThemedText style={styles.contactTitle}>
                  Délégué à la Protection des Données
                </ThemedText>
                <ThemedText style={styles.contactSubtitle}>
                  dpo@beebuddy.app
                </ThemedText>
                <ThemedText style={styles.contactDescription}>
                  Pour toute question sur vos données personnelles
                </ThemedText>
              </View>
            </View>
            <Ionicons name="mail-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Legal Links */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Documents légaux</ThemedText>

          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => router.push("/legal/privacy")}
          >
            <View style={styles.legalContent}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#ebff56"
              />
              <ThemedText style={styles.legalText}>
                Politique de Confidentialité
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => router.push("/legal/terms")}
          >
            <View style={styles.legalContent}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#ebff56"
              />
              <ThemedText style={styles.legalText}>
                Conditions d&apos;Utilisation
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            La protection de vos données personnelles est notre priorité. Nous
            nous engageons à respecter vos droits et la réglementation RGPD.
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
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ddd",
    marginTop: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ebff56",
    marginBottom: 16,
  },
  rightItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  rightItemDangerous: {
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightText: {
    marginLeft: 16,
    flex: 1,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  rightTitleDangerous: {
    color: "#ff4444",
  },
  rightDescription: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  infoDescription: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
  },
  contactContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  contactText: {
    marginLeft: 16,
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  contactSubtitle: {
    fontSize: 14,
    color: "#ebff56",
    marginTop: 2,
  },
  contactDescription: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 4,
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
  legalContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  legalText: {
    fontSize: 15,
    color: "#fff",
    marginLeft: 12,
  },
  footer: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },
});
