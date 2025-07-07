import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SwipeCard } from "../../components/ui/SwipeCard";
import { searchService } from "../../services/SearchService";
import { UserProfile } from "../../types/search";

export default function SearchScreen() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Composant de motif de fond
  const BackgroundPattern = () => (
    <View style={styles.backgroundPattern}>
      <View style={[styles.hexagon, { top: 50, left: 20 }]} />
      <View style={[styles.hexagon, { top: 120, right: 30 }]} />
      <View style={[styles.hexagon, { top: 200, left: 10 }]} />
      <View style={[styles.hexagon, { top: 280, right: 20 }]} />
      <View style={[styles.hexagon, { top: 360, left: 40 }]} />
      <View style={[styles.hexagon, { top: 440, right: 10 }]} />
      <View style={[styles.hexagon, { top: 520, left: 30 }]} />
      <View style={[styles.hexagon, { bottom: 100, right: 40 }]} />
      <View style={[styles.hexagon, { bottom: 40, left: 50 }]} />
    </View>
  );

  const loadUsers = useCallback(async () => {
    if (!profile) return;

    setLoading(true);

    const { data } = await searchService.getMatchableUsers(
      profile.id,
      profile.role
    );
    if (data) {
      setUsers(data as UserProfile[]);
    }
    setLoading(false);
  }, [profile]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSwipe = async (direction: "left" | "right") => {
    if (!profile || currentIndex >= users.length) return;

    const targetUser = users[currentIndex];
    console.log(
      `Swipe ${direction} sur ${targetUser.full_name}, index: ${currentIndex}`
    );

    // Enregistrer le swipe
    await searchService.recordSwipe(
      profile.id,
      targetUser.id,
      direction,
      profile.role
    );

    // Si c'est un swipe à droite, vérifier les matchs
    if (direction === "right") {
      const { data: isMatch } = await searchService.checkForMatch(
        profile.id,
        targetUser.id,
        profile.role
      );

      if (isMatch) {
        // TODO: Afficher une notification de match
      }
    }

    // Passer au profil suivant
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(
      `Nouvel index: ${newIndex}, Profils restants: ${users.length - newIndex}`
    );
  };

  const handleDetailsPress = () => {
    if (currentIndex < users.length) {
      const currentUser = users[currentIndex];
      console.log("=== DÉTAILS DU PROFIL ===");
      console.log("Nom:", currentUser.full_name);
      console.log("Rôle:", currentUser.role);

      if (currentUser.role === "freelance" && currentUser.cv) {
        console.log("Compétences:", currentUser.cv.skills?.join(", "));
        console.log("Salaire attendu:", currentUser.cv.expected_salary, "€");
        console.log("Expérience:", currentUser.cv.experience);
      }

      if (currentUser.role === "client" && currentUser.projects) {
        currentUser.projects.forEach((project, index) => {
          console.log(`Projet ${index + 1}:`, project.title);
          console.log("Description:", project.description);
          console.log("Budget:", project.budget, "€");
        });
      }

      // TODO: Ouvrir une modal de détails
      alert(
        `Détails de ${currentUser.full_name} - Vérifiez la console pour plus d'infos`
      );
    }
  };

  const getTitle = () => {
    if (!profile) return "Rechercher";
    return profile.role === "freelance"
      ? "Rechercher un Client"
      : "Rechercher un Freelancer";
  };

  const getSubtitle = () => {
    if (!profile) return "";
    return profile.role === "freelance"
      ? "Trouvez votre prochain projet"
      : "Trouvez le talent parfait";
  };

  const getCurrentUser = () => {
    return currentIndex < users.length ? users[currentIndex] : null;
  };

  const getNextUsers = () => {
    const nextUsers = [];
    // Card suivante (index + 1)
    if (currentIndex + 1 < users.length) {
      nextUsers.push(users[currentIndex + 1]);
    }
    // Card d'après (index + 2)
    if (currentIndex + 2 < users.length) {
      nextUsers.push(users[currentIndex + 2]);
    }
    return nextUsers;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement des profils...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentUser = getCurrentUser();
  const nextUsers = getNextUsers();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#efecd2", "#f5f2dc", "#efecd2"]}
        style={styles.gradient}
      >
        <BackgroundPattern />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{getTitle()}</Text>
              <Text style={styles.subtitle}>{getSubtitle()}</Text>
              <Text style={styles.resultsText}>
                {users.length - currentIndex} profils disponibles
              </Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Card Stack */}
          <View style={styles.cardContainer}>
            {currentUser ? (
              <View style={styles.cardStack}>
                {/* Card d'arrière-plan (3ème) */}
                {nextUsers.length > 1 && (
                  <View style={[styles.backgroundCard, styles.card3]}>
                    <SwipeCard
                      user={nextUsers[1]}
                      onSwipe={() => {}}
                      userRole={profile?.role || "freelance"}
                      isBackground={true}
                    />
                  </View>
                )}

                {/* Card du milieu (2ème) */}
                {nextUsers.length > 0 && (
                  <View style={[styles.backgroundCard, styles.card2]}>
                    <SwipeCard
                      user={nextUsers[0]}
                      onSwipe={() => {}}
                      userRole={profile?.role || "freelance"}
                      isBackground={true}
                    />
                  </View>
                )}

                {/* Card principale (1ère) */}
                <View style={styles.mainCard}>
                  <SwipeCard
                    key={`${currentUser.id}-${currentIndex}`}
                    user={currentUser}
                    onSwipe={handleSwipe}
                    userRole={profile?.role || "freelance"}
                    onDetailsPress={handleDetailsPress}
                    isBackground={false}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.noMoreCards}>
                <Text style={styles.noMoreText}>
                  Plus de profils disponibles !
                </Text>
                <TouchableOpacity
                  style={styles.reloadButton}
                  onPress={loadUsers}
                >
                  <Text style={styles.reloadButtonText}>Recharger</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efecd2",
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 90,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#555",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 16,
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555555",
    marginTop: 4,
  },
  resultsText: {
    fontSize: 14,
    color: "#888888",
    marginTop: 8,
  },
  filterButton: {
    padding: 8,
    marginTop: 4,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 520,
    paddingVertical: 10,
    paddingTop: 20,
  },
  noMoreCards: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  noMoreText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  reloadButton: {
    backgroundColor: "#C4FF00",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  reloadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  cardStack: {
    position: "relative",
    width: "100%",
    maxWidth: 320,
    height: 420,
    alignItems: "center",
    justifyContent: "center",
  },
  mainCard: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 3,
  },
  backgroundCard: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  card2: {
    transform: [{ scale: 0.95 }, { translateY: 8 }],
    zIndex: 2,
    opacity: 0.8,
  },
  card3: {
    transform: [{ scale: 0.9 }, { translateY: 16 }],
    zIndex: 1,
    opacity: 0.6,
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  hexagon: {
    position: "absolute",
    width: 24,
    height: 24,
    backgroundColor: "#E7EF8C",
    opacity: 0.3,
    borderRadius: 4,
    transform: [{ rotate: "45deg" }],
  },
});
