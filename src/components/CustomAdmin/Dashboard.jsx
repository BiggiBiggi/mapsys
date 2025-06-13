"use client";

import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../api-config";

function Dashboard() {
  const [stats, setStats] = useState({
    equipments: 0,
    printers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  // Remplacer la fonction fetchStats par cette version améliorée qui utilise un Set pour éviter les doublons

  const fetchStats = async () => {
    try {
      // Récupérer tous les équipements
      const equipmentsRes = await fetch(API_ENDPOINTS.equipements);

      if (equipmentsRes.ok) {
        const allEquipments = await equipmentsRes.json();

        // Utiliser des Sets pour stocker les IDs uniques par type
        const pcIds = new Set();
        const printerIds = new Set();

        allEquipments.forEach((eq) => {
          const id = eq.id_eqts || eq.ID || eq.id;

          if (eq.type === "PC Portable" || eq.type === "PC Fixe") {
            pcIds.add(id);
          } else if (
            eq.type === "Imprimante Copieur" ||
            eq.type === "Imprimante Support"
          ) {
            printerIds.add(id);
          }
        });

        console.log("Dashboard stats - PC uniques:", pcIds.size);
        console.log("Dashboard stats - Imprimantes uniques:", printerIds.size);

        setStats({
          equipments: pcIds.size,
          printers: printerIds.size,
        });
      } else {
        console.error("Erreur lors du chargement des équipements");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <p>Vue d'ensemble de votre système de gestion d'équipements</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <div className="stat-content">
            <h3>PC (Portables & Fixes)</h3>
            <p className="stat-number">{stats.equipments}</p>
            <p className="stat-label">Ordinateurs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🖨️</div>
          <div className="stat-content">
            <h3>Imprimantes</h3>
            <p className="stat-number">{stats.printers}</p>
            <p className="stat-label">Copieurs & Support</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <h2>Actions rapides</h2>
        <div className="action-buttons">
          <button
            className="action-btn primary"
            onClick={() => (window.location.href = "/admin/equipments/new")}
          >
            ➕ Ajouter un équipement
          </button>
          <button
            className="action-btn secondary"
            onClick={() => (window.location.href = "/admin/equipments")}
          >
            📋 Voir tous les équipements
          </button>
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h3>🚀 Fonctionnalités disponibles</h3>
          <ul>
            <li>Gestion complète des équipements informatiques</li>
            <li>Ajout, modification et suppression d'éléments</li>
            <li>Recherche et filtrage avancés</li>
            <li>Interface responsive et intuitive</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
