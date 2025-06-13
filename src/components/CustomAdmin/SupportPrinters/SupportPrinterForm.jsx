"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function SupportPrinterForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    nom: "",
    model: "",
    ip: "",
    sn: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEdit) {
      fetchPrinter()
    }
  }, [id, isEdit])

  const fetchPrinter = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/imp_support/${id}`)
      if (!response.ok) {
        throw new Error("Imprimante support non trouvée")
      }
      const data = await response.json()
      setFormData({
        nom: data.nom || "",
        model: data.model || "",
        ip: data.ip || "",
        sn: data.sn || "",
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = isEdit ? `http://localhost:5000/api/imp_support/${id}` : "http://localhost:5000/api/imp_support"

      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      navigate("/support-printers")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (loading && isEdit) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de l'imprimante support...</p>
      </div>
    )
  }

  return (
    <div className="support-printer-form">
      <div className="page-header">
        <h1>{isEdit ? "Modifier l'imprimante support" : "Nouvelle imprimante support"}</h1>
        <button onClick={() => navigate("/support-printers")} className="btn-secondary">
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
            <label htmlFor="nom">Nom de l'imprimante *</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Ex: IMP-SUPPORT-01"
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
              placeholder="Ex: Canon PIXMA"
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
              placeholder="Ex: 192.168.1.150"
              pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
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
              placeholder="Ex: DEF987654321"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/support-printers")}
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
  )
}

export default SupportPrinterForm
