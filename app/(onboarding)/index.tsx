import { OnboardingButton } from "@/components/ui/OnboardingButton";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function RoleSelectionScreen() {
  const handleRoleSelect = (role: "freelance" | "client") => {
    router.push({
      pathname: "/profile-setup" as any,
      params: { role },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2A2A2A", "#1E1E1E", "#2A2A2A"]}
        style={styles.gradient}
      >
        {/* Image 3D centrale */}
        <View style={styles.imageContainer}>
          {/* Remplacez par votre image 3D */}
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🏠</Text>
          </View>
        </View>

        {/* Boutons de choix */}
        <View style={styles.buttonsContainer}>
          <OnboardingButton
            title="Trouver une mission"
            onPress={() => handleRoleSelect("freelance")}
            variant="secondary"
            style={styles.button}
          />
          <OnboardingButton
            title="Trouver un freelance"
            onPress={() => handleRoleSelect("client")}
            variant="primary"
            style={styles.button}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
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
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  placeholderImage: {
    width: 200,
    height: 300,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 80,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  button: {
    width: "100%",
  },
});
