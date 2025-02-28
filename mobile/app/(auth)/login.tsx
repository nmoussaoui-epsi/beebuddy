import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, BeeColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthActions } from "@/hooks/useAuthActions";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme() ?? "light";
  const { login, loading, error } = useAuthActions();

  const handleLogin = async () => {
    await login({ email, motDePasse: password });
  };

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ThemedView style={styles.container}>
          <Image
            source={require("@/assets/images/beebuddy-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.subtitle}>
            Connectez-vous à votre compte
          </ThemedText>

          {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor:
                  colorScheme === "dark"
                    ? BeeColors.darkGray
                    : BeeColors.lightGray,
              },
            ]}
            placeholder="Email"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].tabIconDefault,
                backgroundColor:
                  colorScheme === "dark"
                    ? BeeColors.darkGray
                    : BeeColors.lightGray,
              },
            ]}
            placeholder="Mot de passe"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? "Connexion..." : "Se connecter"}
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.registerContainer}>
            <ThemedText>Pas encore de compte ? </ThemedText>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <ThemedText style={styles.registerText}>S'inscrire</ThemedText>
              </TouchableOpacity>
            </Link>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: BeeColors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000000",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: BeeColors.primary,
    fontWeight: "bold",
  },
  error: {
    color: BeeColors.danger,
    textAlign: "center",
    marginBottom: 15,
  },
});
