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

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      Alert.alert("Erreur de connexion", error.message);
    } else {
      router.replace("/(tabs)");
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Bon retour !"
      subtitle="Connectez-vous pour reprendre vos échanges et vos opportunités."
      compact={true}
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
          placeholder="Entrez votre mot de passe"
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

        <Button
          title="Se connecter"
          onPress={handleSignIn}
          loading={loading}
          style={styles.signInButton}
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
            Pas encore de compte ?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
            <Text style={[styles.linkText, { color: colors.tint }]}>
              Créer un compte
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 8,
  },
  signInButton: {
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
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
