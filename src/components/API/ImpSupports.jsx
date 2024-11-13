import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ImpSupports.module.scss";

function ImpSupports({
  id,
  showNomImp = false,
  showSN = false,
  showID = false,
  showIP = false,
  showModel = false,
}) {
  const [ImpSupports, setImpSupports] = useState([]);

  useEffect(() => {
    // Faire une requête GET à l'API pour récupérer les imprimantes
    axios
      .get("http://localhost:5000/api/imp_support")
      .then((response) => {
        setImpSupports(response.data); // Mettre à jour l'état avec les données reçues
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des imprimantes:", error);
      });
  }, []);

  const filteredImpSup = ImpSupports.filter((imp) => imp.id === id);

  return (
    <div className={`${styles.container}`}>
      <h3>Détail de l&apos;imprimante support :</h3>
      <table>
        <tbody>
          {filteredImpSup.map((imp, index) => (
            <tr key={index}>
              <tr>
                {showNomImp && <th>Nom de l&apos;imprimante :</th>}{" "}
                {showNomImp && <td>{imp.Nom_IMP}</td>}
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
                {showModel && <th>Modèle :</th>}{" "}
                {showModel && <td>{imp.Type}</td>}
              </tr>

              <tr>
                {showID && <th>ID :</th>} {showID && <td>{imp.id}</td>}
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImpSupports;
