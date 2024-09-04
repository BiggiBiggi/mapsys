import { useState, useEffect } from "react";
import axios from "axios";

function PcGLPI() {
  const [pcGLPI, setPcGLPI] = useState([]);

  useEffect(() => {
    // Faire une requête GET à l'API pour récupérer les imprimantes
    axios
      .get("http://localhost:5000/api/pc_glpi")
      .then((response) => {
        setPcGLPI(response.data); // Mettre à jour l'état avec les données reçues
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
            <th>Nom du PC</th>
            <th>Utilisateur</th>
            <th>Numéro de Série</th>
            <th>Modèle du PC</th>
            <th>Emplacement</th>
            <th>OS</th>
            <th>ID GLPI</th>
          </tr>
        </thead>
        <tbody>
          {pcGLPI.map((pc, index) => (
            <tr key={index}>
              <td>{pc.Nom_PC}</td>
              <td>{pc.Use}</td>
              <td>{pc.SN}</td>
              <td>{pc.Model}</td>
              <td>{pc.Lieu}</td>
              <td>{pc.OS}</td>
              <td>{pc.ID_GLPI}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PcGLPI;
