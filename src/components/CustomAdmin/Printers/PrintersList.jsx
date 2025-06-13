"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function PrintersList() {
  const [printers, setPrinters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPrinters()
  }, [])

  const fetchPrinters = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/api/imp_copieurs")
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des imprimantes")
      }
      const data = await response.json()
      setPrinters(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette imprimante ?")) {
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/imp_copieurs/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      setPrinters(printers.filter((printer) => printer.id_eqts !== id))
    } catch (err) {
      alert("Erreur lors de la suppression: " + err.message)
    }
  }

  const filteredPrinters = printers.filter((printer) => {
    return (
      printer.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.ip?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des imprimantes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-error">
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={fetchPrinters} className="btn-retry">
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="printers-list">
      <div className="page-header">
        <h1>Imprimantes Copieurs</h1>
        <Link to="/printers/new" className="btn-primary">
          ➕ Nouvelle imprimante
        </Link>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher par nom, modèle ou IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="results-info">
        <p>{filteredPrinters.length} imprimante(s) trouvée(s)</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Modèle</th>
              <th>Adresse IP</th>
              <th>Numéro de série</th>
              <th>Nom Infolog</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrinters.map((printer) => (
              <tr key={printer.id_eqts}>
                <td>{printer.nom || "N/A"}</td>
                <td>{printer.model || "N/A"}</td>
                <td>{printer.ip || "N/A"}</td>
                <td>{printer.sn || "N/A"}</td>
                <td>{printer.nom_infolog || "N/A"}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/printers/${printer.id_eqts}/edit`} className="btn-edit" title="Modifier">
                      ✏️
                    </Link>
                    <button onClick={() => handleDelete(printer.id_eqts)} className="btn-delete" title="Supprimer">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPrinters.length === 0 && (
        <div className="no-results">
          <p>Aucune imprimante trouvée</p>
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="btn-clear-filters">
              Effacer les filtres
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default PrintersList
