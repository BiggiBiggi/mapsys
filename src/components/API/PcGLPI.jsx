import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PcGLPI.module.scss";

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
    // Faire une requête GET à l'API pour récupérer tous les PC
    axios
      .get("http://localhost:5000/api/pc_glpi")
      .then((response) => {
        setPcGLPI(response.data); // Mettre à jour l'état avec les données reçues
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des PCs:", error);
      });
  }, []);

  // Filtrer pour n'afficher que le PC avec l'ID spécifié
  const filteredPC = pcGLPI.filter((pc) => pc.ID_GLPI === id);

  return (
    <div className={`${styles.container}`}>
      <h3>Détails du PC :</h3>
      <table>
        <tbody>
          {filteredPC.map((pc, index) => (
            <tr key={index}>
              <tr>
                {showNom && <th>Nom du PC :</th>}{" "}
                {showNom && <td>{pc.Nom_PC}</td>}
              </tr>
              <tr>
                {showSN && <th>Numéro de Série :</th>}{" "}
                {showSN && <td>{pc.SN}</td>}
              </tr>
              <tr>
                {showIpWifi && <th>IP Wifi :</th>}{" "}
                {showIpWifi && <td>{pc.IP_Wifi}</td>}
              </tr>
              <tr>
                {showIpFilaire && <th>Ip Filaire :</th>}{" "}
                {showIpFilaire && <td>{pc.IP_Filaire}</td>}
              </tr>
              <tr>
                {showID && <th>ID GLPI :</th>} {showID && <td>{pc.ID_GLPI}</td>}
              </tr>
              <tr>
                {showPrise && <th>Prise :</th>}{" "}
                {showPrise && <td>{pc.Prise}</td>}
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PcGLPI;
