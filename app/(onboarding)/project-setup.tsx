import { OnboardingButton } from "@/components/ui/OnboardingButton";
import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
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
import Input from "../../components/ui/Input";
import { profileService } from "../../services/ProfileService";

const PROJECT_STEPS = [
  {
    title: "Titre du projet",
    subtitle: "Comment appelez-vous votre projet ?",
    placeholder: "Ex: Développement d'une application mobile",
    field: "title" as const,
  },
  {
    title: "Description",
    subtitle: "Décrivez votre projet en détail",
    placeholder:
      "Ex: Je recherche un développeur pour créer une app de e-commerce...",
    field: "description" as const,
  },
  {
    title: "Budget",
    subtitle: "Quel est votre budget pour ce projet ?",
    placeholder: "Ex: 5000",
    field: "budget" as const,
  },
];

export default function ProjectSetupScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });
  const { user, refreshProfile } = useAuth();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canContinue = () => {
    if (currentStep === 0) return formData.title.trim().length > 0;
    return true; // Les autres champs sont optionnels
  };

  const handleNext = () => {
    if (currentStep < PROJECT_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Erreur", "Erreur d'authentification");
      return;
    }

    if (!formData.title.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un titre pour votre projet");
      return;
    }

    // Conversion des données selon la BDD
    const budget = formData.budget ? parseInt(formData.budget) : undefined;

    const { error } = await profileService.createProject(user.id, {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      budget,
      tags: [], // Pas de tags pour le moment (simplification)
    });

    if (error) {
      Alert.alert("Erreur", "Impossible de créer le projet: " + error.message);
      return;
    }

    await refreshProfile();
    router.replace("/(tabs)");
  };

  const currentStepData = PROJECT_STEPS[currentStep];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#2A2A2A", "#1E1E1E", "#2A2A2A"]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{currentStepData.title}</Text>
            <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>

            <Input
              placeholder={currentStepData.placeholder}
              value={formData[currentStepData.field]}
              onChangeText={(value) =>
                handleInputChange(currentStepData.field, value)
              }
              keyboardType={
                currentStepData.field === "budget" ? "numeric" : "default"
              }
              multiline={currentStepData.field === "description"}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.footer}>
            <OnboardingButton
              title={
                currentStep === PROJECT_STEPS.length - 1
                  ? "Créer le projet"
                  : "Continuer"
              }
              onPress={handleNext}
              disabled={!canContinue()}
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
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
