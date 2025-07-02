import { Input } from "@/components/ui/Input";
import { OnboardingButton } from "@/components/ui/OnboardingButton";
import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { profileService } from "../../services/ProfileService";

export default function ProfileSetupScreen() {
  const { role } = useLocalSearchParams<{ role: "freelance" | "client" }>();
  const [fullName, setFullName] = useState("");
  const { user, refreshProfile } = useAuth();

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre nom complet");
      return;
    }

    if (!role || !user) {
      Alert.alert("Erreur", "Erreur d'authentification");
      return;
    }

    const { error } = await profileService.createProfile(user.id, {
      full_name: fullName.trim(),
      role,
    });

    if (error) {
      Alert.alert("Erreur", "Impossible de créer le profil: " + error.message);
      return;
    }

    // Rafraîchir le profil dans le contexte
    await refreshProfile();

    // Redirection selon le rôle
    if (role === "freelance") {
      router.push("/cv-setup" as any);
    } else {
      router.push("/project-setup" as any);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#2A2A2A", "#1E1E1E", "#2A2A2A"]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Votre nom</Text>
            <Text style={styles.subtitle}>
              Comment souhaitez-vous être appelé ?
            </Text>

            <Input
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.footer}>
            <OnboardingButton
              title="Continuer"
              onPress={handleSubmit}
              disabled={!fullName.trim()}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    color: "#000000",
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: "100%",
    minHeight: 60,
    borderWidth: 2,
    borderColor: "#C4FF00",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
