"use client"

import { useState } from "react"

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Simulation d'authentification - remplacez par votre logique
      if (credentials.username === "admin" && credentials.password === "admin") {
        const token = "fake-jwt-token-" + Date.now()
        onLogin(token)
      } else {
        throw new Error("Identifiants incorrects")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Administration</h1>
          <p>Connectez-vous pour accéder à l'interface d'administration</p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="admin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="admin"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="login-info">
          <p>
            <strong>Identifiants de test :</strong>
          </p>
          <p>Utilisateur : admin</p>
          <p>Mot de passe : admin</p>
        </div>

        <div className="login-footer">
          <button onClick={() => (window.location.href = "/")} className="btn-return">
            ← Retour à l'application principale
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
