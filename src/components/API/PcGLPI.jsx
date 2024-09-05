import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PcGLPI.module.scss";

function PcGLPI({
  id,
  showNom = false,
  showUtilisateur = false,
  showSN = false,
  showLieu = false,
  showModel = false,
  showOS = false,
  showID = false,
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
                {showUtilisateur && <th>Utilisateur :</th>}{" "}
                {showUtilisateur && <td>{pc.User}</td>}
              </tr>
              <tr>
                {showSN && <th>Numéro de Série :</th>}{" "}
                {showSN && <td>{pc.SN}</td>}
              </tr>
              <tr>
                {showLieu && <th>Emplacement :</th>}{" "}
                {showLieu && <td>{pc.Lieu}</td>}
              </tr>
              <tr>
                {showModel && <th>Modèle du PC :</th>}{" "}
                {showModel && <td>{pc.Model}</td>}
              </tr>
              <tr>
                {showOS && <th>OS :</th>} {showOS && <td>{pc.OS}</td>}
              </tr>
              <tr>
                {showID && <th>ID GLPI :</th>} {showID && <td>{pc.ID_GLPI}</td>}
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PcGLPI;
