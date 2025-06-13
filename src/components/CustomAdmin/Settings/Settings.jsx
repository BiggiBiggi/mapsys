"use client";

import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    siteName: "Administration MapSys",
    siteDescription:
      "Interface d'administration pour la gestion des équipements",
    maintenanceMode: false,
    emailNotifications: true,
    autoBackup: true,
    backupFrequency: "daily",
    maxLoginAttempts: 5,
    sessionTimeout: 30,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulation de sauvegarde
      setTimeout(() => {
        setMessage("Paramètres sauvegardés avec succès !");
        setLoading(false);

        // Effacer le message après 3 secondes
        setTimeout(() => setMessage(""), 3000);
      }, 500);
    } catch (err) {
      setMessage("Erreur lors de la sauvegarde");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExportData = () => {
    // Simulation d'export
    const data = {
      equipments: "Données des équipements...",
      printers: "Données des imprimantes...",
      users: "Données des utilisateurs...",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setMessage("Données importées avec succès !");
          setTimeout(() => setMessage(""), 3000);
        } catch (err) {
          setMessage("Erreur lors de l'import du fichier");
          setTimeout(() => setMessage(""), 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="settings">
      <div className="page-header">
        <h1>Paramètres</h1>
      </div>

      {message && (
        <div
          className={`message ${
            message.includes("Erreur") ? "error" : "success"
          }`}
        >
          <p>{message}</p>
        </div>
      )}

      <div className="settings-container">
        {/* Paramètres généraux */}
        <div className="settings-section">
          <h2>Paramètres généraux</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="siteName">Nom du site</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="siteDescription">Description</label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sessionTimeout">
                  Timeout de session (minutes)
                </label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="form-input"
                  min="5"
                  max="120"
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxLoginAttempts">
                  Tentatives de connexion max
                </label>
                <input
                  type="number"
                  id="maxLoginAttempts"
                  name="maxLoginAttempts"
                  value={settings.maxLoginAttempts}
                  onChange={handleChange}
                  className="form-input"
                  min="3"
                  max="10"
                />
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                Mode maintenance
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                Notifications par email
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="autoBackup"
                  checked={settings.autoBackup}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                Sauvegarde automatique
              </label>
            </div>

            {settings.autoBackup && (
              <div className="form-group">
                <label htmlFor="backupFrequency">Fréquence de sauvegarde</label>
                <select
                  id="backupFrequency"
                  name="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="hourly">Toutes les heures</option>
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Sauvegarde..." : "Sauvegarder les paramètres"}
              </button>
            </div>
          </form>
        </div>

        {/* Sauvegarde et restauration */}
        <div className="settings-section">
          <h2>Sauvegarde et restauration</h2>
          <div className="backup-actions">
            <div className="backup-item">
              <h3>Exporter les données</h3>
              <p>Télécharger une sauvegarde complète de toutes les données</p>
              <button onClick={handleExportData} className="btn-secondary">
                📥 Exporter les données
              </button>
            </div>

            <div className="backup-item">
              <h3>Importer les données</h3>
              <p>Restaurer les données à partir d'un fichier de sauvegarde</p>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="file-input"
                id="import-file"
              />
              <label htmlFor="import-file" className="btn-secondary">
                📤 Importer les données
              </label>
            </div>
          </div>
        </div>

        {/* Informations système */}
        <div className="settings-section">
          <h2>Informations système</h2>
          <div className="system-info">
            <div className="info-item">
              <span className="info-label">Version :</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Base de données :</span>
              <span className="info-value">MySQL 8.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Serveur :</span>
              <span className="info-value">Apache 2.4</span>
            </div>
            <div className="info-item">
              <span className="info-label">PHP :</span>
              <span className="info-value">8.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
