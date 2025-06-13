"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api-config";

// Ajout des styles Tailwind pour le formulaire
const formStyles = `
  .form-container {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    border: 1px solid #e5e7eb;
  }

  .form-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .form-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .form-input,
  .form-select {
    padding: 0.625rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #1f2937;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }

  .form-input::placeholder {
    color: #9ca3af;
  }

  .form-help {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  .form-checkbox-wrapper {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }

  .form-checkbox {
    width: 1rem;
    height: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #d1d5db;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  .form-checkbox:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }

  .form-checkbox-label {
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .btn-cancel {
    padding: 0.5rem 1rem;
    background-color: #f3f4f6;
    color: #374151;
    font-weight: 500;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
  }

  .btn-cancel:hover {
    background-color: #e5e7eb;
  }

  .btn-save {
    padding: 0.5rem 1rem;
    background-color: #ef4444;
    color: white;
    font-weight: 500;
    border-radius: 0.375rem;
    border: none;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
  }

  .btn-save:hover {
    background-color: #dc2626;
  }

  .btn-save:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error-message {
    background-color: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
    border: 1px solid #fecaca;
    font-size: 0.875rem;
  }

  .loading-indicator {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .required-indicator {
    color: #ef4444;
    margin-left: 0.25rem;
  }
`;

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id) && id !== "new";

  const [formData, setFormData] = useState({
    nom: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    service: "",
    active: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(isEditMode);

  // Ajouter le style au document
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = formStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    if (isEditMode) {
      fetchUser();
    }
  }, [id, isEditMode]);

  const fetchUser = async () => {
    try {
      setFetchingUser(true);
      const response = await fetch(`${API_BASE_URL}/users/${id}`);

      if (!response.ok) {
        throw new Error("Utilisateur non trouvé");
      }

      const userData = await response.json();

      // Normaliser le rôle pour l'affichage dans le formulaire
      let displayRole = userData.role || "utilisateur";
      // Si le rôle est "utilisateur" mais que le formulaire attend "user"
      if (userData.role === "user") {
        displayRole = "utilisateur";
      }

      setFormData({
        nom: userData.nom || "",
        username: userData.username || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
        role: displayRole,
        service: userData.service || "",
        active: userData.active === 0 ? 0 : 1,
      });
    } catch (err) {
      setError("Erreur lors de la récupération de l'utilisateur");
    } finally {
      setFetchingUser(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const validateForm = () => {
    if (!formData.nom || !formData.username || !formData.email) {
      setError("Tous les champs sont obligatoires");
      return false;
    }

    if (!isEditMode && (!formData.password || formData.password.length < 6)) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }

    if (!isEditMode && formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Normaliser les valeurs de rôle pour la cohérence avec la base de données
      let normalizedRole = formData.role;
      // Si le rôle est "user" mais que la base de données attend "utilisateur"
      if (formData.role === "user") {
        normalizedRole = "utilisateur";
      }

      // Préparer les données à envoyer (sans confirmPassword)
      const dataToSend = {
        ...formData,
        role: normalizedRole,
      };
      delete dataToSend.confirmPassword;

      // Si en mode édition et pas de mot de passe, ne pas l'envoyer
      if (isEditMode && !dataToSend.password) {
        delete dataToSend.password;
      }

      const url = isEditMode
        ? `${API_BASE_URL}/users/${id}`
        : `${API_BASE_URL}/users`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'enregistrement");
      }

      // Forcer un rafraîchissement de la liste des utilisateurs
      navigate("/users?refresh=" + Date.now());
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de l'utilisateur...</p>
      </div>
    );
  }

  return (
    <div className="user-form">
      <div className="page-header">
        <h1>{isEditMode ? "Modifier l'utilisateur" : "Nouvel utilisateur"}</h1>
      </div>

      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">
            {isEditMode ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
          </h2>
        </div>

        {error && (
          <div className="error-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                display: "inline",
                marginRight: "8px",
                verticalAlign: "text-bottom",
              }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nom" className="form-label">
                Nom<span className="required-indicator">*</span>
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Entrez le nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Nom d'utilisateur<span className="required-indicator">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Entrez le nom d'utilisateur"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email<span className="required-indicator">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="exemple@domaine.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="service" className="form-label">
                Service
              </label>
              <input
                type="text"
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="form-input"
                placeholder="Ex: Informatique, Administratif, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Rôle<span className="required-indicator">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="admin">Administrateur</option>
                <option value="utilisateur">Utilisateur</option>
                <option value="guest">Invité</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Statut du compte</label>
              <div className="form-checkbox-wrapper">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active === 1}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label htmlFor="active" className="form-checkbox-label">
                  Compte actif
                </label>
              </div>
            </div>

            {/* Champs de mot de passe (toujours affichés en création, cachés en édition) */}
            {!isEditMode && (
              <>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Mot de passe<span className="required-indicator">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!isEditMode}
                    minLength={6}
                    className="form-input"
                  />
                  <p className="form-help">
                    Le mot de passe doit contenir au moins 6 caractères
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmer le mot de passe
                    <span className="required-indicator">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isEditMode}
                    className="form-input"
                  />
                </div>
              </>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="btn-cancel"
              disabled={loading}
            >
              Annuler
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-indicator"></span>
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
