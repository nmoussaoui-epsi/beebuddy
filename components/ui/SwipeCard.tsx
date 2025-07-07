import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { UserProfile } from "../../types/search";

const { width: screenWidth } = Dimensions.get("window");
const SWIPE_THRESHOLD = screenWidth * 0.3;

interface SwipeCardProps {
  user: UserProfile;
  onSwipe: (direction: "left" | "right") => void;
  userRole: "freelance" | "client";
  onDetailsPress?: () => void;
  isBackground?: boolean;
}

export function SwipeCard({
  user,
  onSwipe,
  userRole,
  onDetailsPress,
  isBackground = false,
}: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.9);

  // Animation d'entrée
  React.useEffect(() => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  }, [scale]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = event.translationX / 10;
    })
    .onEnd((event) => {
      const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;
      const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;

      if (shouldSwipeLeft) {
        translateX.value = withSpring(-screenWidth);
        opacity.value = withSpring(0);
        runOnJS(onSwipe)("left");
      } else if (shouldSwipeRight) {
        translateX.value = withSpring(screenWidth);
        opacity.value = withSpring(0);
        runOnJS(onSwipe)("right");
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const handleDetailsPress = () => {
    if (onDetailsPress) {
      onDetailsPress();
    } else {
      // Action par défaut: log des détails
      console.log("Détails du profil:", user);
    }
  };

  const handleButtonSwipe = (direction: "left" | "right") => {
    translateX.value = withSpring(
      direction === "left" ? -screenWidth : screenWidth
    );
    opacity.value = withSpring(0);
    onSwipe(direction);
  };

  const getMainTitle = () => {
    if (user.role === "freelance" && user.cv) {
      return user.cv.skills?.[0] || "Freelancer";
    }
    if (user.role === "client" && user.projects?.[0]) {
      return user.projects[0].title;
    }
    return user.role === "freelance" ? "Freelancer" : "Client";
  };

  const getSubtitle = () => {
    if (user.role === "freelance" && user.cv) {
      return user.cv.experience ? "Expérimenté" : "Débutant";
    }
    if (user.role === "client") {
      return "Recherche un freelancer";
    }
    return "";
  };

  const getSalaryOrBudget = () => {
    if (user.role === "freelance" && user.cv?.expected_salary) {
      return `${user.cv.expected_salary}€ / mois`;
    }
    if (user.role === "client" && user.projects?.[0]?.budget) {
      return `Budget: ${user.projects[0].budget}€`;
    }
    return "Prix à négocier";
  };

  const getTags = () => {
    const tags = [];

    if (user.role === "freelance" && user.cv) {
      // Ajouter quelques compétences
      if (user.cv.skills?.length > 0) {
        tags.push(...user.cv.skills.slice(0, 3));
      }
    }

    if (user.role === "client" && user.projects?.[0]) {
      tags.push("Nouveau projet");
    }

    // Ajouter des tags par défaut si pas assez
    if (tags.length === 0) {
      tags.push(user.role === "freelance" ? "Freelance" : "Client");
    }

    return tags;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={isBackground ? Gesture.Pan() : gesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          {/* Header avec avatar et actions */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarContainer}>
              {user.avatar_url ? (
                <Image
                  source={{ uri: user.avatar_url }}
                  style={styles.avatar}
                  onError={() =>
                    console.log("Erreur chargement avatar:", user.avatar_url)
                  }
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                  </Text>
                </View>
              )}
            </View>
            {!isBackground && (
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="bookmark-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Informations principales */}
          <View style={styles.cardContent}>
            <Text style={styles.userName}>{user.full_name}</Text>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {getTags().map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.mainTitle}>{getMainTitle()}</Text>
            <Text style={styles.subtitle}>{getSubtitle()}</Text>
            <Text style={styles.salary}>{getSalaryOrBudget()}</Text>

            {/* Bouton voir détails (seulement pour la card principale) */}
            {!isBackground && (
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={handleDetailsPress}
              >
                <Text style={styles.detailsButtonText}>Voir les détails</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Boutons de swipe (seulement pour la card principale) */}
          {!isBackground && (
            <View style={styles.swipeButtons}>
              <TouchableOpacity
                style={[styles.swipeButton, styles.rejectButton]}
                onPress={() => handleButtonSwipe("left")}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.swipeButton, styles.likeButton]}
                onPress={() => handleButtonSwipe("right")}
              >
                <Ionicons name="heart" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DAFF00",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  headerActions: {
    flexDirection: "row",
    gap: 20,
  },
  actionButton: {
    padding: 8,
  },
  cardContent: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 11,
    color: "#000",
    fontWeight: "500",
  },
  mainTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 3,
  },
  salary: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: "#000000",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: "auto",
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  swipeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginTop: 16,
  },
  swipeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rejectButton: {
    backgroundColor: "#FF4458",
  },
  likeButton: {
    backgroundColor: "#66D876",
  },
});
