import ENV from "../env";

// API URL configuration
const API_URL = ENV.API_URL;
const FALLBACK_URL = "http://192.168.1.42:5000";
const BASE_URL = API_URL || FALLBACK_URL;

// Log once at startup for debugging purposes
console.log("🚀 API URL: ", BASE_URL);

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Fonction pour masquer les données sensibles dans les logs
const sanitizeLogData = (data: any): any => {
  if (!data) return data;

  const sensitiveFields = [
    "motDePasse",
    "password",
    "confirmMotDePasse",
    "token",
  ];

  if (typeof data === "object") {
    const sanitized = { ...data };

    sensitiveFields.forEach((field) => {
      if (field in sanitized) {
        sanitized[field] = "********";
      }
    });

    return sanitized;
  }

  return data;
};

export async function apiCall<T>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT")) {
      config.body = JSON.stringify(body);

      // Les logs ne sont affichés qu'en développement
      if (__DEV__) {
        // On masque les données sensibles avant de les logger
        console.log(`📡 ${method} ${endpoint}`, sanitizeLogData(body));
      }
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'appel à l'API");
    }

    return { data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Une erreur est survenue";

    if (
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("Network request failed")
    ) {
      console.error("❌ Erreur de connexion à l'API:", url);
      console.error(
        "💡 Vérifiez que votre serveur API est en cours d'exécution et accessible"
      );
    }

    return { error: errorMessage };
  }
}

// Test API connectivity once at startup
(async function testApiConnection() {
  try {
    const response = await fetch(`${BASE_URL}/`);
    if (response.ok) {
      console.log("✅ Connexion à l'API réussie!");
    }
  } catch (err) {
    console.error("❌ Impossible de se connecter à l'API");
  }
})();

export default {
  apiCall,
  baseUrl: BASE_URL,
};
