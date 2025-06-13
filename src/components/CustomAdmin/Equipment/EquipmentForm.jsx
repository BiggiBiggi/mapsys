"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../../api-config";

function EquipmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type");
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nom: "",
    type: "",
    model: "",
    sn: "",
    ip: "",
    prise: "",
    nom_infolog: "",
    id_glpi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const equipmentTypes = [
    { value: "PC Portable", label: "PC Portable", icon: "💻" },
    { value: "PC Fixe", label: "PC Fixe", icon: "💻" },
    { value: "Imprimante Copieur", label: "Imprimante Copieur", icon: "🖨️" },
    { value: "Imprimante Support", label: "Imprimante Support", icon: "🖨️" },
  ];

  useEffect(() => {
    if (isEdit) {
      fetchEquipment();
    }
  }, [id, isEdit]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.equipements}/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Équipement non trouvé: ${response.status} - ${errorText}`
        );
      }
      const data = await response.json();
      setFormData({
        nom: data.nom || "",
        type: data.type || "",
        model: data.model || "",
        sn: data.sn || "",
        ip: data.ip || "",
        prise: data.prise || "",
        nom_infolog: data.nom_infolog || "",
        id_glpi: data.id_glpi || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEdit
        ? `${API_ENDPOINTS.equipements}/${id}`
        : API_ENDPOINTS.equipements;

      const method = isEdit ? "PUT" : "POST";

      // Préparer les données en s'assurant que id_glpi n'est pas vide
      const dataToSend = {
        ...formData,
        id_eqts: isEdit ? Number.parseInt(id) : undefined, // S'assurer que l'ID est inclus pour les mises à jour
        id_glpi: formData.id_glpi || `GLPI-${Date.now()}`,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();

      // Forcer un rafraîchissement complet pour s'assurer que les modifications sont visibles
      navigate("/equipments?refresh=" + Date.now(), { replace: true });
    } catch (err) {
      setError(`Erreur lors de la sauvegarde: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading && isEdit) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de l'équipement...</p>
      </div>
    );
  }

  return (
    <div className="equipment-form">
      <div className="page-header">
        <h1>{isEdit ? "Modifier l'équipement" : "Nouvel équipement"}</h1>
        <button
          onClick={() => navigate("/equipments")}
          className="btn-secondary"
        >
          ← Retour à la liste
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nom">Nom de l'équipement *</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Ex: PC-BUREAU-01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Sélectionner un type</option>
              {equipmentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_glpi">ID GLPI</label>
            <input
              type="text"
              id="id_glpi"
              name="id_glpi"
              value={formData.id_glpi}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: GLPI-12345 (sera généré automatiquement si vide)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Modèle</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: Dell OptiPlex 7090"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sn">Numéro de série</label>
            <input
              type="text"
              id="sn"
              name="sn"
              value={formData.sn}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: ABC123456789"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ip">Adresse IP</label>
            <input
              type="text"
              id="ip"
              name="ip"
              value={formData.ip}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: 192.168.1.100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prise">Prise réseau</label>
            <input
              type="text"
              id="prise"
              name="prise"
              value={formData.prise}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: A-12"
            />
          </div>

          {formData.type === "Imprimante Copieur" && (
            <div className="form-group">
              <label htmlFor="nom_infolog">Nom Infolog</label>
              <input
                type="text"
                id="nom_infolog"
                name="nom_infolog"
                value={formData.nom_infolog}
                onChange={handleChange}
                className="form-input"
                placeholder="Ex: INFOLOG-IMP-01"
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/equipments")}
            className="btn-secondary"
            disabled={loading}
          >
            Annuler
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sauvegarde..." : isEdit ? "Modifier" : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EquipmentForm;
