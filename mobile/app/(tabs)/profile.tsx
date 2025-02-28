import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, BeeColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/contexts/AuthContext";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme() ?? "light"; // Récupérer le thème actuel

  // Si pas d'utilisateur connecté, afficher un message d'erreur
  if (!user) {
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
        <ThemedView style={styles.container}>
          <ThemedText type="title">Vous n'êtes pas connecté</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  // Déterminer si l'utilisateur est un client ou un prestataire
  const isFreelance = user.role === "freelance";

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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Le reste du code reste identique */}
        {/* ... */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // Supprimez la couleur de fond fixe ici, nous la gérons dynamiquement
  },
  // Le reste du style reste identique
  // ...
});
