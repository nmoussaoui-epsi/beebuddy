import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, BeeColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthActions } from "@/hooks/useAuthActions";
import { formatDateInput } from "@/utils/dateUtils";
import { validateRegistrationForm } from "@/utils/validationUtils";

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
    role: "client",
  });

  const colorScheme = useColorScheme() ?? "light";
  const { register, loading, error, setError } = useAuthActions();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (text) => {
    const formattedDate = formatDateInput(text);
    handleChange("dateDeNaissance", formattedDate);
  };

  const handleRegister = async () => {
    const validation = validateRegistrationForm(formData);

    if (!validation.isValid) {
      setError(validation.errorMessage || "Erreur de validation");
      return;
    }

    const { confirmMotDePasse, ...userData } = formData;

    const completeUserData = {
      ...userData,
      adresse: userData.adresse || "À compléter",
      ville: userData.ville || "À compléter",
      codePostal: userData.codePostal || "00000",
    };

    await register(completeUserData);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={styles.container}>
            <Image
              source={require("@/assets/images/beebuddy-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <ThemedText style={styles.subtitle}>
              Rejoignez BeeBuddy aujourd'hui
            </ThemedText>

            {error ? (
              <ThemedText style={styles.error}>{error}</ThemedText>
            ) : null}

            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Informations personnelles
            </ThemedText>

            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  borderColor: Colors[colorScheme].tabIconDefault,
                  backgroundColor:
                    colorScheme === "dark"
                      ? BeeColors.darkGray
                      : BeeColors.lightGray,
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
                  backgroundColor:
                    colorScheme === "dark"
                      ? BeeColors.darkGray
                      : BeeColors.lightGray,
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
                  backgroundColor:
                    colorScheme === "dark"
                      ? BeeColors.darkGray
                      : BeeColors.lightGray,
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
                  backgroundColor:
                    colorScheme === "dark"
                      ? BeeColors.darkGray
                      : BeeColors.lightGray,
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
                  backgroundColor:
                    colorScheme === "dark"
                      ? BeeColors.darkGray
                      : BeeColors.lightGray,
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
                  backgroundColor:
                    colorScheme === "dark"
                      ? BeeColors.darkGray
                      : BeeColors.lightGray,
                },
              ]}
              placeholder="Date de naissance (JJ/MM/AAAA)"
              placeholderTextColor={Colors[colorScheme].tabIconDefault}
              value={formData.dateDeNaissance}
              onChangeText={handleDateChange}
              keyboardType="numeric"
              maxLength={10}
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
                  Prestataire
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.privacyContainer}>
              <ThemedText style={styles.privacyText}>
                En vous inscrivant, vous acceptez nos{" "}
                <Link href="/confidentiality" style={styles.linkText}>
                  conditions d'utilisation et politique de confidentialité
                </Link>
              </ThemedText>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
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
    borderColor: BeeColors.primary,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  roleButtonSelected: {
    backgroundColor: BeeColors.primary,
  },
  roleButtonText: {
    fontWeight: "600",
  },
  roleButtonTextSelected: {
    color: "#000000",
  },
  button: {
    backgroundColor: BeeColors.primary,
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
    color: BeeColors.primary,
    fontWeight: "bold",
  },
  error: {
    color: BeeColors.danger,
    textAlign: "center",
    marginBottom: 15,
  },
  privacyContainer: {
    marginBottom: 15,
  },
  privacyText: {
    fontSize: 14,
    textAlign: "center",
  },
  linkText: {
    color: BeeColors.primary,
    fontWeight: "bold",
  },
});
