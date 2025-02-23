import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const register = async (
  nom,
  prenom,
  email,
  motDePasse,
  dateDeNaissance,
  adresse,
  ville,
  codePostal,
  role
) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, {
    nom,
    prenom,
    email,
    motDePasse,
    dateDeNaissance,
    adresse,
    ville,
    codePostal,
    role,
  });
  return response.data;
};

export const login = async (email, motDePasse) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    motDePasse,
  });

  await AsyncStorage.setItem("token", response.data.token);
  return response.data;
};

export const getProfile = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;

  const response = await axios.get(`${API_URL}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const logout = async () => {
  const token = await AsyncStorage.getItem("token");

  await axios.post(
    `${API_URL}/api/auth/logout`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  await AsyncStorage.removeItem("token");
};
