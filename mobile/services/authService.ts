import { apiCall } from "./api";
import { convertToISODate } from "@/utils/dateUtils";

export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "client" | "freelance";
  token: string;
}

export interface LoginCredentials {
  email: string;
  motDePasse: string;
}

export interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  dateDeNaissance: string;
  adresse: string;
  ville: string;
  codePostal: string;
  role: "client" | "freelance";
}

export const loginUser = async (credentials: LoginCredentials) => {
  return apiCall<User>("/api/auth/login", "POST", credentials);
};

export const registerUser = async (userData: RegisterData) => {
  try {
    const isoDate = convertToISODate(userData.dateDeNaissance);

    if (!isoDate) {
      return { error: "Format de date invalide" };
    }

    const formattedData = {
      ...userData,
      dateDeNaissance: isoDate,
      adresse: userData.adresse || "À compléter",
      ville: userData.ville || "À compléter",
      codePostal: userData.codePostal || "00000",
    };

    return apiCall<User>("/api/auth/register", "POST", formattedData);
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Erreur de format de date: ${error.message}` };
    }
    return { error: "Une erreur est survenue" };
  }
};

export const logoutUser = async () => {
  return apiCall("/api/auth/logout", "POST");
};

export default {
  loginUser,
  registerUser,
  logoutUser,
};
