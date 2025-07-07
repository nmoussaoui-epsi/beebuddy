import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Feedback() {
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const categories = [
    {
      id: "ui",
      title: "Interface utilisateur",
      icon: "phone-portrait-outline",
    },
    { id: "features", title: "Fonctionnalités", icon: "settings-outline" },
    { id: "performance", title: "Performance", icon: "speedometer-outline" },
    { id: "matching", title: "Système de matching", icon: "heart-outline" },
    { id: "messaging", title: "Messagerie", icon: "chatbubble-outline" },
    { id: "general", title: "Expérience générale", icon: "star-outline" },
  ];

  const handleSubmit = () => {
    if (rating === 0 || !category || !feedback.trim()) {
      Alert.alert(
        "Champs manquants",
        "Veuillez remplir tous les champs requis."
      );
      return;
    }

    // Simulation d&apos;envoi
    Alert.alert(
      "Merci !",
      "Votre avis a été envoyé. Il nous aide à améliorer BeeBuddy pour tous les utilisateurs.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={32}
              color={star <= rating ? "#ebff56" : "#666"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getRatingText = () => {
    switch (rating) {
      case 1:
        return "Très insatisfait";
      case 2:
        return "Insatisfait";
      case 3:
        return "Neutre";
      case 4:
        return "Satisfait";
      case 5:
        return "Très satisfait";
      default:
        return "Sélectionnez une note";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ebff56" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Votre avis</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.description}>
          Votre opinion compte ! Aidez-nous à améliorer BeeBuddy en partageant
          votre expérience et vos suggestions.
        </ThemedText>

        {/* Rating Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Note globale</ThemedText>
          <ThemedText style={styles.ratingSubtitle}>
            Comment évaluez-vous votre expérience avec BeeBuddy ?
          </ThemedText>

          {renderStars()}

          <ThemedText style={styles.ratingText}>{getRatingText()}</ThemedText>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Domaine d&apos;évaluation
          </ThemedText>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryItem,
                  category === cat.id && styles.categoryItemSelected,
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={20}
                  color={category === cat.id ? "#000" : "#ebff56"}
                />
                <ThemedText
                  style={[
                    styles.categoryText,
                    category === cat.id && styles.categoryTextSelected,
                  ]}
                >
                  {cat.title}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback Text */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Vos commentaires</ThemedText>
          <ThemedText style={styles.inputSubtitle}>
            Partagez vos impressions, suggestions d&apos;amélioration ou
            problèmes rencontrés
          </ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Décrivez votre expérience, ce qui vous a plu ou ce qui pourrait être amélioré..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Optional Email */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Contact (optionnel)
          </ThemedText>
          <ThemedText style={styles.inputSubtitle}>
            Si vous souhaitez que nous vous recontactions concernant votre avis
          </ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="votre.email@example.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons
            name="send"
            size={20}
            color="#000"
            style={styles.submitIcon}
          />
          <ThemedText style={styles.submitButtonText}>
            Envoyer mon avis
          </ThemedText>
        </TouchableOpacity>

        {/* Encouragement */}
        <View style={styles.encouragementSection}>
          <View style={styles.encouragementCard}>
            <Ionicons name="heart" size={24} color="#ebff56" />
            <ThemedText style={styles.encouragementTitle}>
              Merci de nous aider !
            </ThemedText>
            <ThemedText style={styles.encouragementText}>
              Chaque avis nous aide à créer une meilleure expérience pour tous
              les utilisateurs de BeeBuddy.
            </ThemedText>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Actions rapides</ThemedText>

          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionContent}>
              <Ionicons name="star-outline" size={24} color="#ebff56" />
              <View style={styles.quickActionText}>
                <ThemedText style={styles.quickActionTitle}>
                  Noter sur les stores
                </ThemedText>
                <ThemedText style={styles.quickActionSubtitle}>
                  App Store / Google Play
                </ThemedText>
              </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionContent}>
              <Ionicons name="share-outline" size={24} color="#ebff56" />
              <View style={styles.quickActionText}>
                <ThemedText style={styles.quickActionTitle}>
                  Recommander BeeBuddy
                </ThemedText>
                <ThemedText style={styles.quickActionSubtitle}>
                  Partager avec vos contacts
                </ThemedText>
              </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Votre avis est anonyme et confidentiel. Nous l&apos;utilisons
            uniquement pour améliorer nos services.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ddd",
    marginTop: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ebff56",
    marginBottom: 8,
  },
  ratingSubtitle: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 20,
  },
  inputSubtitle: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  starButton: {
    padding: 8,
  },
  ratingText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    minWidth: "48%",
  },
  categoryItemSelected: {
    backgroundColor: "#ebff56",
    borderColor: "#ebff56",
  },
  categoryText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 8,
    flex: 1,
  },
  categoryTextSelected: {
    color: "#000",
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  submitButton: {
    backgroundColor: "#ebff56",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  encouragementSection: {
    marginBottom: 32,
  },
  encouragementCard: {
    backgroundColor: "#2a2a2a",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  encouragementTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 12,
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    lineHeight: 20,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  quickActionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  quickActionText: {
    marginLeft: 16,
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },
  footer: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    fontStyle: "italic",
  },
});
