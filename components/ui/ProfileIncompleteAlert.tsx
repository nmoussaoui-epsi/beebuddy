import { OnboardingButton } from "@/components/ui/OnboardingButton";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileIncompleteAlertProps {
  visible: boolean;
}

export const ProfileIncompleteAlert = ({
  visible,
}: ProfileIncompleteAlertProps) => {
  if (!visible) return null;

  const handleUpdate = () => {
    router.push("/(onboarding)" as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🛡️</Text>
      </View>
      <Text style={styles.title}>Complétez votre profil</Text>
      <Text style={styles.subtitle}>
        Finalisez votre inscription pour accéder à toutes les fonctionnalités de
        BeeBuddy
      </Text>
      <OnboardingButton
        title="Compléter"
        onPress={handleUpdate}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(68, 68, 68, 0.9)",
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    marginVertical: 16,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 18,
  },
  button: {
    width: 120,
  },
});
