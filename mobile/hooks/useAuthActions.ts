import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import authService, {
  LoginCredentials,
  RegisterData,
} from "@/services/authService";
import { validateEmail, validatePassword } from "@/utils/validationUtils";

export function useAuthActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login: contextLogin } = useAuth();

  const login = async (credentials: LoginCredentials) => {
    const emailValidation = validateEmail(credentials.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.errorMessage || "Email invalide");
      return false;
    }

    const passwordValidation = validatePassword(credentials.motDePasse);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errorMessage || "Mot de passe invalide");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: apiError } = await authService.loginUser(
        credentials
      );

      if (apiError) {
        throw new Error(apiError);
      }

      if (data) {
        await contextLogin(data);

        router.replace("/(tabs)");
        return true;
      }

      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    setError("");

    try {
      const { data, error: apiError } = await authService.registerUser(
        userData
      );

      if (apiError) {
        throw new Error(apiError);
      }

      router.replace("/(auth)/login");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
    setError,
  };
}
