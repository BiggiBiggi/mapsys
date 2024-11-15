import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ImpCopieurs.module.scss";

function ImpCopieurs({
  id,
  showNomImp = false,
  showSN = false,
  showID = false,
  showIP = false,
  showNomInf = false,
  showModel = false,
}) {
  const [impCopieurs, setImpCopieurs] = useState([]);

  useEffect(() => {
    // Faire une requête GET à l'API pour récupérer les imprimantes
    axios
      .get("http://localhost:5000/api/imp_copieurs")
      .then((response) => {
        setImpCopieurs(response.data); // Mettre à jour l'état avec les données reçues
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des imprimantes:", error);
      });
  }, []);

  const filteredImp = impCopieurs.filter((imp) => imp.id === id);

  return (
    <div className={`${styles.container}`}>
      <h3>Détail de l&apos;imprimante :</h3>
      <table>
        <tbody>
          {filteredImp.map((imp, index) => (
            <tr key={index}>
              <tr>
                {showNomImp && <th>Nom IMP Serveur :</th>}{" "}
                {showNomImp && <td>{imp.NomImpServeur}</td>}
              </tr>
              <tr>
                {showModel && <th>Modèle :</th>}{" "}
                {showModel && <td>{imp.Model}</td>}
              </tr>
              <tr>
                {showIP && <th>Adresse IP :</th>}{" "}
                {showIP && <td>{imp.AdresseIp}</td>}
              </tr>
              <tr>
                {showSN && <th>Numéro de Serie :</th>}{" "}
                {showSN && <td>{imp.SN}</td>}
              </tr>
              <tr>
                {showNomInf && <th>Nom Infolog :</th>}{" "}
                {showNomInf && <td>{imp.NomInfolog}</td>}
              </tr>
              <tr>
                {showID && <th>ID :</th>} {showID && <td>{imp.Id}</td>}
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImpCopieurs;
