import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PingIp.module.scss";

function OfflineIPs() {
  const [offlineDevices, setOfflineDevices] = useState([]); // Initialisation avec un tableau vide

  useEffect(() => {
    async function fetchOfflineDevices() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/offline-ips"
        );

        // Vérification de la structure des données avant de les utiliser
        if (response.data && Array.isArray(response.data.offlineDevices)) {
          setOfflineDevices(response.data.offlineDevices); // Utiliser la bonne clé
        } else {
          console.error("Structure des données incorrecte :", response.data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des IPs hors ligne :",
          error
        );
      }
    }

    // Mettre à jour toutes les 10 secondes
    const intervalId = setInterval(fetchOfflineDevices, 10000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${styles.IpContainer} p-10 d-flex flex-column center`}>
      <h2 className={`mb-10`}>
        <strong>!!! ALERTES KO !!!</strong>
      </h2>
      <ul>
        {/* Vérifier si offlineDevices est un tableau non vide */}
        {offlineDevices.length === 0 ? (
          <li>Aucune imprimante KO</li>
        ) : (
          offlineDevices.map((device, index) => (
            <li key={index}>
              L&apos;imprimante <strong>{device.name}</strong> avec l&apos;IP{" "}
              <strong>{device.ip}</strong> n&apos;est pas remontée.
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default OfflineIPs;
