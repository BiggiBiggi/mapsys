"use client";

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../../api-config";

function EquipmentsList() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const loadEquipments = async () => {
      if (isMounted) {
        await fetchEquipments();
      }
    };

    loadEquipments();

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger, searchParams]);

  // Ajouter un useEffect pour détecter le paramètre refresh
  useEffect(() => {
    const refreshParam = searchParams.get("refresh");
    if (refreshParam) {
      console.log("🔄 Rafraîchissement forcé détecté");
      setRefreshTrigger((prev) => prev + 1);
      // Nettoyer l'URL après le rafraîchissement
      window.history.replaceState({}, "", "/admin/equipments");
    }
  }, [searchParams]);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      console.log("🔄 Chargement des équipements...");

      // Ajouter un paramètre de cache-busting pour éviter les problèmes de cache
      const timestamp = new Date().getTime();
      const response = await fetch(
        `${API_ENDPOINTS.equipements}?_=${timestamp}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📊 Données reçues:", data.length, "équipements");

      // Vérifier si nous avons des doublons d'ID
      const idCounts = {};
      data.forEach((eq) => {
        const id = eq.id_eqts || eq.ID || eq.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
      });

      console.log("🔍 Vérification des IDs:", idCounts);

      // Transformer les données pour l'affichage avec un index pour garantir l'unicité
      const formattedEquipments = data.map((eq, index) => {
        const id = eq.id_eqts || eq.ID || eq.id;
        return {
          ...eq,
          // Utiliser l'index comme partie de la clé pour garantir l'unicité
          uniqueKey: `eq-${id}-${index}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          equipmentType: "equipements",
          displayType: eq.type || "Non défini",
          id: id,
        };
      });

      setEquipments(formattedEquipments);
      setError(null);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des équipements:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshList = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDelete = async (equipment) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cet équipement ?")
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_ENDPOINTS.equipements}/${equipment.id_eqts}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur serveur: ${response.status} - ${errorText}`);
        throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
      }

      // Rafraîchir la liste au lieu de modifier l'état local
      refreshList();
      alert("Équipement supprimé avec succès");
    } catch (err) {
      console.error("Erreur complète:", err);
      alert(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  // Utiliser un Set pour stocker les IDs uniques déjà vus
  const seenIds = new Set();

  const filteredEquipments = equipments.filter((equipment) => {
    // Vérifier si cet équipement correspond aux critères de recherche et de filtre
    const matchesSearch =
      equipment.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.ip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.sn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.displayType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !typeFilter || equipment.type === typeFilter;

    // Si l'équipement correspond aux critères, vérifier s'il est un doublon
    if (matchesSearch && matchesType) {
      const id = equipment.id_eqts || equipment.id;

      // Si nous avons déjà vu cet ID, c'est un doublon
      if (seenIds.has(id)) {
        console.log("Doublon détecté:", id, equipment.nom);
        return false;
      }

      // Sinon, ajouter l'ID au Set et inclure l'équipement
      seenIds.add(id);
      return true;
    }

    return false;
  });

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des équipements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={fetchEquipments} className="btn-retry">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="equipments-list">
      <div className="page-header">
        <h1>Équipements</h1>
        <div className="header-actions">
          <button
            onClick={refreshList}
            className="btn-secondary"
            title="Rafraîchir la liste"
          >
            🔄 Rafraîchir
          </button>
          <Link to="/equipments/new" className="btn-primary">
            ➕ Nouvel équipement
          </Link>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher par nom, modèle, IP ou numéro de série..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Tous les types</option>
            <option value="PC Portable">PC Portable</option>
            <option value="PC Fixe">PC Fixe</option>
            <option value="Imprimante Copieur">Imprimante Copieur</option>
            <option value="Imprimante Support">Imprimante Support</option>
          </select>
        </div>
      </div>

      <div className="results-info">
        <p>{filteredEquipments.length} équipement(s) trouvé(s)</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Modèle</th>
              <th>Adresse IP</th>
              <th>Numéro de série</th>
              <th>ID GLPI</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipments.map((equipment) => (
              <tr key={equipment.uniqueKey}>
                <td>{equipment.nom || "N/A"}</td>
                <td>
                  <span
                    className={`type-badge ${equipment.displayType
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {equipment.displayType}
                  </span>
                </td>
                <td>{equipment.model || "N/A"}</td>
                <td>{equipment.ip || "N/A"}</td>
                <td>{equipment.sn || "N/A"}</td>
                <td>{equipment.id_glpi || "N/A"}</td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/equipments/${equipment.id_eqts}/edit?type=${equipment.equipmentType}`}
                      className="btn-edit"
                      title="Modifier"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(equipment)}
                      className="btn-delete"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEquipments.length === 0 && (
        <div className="no-results">
          <p>Aucun équipement trouvé</p>
          {(searchTerm || typeFilter) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("");
              }}
              className="btn-clear-filters"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default EquipmentsList;
