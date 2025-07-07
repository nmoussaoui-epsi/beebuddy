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

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const categories = [
    { id: "bug", title: "Signaler un bug", icon: "bug-outline" },
    { id: "feature", title: "Demande de fonctionnalité", icon: "bulb-outline" },
    { id: "account", title: "Problème de compte", icon: "person-outline" },
    { id: "payment", title: "Question de facturation", icon: "card-outline" },
    {
      id: "safety",
      title: "Sécurité et confidentialité",
      icon: "shield-outline",
    },
    { id: "other", title: "Autre question", icon: "help-circle-outline" },
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !message.trim() || !email.trim()) {
      Alert.alert(
        "Champs manquants",
        "Veuillez remplir tous les champs requis."
      );
      return;
    }

    // Simulation d'envoi
    Alert.alert(
      "Message envoyé",
      "Votre demande a été transmise à notre équipe. Nous vous répondrons dans les plus brefs délais.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ebff56" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Support</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.description}>
          Besoin d&apos;aide ? Notre équipe est là pour vous accompagner.
          Décrivez votre problème et nous vous répondrons rapidement.
        </ThemedText>

        {/* FAQ Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Questions fréquentes
          </ThemedText>

          <TouchableOpacity style={styles.faqItem}>
            <View style={styles.faqContent}>
              <Ionicons name="help-circle-outline" size={20} color="#ebff56" />
              <ThemedText style={styles.faqQuestion}>
                Comment modifier mon profil ?
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem}>
            <View style={styles.faqContent}>
              <Ionicons name="help-circle-outline" size={20} color="#ebff56" />
              <ThemedText style={styles.faqQuestion}>
                Comment fonctionne le matching ?
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem}>
            <View style={styles.faqContent}>
              <Ionicons name="help-circle-outline" size={20} color="#ebff56" />
              <ThemedText style={styles.faqQuestion}>
                Que faire en cas de litige ?
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Contacter le support
          </ThemedText>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email de contact</ThemedText>
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

          {/* Category Selection */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Catégorie</ThemedText>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category.id &&
                      styles.categoryItemSelected,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color={
                      selectedCategory === category.id ? "#000" : "#ebff56"
                    }
                  />
                  <ThemedText
                    style={[
                      styles.categoryText,
                      selectedCategory === category.id &&
                        styles.categoryTextSelected,
                    ]}
                  >
                    {category.title}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Message Input */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Votre message</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder="Décrivez votre problème ou votre question en détail..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <ThemedText style={styles.submitButtonText}>
              Envoyer le message
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Autres moyens de contact
          </ThemedText>

          <TouchableOpacity style={styles.contactMethod}>
            <View style={styles.contactMethodContent}>
              <Ionicons name="mail-outline" size={24} color="#ebff56" />
              <View style={styles.contactMethodText}>
                <ThemedText style={styles.contactMethodTitle}>
                  Email direct
                </ThemedText>
                <ThemedText style={styles.contactMethodSubtitle}>
                  support@beebuddy.app
                </ThemedText>
              </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactMethod}>
            <View style={styles.contactMethodContent}>
              <Ionicons name="call-outline" size={24} color="#ebff56" />
              <View style={styles.contactMethodText}>
                <ThemedText style={styles.contactMethodTitle}>
                  Téléphone
                </ThemedText>
                <ThemedText style={styles.contactMethodSubtitle}>
                  +33 1 23 45 67 89
                </ThemedText>
              </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactMethod}>
            <View style={styles.contactMethodContent}>
              <Ionicons name="time-outline" size={24} color="#ebff56" />
              <View style={styles.contactMethodText}>
                <ThemedText style={styles.contactMethodTitle}>
                  Horaires
                </ThemedText>
                <ThemedText style={styles.contactMethodSubtitle}>
                  Lun-Ven 9h-18h
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Nous nous efforçons de répondre à toutes les demandes dans les 24
            heures.
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
    marginBottom: 16,
  },
  faqItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  faqContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  faqQuestion: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 12,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 8,
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
  submitButton: {
    backgroundColor: "#ebff56",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  contactMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  contactMethodContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contactMethodText: {
    marginLeft: 16,
    flex: 1,
  },
  contactMethodTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  contactMethodSubtitle: {
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
