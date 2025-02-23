import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { getProfile, logout } from "../services/authService";

const HomeScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (!data) {
          navigation.replace("Login");
          return;
        }
        setProfile(data);
      } catch (error) {
        console.log("Erreur Profile :", error.response?.data || error);
        Alert.alert(
          "Erreur",
          error.response?.data?.message || "Impossible de récupérer le profil."
        );
        navigation.replace("Login");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace("Login");
    } catch (error) {
      console.log("Erreur Déconnexion :", error.response?.data || error);
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Impossible de se déconnecter."
      );
    }
  };

  if (!profile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Bienvenue, {profile.user.nom} {profile.user.prenom}
      </Text>

      <Text>Email : {profile.user.email}</Text>
      <Text>Rôle : {profile.user.role}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Se Déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
};

export default HomeScreen;
