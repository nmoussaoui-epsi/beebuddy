import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function IndexScreen() {
  const { isAuthenticated, loading, profile } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // Si l'utilisateur est connecté mais n'a pas de profil ou pas de rôle défini
        if (!profile || !profile.role) {
          router.replace("/(onboarding)" as any);
        } else {
          router.replace("/(tabs)");
        }
      } else {
        router.replace("/(auth)/signin");
      }
    }
  }, [isAuthenticated, loading, profile]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
