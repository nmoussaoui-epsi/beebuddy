import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { login } from "../services/authService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !motDePasse) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs");
        return;
      }

      await login(email, motDePasse);
      navigation.replace("Home");
    } catch (error) {
      console.log("Erreur Connexion :", error.response?.data || error);
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Connexion échouée."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Connexion à votre compte</Text>
            <Text style={styles.subtitle}>
              Commencez avec notre application, créez un compte et profitez de
              l'expérience.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="nom@email.com"
              value={email}
              onChangeText={setEmail}
              style={styles.inputField}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mot de passe</Text>
            <TextInput
              placeholder="Mot de passe"
              value={motDePasse}
              onChangeText={setMotDePasse}
              style={styles.inputField}
              secureTextEntry
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>
              Pas encore de compte ? Inscrivez-vous
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 11,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 11,
    backgroundColor: "#F8F8F8",
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#8B8E98",
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    color: "#8B8E98",
    fontWeight: "600",
    marginBottom: 5,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 7,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  signInButton: {
    backgroundColor: "#fcc700",
    height: 40,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerButton: {
    marginTop: 15,
    alignItems: "center",
  },
  registerText: {
    color: "#8B8E98",
    fontSize: 14,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
};

export default LoginScreen;
