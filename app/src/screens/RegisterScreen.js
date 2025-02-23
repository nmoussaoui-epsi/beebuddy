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
import DateTimePicker from "@react-native-community/datetimepicker";
import { register } from "../services/authService";

const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [dateDeNaissance, setDateDeNaissance] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [role, setRole] = useState("client");

  const handleRegister = async () => {
    try {
      if (!nom || !prenom || !email || !motDePasse) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
        return;
      }

      const formattedDate = dateDeNaissance.toISOString().split("T")[0];

      await register(
        nom,
        prenom,
        email,
        motDePasse,
        formattedDate,
        null, // adresse
        null, // ville
        null, // codePostal
        role
      );
      Alert.alert(
        "Inscription réussie",
        "Vous pouvez maintenant vous connecter."
      );
      navigation.navigate("Login");
    } catch (error) {
      console.log("🔥 Erreur Inscription :", error.response?.data || error);
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Inscription échouée."
      );
    }
  };

  const onChangeDateNaissance = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateDeNaissance(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR");
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
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoignez notre communauté et découvrez tous nos services.
            </Text>
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Nom</Text>
              <TextInput
                placeholder="Votre nom"
                value={nom}
                onChangeText={setNom}
                style={styles.inputField}
                autoCapitalize="words"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Prénom</Text>
              <TextInput
                placeholder="Votre prénom"
                value={prenom}
                onChangeText={setPrenom}
                style={styles.inputField}
                autoCapitalize="words"
              />
            </View>
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

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date de naissance</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                {formatDate(dateDeNaissance)}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dateDeNaissance}
              mode="date"
              display="default"
              onChange={onChangeDateNaissance}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          )}

          <TouchableOpacity
            onPress={handleRegister}
            style={styles.signInButton}
          >
            <Text style={styles.signInButtonText}>S'inscrire</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>
              Déjà un compte ? Connectez-vous
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
  logo: {
    width: "100%",
    height: "100%",
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  halfWidth: {
    width: "48%",
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
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 14,
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
  dateButton: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 7,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  dateButtonText: {
    fontSize: 14,
    color: "#000",
  },
};

export default RegisterScreen;
