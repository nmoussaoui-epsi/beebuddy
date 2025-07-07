import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createTestUsers,
  showTestCredentials,
} from "../scripts/createTestUsers";

export default function SetupScreen() {
  const handleCreateUsers = async () => {
    console.log("Démarrage de la création des utilisateurs...");
    await createTestUsers();
  };

  const handleShowCredentials = async () => {
    await showTestCredentials();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Configuration de la Base de Données</Text>
        <Text style={styles.subtitle}>
          Créez des utilisateurs de test pour développer et tester votre
          application
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Étape 1: Créer les utilisateurs
          </Text>
          <Text style={styles.description}>
            Cette action va créer 10 freelances et 10 clients avec leurs données
            associées. Chaque utilisateur aura un compte d&apos;authentification
            Supabase valide.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleCreateUsers}>
            <Text style={styles.buttonText}>Créer 20 utilisateurs de test</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Étape 2: Afficher les identifiants
          </Text>
          <Text style={styles.description}>
            Affichez la liste complète des comptes créés avec leurs identifiants
            de connexion.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleShowCredentials}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Afficher les identifiants
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ Informations</Text>
          <Text style={styles.infoText}>
            • Chaque utilisateur aura un avatar Gravatar unique{"\n"}• Les
            freelances auront des CV avec compétences variées{"\n"}• Les clients
            auront 1-2 projets chacun{"\n"}• Mot de passe par défaut:
            password123{"\n"}• Regardez la console pour suivre la progression
          </Text>
        </View>

        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ Attention</Text>
          <Text style={styles.warningText}>
            Cette action créera de vrais comptes utilisateur dans Supabase. À
            utiliser uniquement en développement/test.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#C4FF00",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  secondaryButton: {
    backgroundColor: "#2196F3",
  },
  secondaryButtonText: {
    color: "white",
  },
  warningButton: {
    backgroundColor: "#FF9800",
  },
  warningButtonText: {
    color: "white",
  },
  infoBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1976D2",
  },
  infoText: {
    fontSize: 14,
    color: "#1565C0",
    lineHeight: 20,
  },
  warningBox: {
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#F57C00",
  },
  warningText: {
    fontSize: 14,
    color: "#EF6C00",
    lineHeight: 20,
  },
});
