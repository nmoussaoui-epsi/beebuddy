import { Alert, StyleSheet, TouchableOpacity } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function TabTwoScreen() {
  const { signOut, user } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/(auth)/signin");
        },
      },
    ]);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explorer</ThemedText>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <ThemedText type="link">Déconnexion</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedText>Utilisateur connecté: {user?.email}</ThemedText>
      <Collapsible title="Projets recommandés">
        <ThemedText>
          Découvrez les projets qui correspondent à vos compétences et à vos
          intérêts. Notre algorithme vous propose les meilleures opportunités
          basées sur votre profil.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Freelances populaires">
        <ThemedText>
          Explorez les profils des freelances les mieux notés de notre
          plateforme. Trouvez les talents qui correspondent à vos besoins
          projet.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Catégories">
        <ThemedText>
          Parcourez les différentes catégories de projets disponibles :
          développement web, design, marketing, rédaction, et bien plus encore.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutButton: {
    padding: 8,
  },
});
