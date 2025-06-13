"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api-config";

function PasswordChangeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la mise à jour du mot de passe"
        );
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (err) {
      console.error("❌ Erreur lors du changement de mot de passe:", err);
      setError(err.message || "Erreur lors de la mise à jour du mot de passe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-change-form">
      <div className="page-header">
        <h1>Changer le mot de passe</h1>
      </div>

      {success ? (
        <div className="success-message">
          <p>✅ Mot de passe modifié avec succès! Redirection...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Nouveau mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="form-control"
            />
            <small className="form-text">
              Le mot de passe doit contenir au moins 6 caractères
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="btn-secondary"
              disabled={loading}
            >
              Annuler
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PasswordChangeForm;
