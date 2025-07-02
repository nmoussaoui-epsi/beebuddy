import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erreur", "Veuillez entrer un email valide");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) {
      Alert.alert("Erreur d'inscription", error.message);
    } else {
      Alert.alert(
        "Inscription réussie !",
        "Vérifiez votre email pour confirmer votre compte.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(auth)/signin"),
          },
        ]
      );
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Rejoignez BeeBuddy"
      subtitle="Trouvez des missions ou des talents en quelques swipes."
    >
      <View style={styles.form}>
        <Input
          placeholder="Entrez votre email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.tabIconDefault}
            />
          }
        />

        <Input
          placeholder="Créez un mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          icon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={colors.tabIconDefault}
              />
            </TouchableOpacity>
          }
        />

        <Input
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          icon={
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={colors.tabIconDefault}
              />
            </TouchableOpacity>
          }
        />

        <Button
          title="Créer mon compte"
          onPress={handleSignUp}
          loading={loading}
          style={styles.signUpButton}
        />

        <View style={styles.divider}>
          <View
            style={[
              styles.dividerLine,
              { backgroundColor: colors.tabIconDefault },
            ]}
          />
          <Text style={[styles.dividerText, { color: colors.tabIconDefault }]}>
            ou
          </Text>
          <View
            style={[
              styles.dividerLine,
              { backgroundColor: colors.tabIconDefault },
            ]}
          />
        </View>

        <Button
          title="Continuer avec Google"
          onPress={() => {}}
          variant="disabled"
          style={styles.googleButton}
          badge="Bientôt disponible"
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.tabIconDefault }]}>
            Déjà un compte ?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/signin")}>
            <Text style={[styles.linkText, { color: colors.tint }]}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.terms, { color: colors.tabIconDefault }]}>
          En créant un compte, vous acceptez nos{" "}
          <Text style={{ color: colors.tint }}>
            Conditions d&apos;utilisation
          </Text>{" "}
          et notre{" "}
          <Text style={{ color: colors.tint }}>
            Politique de confidentialité
          </Text>
        </Text>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 8,
  },
  signUpButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
  },
  terms: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
});
