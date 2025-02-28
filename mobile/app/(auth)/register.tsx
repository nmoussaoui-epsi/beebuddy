import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    confirmMotDePasse: "",
    dateDeNaissance: "",
    adresse: "",
    ville: "",
    codePostal: "",
    role: "client", // Rôle par défaut
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const colorScheme = useColorScheme() ?? "light";

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.motDePasse ||
      !formData.dateDeNaissance ||
      !formData.adresse ||
      !formData.ville ||
      !formData.codePostal
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return false;
    }

    if (formData.motDePasse !== formData.confirmMotDePasse) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }

    if (formData.motDePasse.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }

    // Validation simple d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.API_URL || "http://192.168.1.42:5000";
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dateDeNaissance: new Date(formData.dateDeNaissance).toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur d'inscription");
      }

      console.log("Inscription réussie:", data);

      // Navigation vers la page de connexion
      router.replace("/(auth)/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Inscription
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Rejoignez BeeBuddy aujourd'hui
          </ThemedText>

          {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Informations personnelles
          </ThemedText>

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Nom"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.nom}
            onChangeText={(text) => handleChange("nom", text)}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Prénom"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.prenom}
            onChangeText={(text) => handleChange("prenom", text)}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Email"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Mot de passe"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.motDePasse}
            onChangeText={(text) => handleChange("motDePasse", text)}
            secureTextEntry
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.confirmMotDePasse}
            onChangeText={(text) => handleChange("confirmMotDePasse", text)}
            secureTextEntry
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Date de naissance (JJ/MM/AAAA)"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.dateDeNaissance}
            onChangeText={(text) => handleChange("dateDeNaissance", text)}
            keyboardType="numeric"
          />

          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Adresse
          </ThemedText>

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Adresse"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.adresse}
            onChangeText={(text) => handleChange("adresse", text)}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Ville"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.ville}
            onChangeText={(text) => handleChange("ville", text)}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F2F2F7",
              },
            ]}
            placeholder="Code Postal"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={formData.codePostal}
            onChangeText={(text) => handleChange("codePostal", text)}
            keyboardType="numeric"
          />

          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Je suis un
          </ThemedText>

          <ThemedView style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                formData.role === "client" && styles.roleButtonSelected,
              ]}
              onPress={() => handleChange("role", "client")}
            >
              <ThemedText
                style={[
                  styles.roleButtonText,
                  formData.role === "client" && styles.roleButtonTextSelected,
                ]}
              >
                Client
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                formData.role === "freelance" && styles.roleButtonSelected,
              ]}
              onPress={() => handleChange("role", "freelance")}
            >
              <ThemedText
                style={[
                  styles.roleButtonText,
                  formData.role === "freelance" &&
                    styles.roleButtonTextSelected,
                ]}
              >
                Freelance
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <TouchableOpacity
            style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.loginContainer}>
            <ThemedText>Déjà un compte ? </ThemedText>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <ThemedText style={styles.loginText}>Se connecter</ThemedText>
              </TouchableOpacity>
            </Link>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  roleButtonSelected: {
    backgroundColor: "#FFD700",
  },
  roleButtonText: {
    fontWeight: "600",
  },
  roleButtonTextSelected: {
    color: "#000000",
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000000",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
});
