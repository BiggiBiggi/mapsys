// Configuration centralisée des APIs pour le frontend
const API_BASE_URL = "http://localhost:5000/api";

// Import des images pour les types d'appareils
import pcPortable from "/src/assets/images/PCPortable.png";
import pcFixe from "/src/assets/images/PCFixe.png";
import imprimanteSupport from "/src/assets/images/ImpSupport.png";
import imprimanteCopieur from "/src/assets/images/impCopieur.png";

// Configuration des types d'appareils
export const deviceTypes = [
  {
    id: "pcPortable",
    name: "PC Portable",
    icon: pcPortable,
    table: "equipements",
    dbType: "PC Portable", // Valeur exacte dans la colonne 'type' de la DB
  },
  {
    id: "pcFixe",
    name: "PC Fixe",
    icon: pcFixe,
    table: "equipements",
    dbType: "PC Fixe",
  },
  {
    id: "imprimanteSupport",
    name: "Imprimante Support",
    icon: imprimanteSupport,
    table: "equipements",
    dbType: "Imprimante Support",
  },
  {
    id: "imprimanteCopieur",
    name: "Imprimante Copieur",
    icon: imprimanteCopieur,
    table: "equipements",
    dbType: "Imprimante Copieur",
  },
];

// Configuration correcte des endpoints basée sur la structure de la base de données
export const API_ENDPOINTS = {
  // Tous les types d'équipements utilisent la même table "equipements"
  equipements: `${API_BASE_URL}/equipements`,
  // Les routes spécifiques pour filtrer par type
  pc_portables: `${API_BASE_URL}/equipements/type/PC%20Portable`,
  pc_fixes: `${API_BASE_URL}/equipements/type/PC%20Fixe`,
  imprimantes_copieurs: `${API_BASE_URL}/equipements/type/Imprimante%20Copieur`,
  imprimantes_support: `${API_BASE_URL}/equipements/type/Imprimante%20Support`,
  // Autres endpoints
  positionne: `${API_BASE_URL}/positionne`,
  lieux: `${API_BASE_URL}/lieux`,
};

// Exporter la constante API_BASE_URL pour l'utiliser ailleurs
export { API_BASE_URL };

// Fonction utilitaire pour vérifier si une API est disponible
export async function checkApiAvailability(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`API non disponible: ${url}`, error);
    return false;
  }
}

// Fonction pour récupérer les appareils d'un type spécifique
export async function fetchDevicesByType(type) {
  const deviceType = deviceTypes.find((t) => t.id === type);
  if (!deviceType) return [];

  try {
    const response = await fetch(
      `${API_BASE_URL}/${deviceType.table}/type/${encodeURIComponent(
        deviceType.dbType
      )}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des appareils de type ${type}:`,
      error
    );
    return [];
  }
}

// Fonction pour récupérer les détails d'un appareil
export async function fetchDeviceDetails(deviceId, deviceType) {
  try {
    if (!deviceId || !deviceType) {
      console.warn("fetchDeviceDetails: deviceId ou deviceType manquant");
      return null;
    }

    const type = deviceTypes.find((t) => t.id === deviceType);
    if (!type) {
      console.warn(
        `fetchDeviceDetails: Type non trouvé pour deviceType: ${deviceType}`
      );
      return null;
    }

    const url = `${API_BASE_URL}/${type.table}/${deviceId}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status} for URL: ${url}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'appareil:",
      error
    );
    throw error;
  }
}

// Fonction pour récupérer les appareils déjà positionnés
export async function fetchPositionedDevices() {
  try {
    const response = await fetch(`${API_BASE_URL}/positionne`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("📍 Positioned devices fetched:", data);
    return data.map((item) => item.id_eqts); // Retourner seulement les IDs
  } catch (error) {
    console.error("❌ Error fetching positioned devices:", error);
    return [];
  }
}

// Fonction pour enregistrer la position d'un appareil
export async function saveDevicePosition(deviceId, planId) {
  try {
    // Vérifier si l'ID est valide
    if (!deviceId) {
      console.error("❌ Invalid device ID for positioning");
      return false;
    }

    console.log(`📍 Attempting to save position for device ID: ${deviceId}`);

    // Structure adaptée à l'API
    const positionData = {
      id_eqts: deviceId,
      id_poste_de_travail: planId, // Sera utilisé comme "id" dans la table
    };

    console.log("📦 Position data to send:", positionData);

    const response = await fetch(`${API_BASE_URL}/positionne`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(positionData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Server error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`✅ Device ${deviceId} marked as positioned`);
    return true;
  } catch (error) {
    console.error("❌ Error saving device position:", error);
    return false;
  }
}

// Fonction pour libérer un appareil (le retirer de la table positionne)
export async function removeDevicePosition(deviceId) {
  try {
    const response = await fetch(`${API_BASE_URL}/positionne/${deviceId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`✅ Device ${deviceId} position removed`);
    return true;
  } catch (error) {
    console.error("❌ Error removing device position:", error);
    return false;
  }
}

// Fonction utilitaire pour ajouter un paramètre anti-cache aux requêtes
export function addCacheBuster(url) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_=${Date.now()}`;
}
