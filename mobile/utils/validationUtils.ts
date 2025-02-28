import { isValidDateFormat, parseDate, isAtLeast18YearsOld } from "./dateUtils";

export type ValidationResult = {
  isValid: boolean;
  errorMessage?: string;
};

/**
 * Vérifie si un email est valide
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, errorMessage: "L'email est obligatoire" };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: "Veuillez entrer une adresse email valide",
    };
  }

  return { isValid: true };
};

/**
 * Vérifie si un mot de passe est valide
 */
export const validatePassword = (
  password: string,
  confirmPassword?: string
): ValidationResult => {
  if (!password) {
    return { isValid: false, errorMessage: "Le mot de passe est obligatoire" };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      errorMessage: "Le mot de passe doit contenir au moins 6 caractères",
    };
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    return {
      isValid: false,
      errorMessage: "Les mots de passe ne correspondent pas",
    };
  }

  return { isValid: true };
};

/**
 * Vérifie si une date de naissance est valide et si l'utilisateur a plus de 18 ans
 */
export const validateBirthDate = (dateString: string): ValidationResult => {
  if (!dateString) {
    return {
      isValid: false,
      errorMessage: "La date de naissance est obligatoire",
    };
  }

  if (!isValidDateFormat(dateString)) {
    return {
      isValid: false,
      errorMessage: "Format de date invalide. Utilisez le format JJ/MM/AAAA",
    };
  }

  const date = parseDate(dateString);
  if (!date) {
    return { isValid: false, errorMessage: "Date de naissance invalide" };
  }

  if (!isAtLeast18YearsOld(date)) {
    return {
      isValid: false,
      errorMessage: "Vous devez avoir au moins 18 ans pour vous inscrire",
    };
  }

  return { isValid: true };
};

/**
 * Vérifie si un nom ou prénom est valide
 */
export const validateName = (
  name: string,
  fieldName: string
): ValidationResult => {
  if (!name) {
    return { isValid: false, errorMessage: `Le ${fieldName} est obligatoire` };
  }

  return { isValid: true };
};

/**
 * Valide le formulaire d'inscription complet
 */
export const validateRegistrationForm = (formData: {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  confirmMotDePasse: string;
  dateDeNaissance: string;
}): ValidationResult => {
  const nomValidation = validateName(formData.nom, "nom");
  if (!nomValidation.isValid) return nomValidation;

  const prenomValidation = validateName(formData.prenom, "prénom");
  if (!prenomValidation.isValid) return prenomValidation;

  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) return emailValidation;

  const passwordValidation = validatePassword(
    formData.motDePasse,
    formData.confirmMotDePasse
  );
  if (!passwordValidation.isValid) return passwordValidation;

  const birthDateValidation = validateBirthDate(formData.dateDeNaissance);
  if (!birthDateValidation.isValid) return birthDateValidation;

  return { isValid: true };
};
