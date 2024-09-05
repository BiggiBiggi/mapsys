import { useState, useEffect } from "react";
import axios from "axios";

function ImpSupports() {
  const [impSupports, setImpSupports] = useState([]);

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

  return (
    <div>
      <h1>Liste des Imprimantes Support</h1>
      <table>
        <thead>
          <tr>
            <th>Nom_IMP</th>
            <th>Adresse_IP</th>
            <th>SN</th>
            <th>Lieux_Affectation</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {impSupports.map((imp, index) => (
            <tr key={index}>
              <td>{imp.Nom_IMP}</td>
              <td>{imp.Adresse_IP}</td>
              <td>{imp.SN}</td>
              <td>{imp.Lieux_Affectation}</td>
              <td>{imp.Type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImpSupports;
