import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PcGLPI.module.scss";
import React from "react";

function PcGLPI({
  id,
  showNom = false,
  showSN = false,
  showID = false,
  showIpFilaire = false,
  showIpWifi = false,
  showPrise = false,
}) {
  const [pcGLPI, setPcGLPI] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pc_glpi")
      .then((response) => {
        setPcGLPI(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des PCs:", error);
      });
  }, []);

  const filteredPC = pcGLPI.filter((pc) => pc.ID_GLPI === id);

  return (
    <div className={styles.container}>
      <h3>Détails du PC :</h3>
      <div className={styles.pcTable}>
        {filteredPC.map((pc) => (
          <React.Fragment key={pc.ID_GLPI}>
            {showNom && (
              <div className={styles.row}>
                <span className={styles.label}>Nom du PC :</span>
                <span className={styles.value}>{pc.Nom_PC}</span>
              </div>
            )}
            {showSN && (
              <div className={styles.row}>
                <span className={styles.label}>Numéro de Série :</span>
                <span className={styles.value}>{pc.SN}</span>
              </div>
            )}
            {showIpWifi && (
              <div className={styles.row}>
                <span className={styles.label}>IP Wifi :</span>
                <span className={styles.value}>{pc.IP_Wifi}</span>
              </div>
            )}
            {showIpFilaire && (
              <div className={styles.row}>
                <span className={styles.label}>IP Filaire :</span>
                <span className={styles.value}>{pc.IP_Filaire}</span>
              </div>
            )}
            {showID && (
              <div className={styles.row}>
                <span className={styles.label}>ID GLPI :</span>
                <span className={styles.value}>{pc.ID_GLPI}</span>
              </div>
            )}
            {showPrise && (
              <div className={styles.row}>
                <span className={styles.label}>Prise :</span>
                <span className={styles.value}>{pc.Prise}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PcGLPI;
