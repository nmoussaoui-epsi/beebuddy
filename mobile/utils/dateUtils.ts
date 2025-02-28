/**
 * Vérifie si une date au format JJ/MM/AAAA est valide
 */
export const isValidDateFormat = (dateString: string): boolean => {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  return datePattern.test(dateString);
};

/**
 * Convertit une date au format JJ/MM/AAAA en objet Date
 */
export const parseDate = (dateString: string): Date | null => {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const dateMatch = dateString.match(datePattern);

  if (!dateMatch) return null;

  const day = parseInt(dateMatch[1], 10);
  const month = parseInt(dateMatch[2], 10) - 1;
  const year = parseInt(dateMatch[3], 10);

  const date = new Date(year, month, day);

  if (
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
};

/**
 * Vérifie si une personne a au moins 18 ans
 */
export const isAtLeast18YearsOld = (date: Date): boolean => {
  const today = new Date();
  const birthDate = new Date(date);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

/**
 * Format automatiquement la saisie d'une date au format JJ/MM/AAAA
 */
export const formatDateInput = (text: string): string => {
  const cleaned = text.replace(/[^\d]/g, "");

  const limited = cleaned.substring(0, 8);

  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 4) {
    return `${limited.substring(0, 2)}/${limited.substring(2)}`;
  } else {
    return `${limited.substring(0, 2)}/${limited.substring(
      2,
      4
    )}/${limited.substring(4)}`;
  }
};

/**
 * Convertit une date au format JJ/MM/AAAA en format ISO
 */
export const convertToISODate = (dateString: string): string | null => {
  const date = parseDate(dateString);
  if (!date) return null;
  return date.toISOString();
};
