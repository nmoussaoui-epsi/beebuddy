import { Input } from "@/components/ui/Input";
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
import { profileService } from "../../services/ProfileService";

const CV_STEPS = [
  {
    title: "Vos compétences",
    subtitle: "Listez vos compétences principales (séparées par des virgules)",
    placeholder: "Ex: React, Node.js, Python, Design...",
    field: "skills" as const,
    required: true,
  },
  {
    title: "Salaire souhaité",
    subtitle: "Quel est votre tarif journalier en euros ?",
    placeholder: "Ex: 500",
    field: "expected_salary" as const,
    required: false,
  },
  {
    title: "Votre expérience",
    subtitle: "Décrivez brièvement votre parcours professionnel",
    placeholder: "Ex: 5 ans d'expérience en développement web...",
    field: "experience" as const,
    required: false,
  },
];

export default function CVSetupScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    skills: "",
    expected_salary: "",
    experience: "",
  });
  const { user, refreshProfile } = useAuth();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canContinue = () => {
    if (currentStep === 0) return formData.skills.trim().length > 0;
    return true; // Les autres champs sont optionnels
  };

  const handleNext = () => {
    if (currentStep < CV_STEPS.length - 1) {
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

    if (!formData.skills.trim()) {
      Alert.alert("Erreur", "Veuillez entrer au moins une compétence");
      return;
    }

    // Conversion des données selon la BDD
    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    const expectedSalary = formData.expected_salary
      ? parseInt(formData.expected_salary)
      : undefined;

    const { error } = await profileService.createCV(user.id, {
      skills: skillsArray,
      expected_salary: expectedSalary,
      experience: formData.experience.trim() || undefined,
    });

    if (error) {
      Alert.alert("Erreur", "Impossible de créer le CV: " + error.message);
      return;
    }

    await refreshProfile();
    router.replace("/(tabs)");
  };

  const currentStepData = CV_STEPS[currentStep];

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
              style={styles.input}
              keyboardType={
                currentStepData.field === "expected_salary"
                  ? "numeric"
                  : "default"
              }
              multiline={currentStepData.field === "experience"}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.footer}>
            <OnboardingButton
              title={
                currentStep === CV_STEPS.length - 1 ? "Terminer" : "Continuer"
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
