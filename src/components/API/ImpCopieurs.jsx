import { useState, useEffect } from "react";
import axios from "axios";

function ImpCopieurs() {
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

  return (
    <div>
      <h1>Liste des Imprimantes Copieurs</h1>
      <table>
        <thead>
          <tr>
            <th>Nom_IMP_Serveur</th>
            <th>Lieux</th>
            <th>Model</th>
            <th>Adresse_IP</th>
            <th>SN</th>
            <th>Type_Edition</th>
            <th>Nom_Infolog</th>
          </tr>
        </thead>
        <tbody>
          {impCopieurs.map((imp, index) => (
            <tr key={index}>
              <td>{imp.Nom_IMP_Serveur}</td>
              <td>{imp.Lieux}</td>
              <td>{imp.Model}</td>
              <td>{imp.Adresse_IP}</td>
              <td>{imp.SN}</td>
              <td>{imp.Type_Edition}</td>
              <td>{imp.Nom_Infolog}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImpCopieurs;
