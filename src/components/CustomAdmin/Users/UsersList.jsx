"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../api-config";
import { useSearchParams } from "react-router-dom";

// Ajouter après les imports
// Styles Tailwind pour les composants
const tailwindStyles = `
  /* Ajout de styles Tailwind */
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .font-bold { font-weight: 700; }
  .text-gray-800 { color: rgb(31, 41, 55); }
  .text-gray-600 { color: rgb(75, 85, 99); }
  .text-gray-500 { color: rgb(107, 114, 128); }
  .text-gray-400 { color: rgb(156, 163, 175); }
  .text-gray-900 { color: rgb(17, 24, 39); }
  .bg-white { background-color: white; }
  .bg-gray-50 { background-color: rgb(249, 250, 251); }
  .hover\\:bg-gray-50:hover { background-color: rgb(249, 250, 251); }
  
  .bg-red-100 { background-color: rgb(254, 226, 226); }
  .text-red-800 { color: rgb(153, 27, 27); }
  .border-red-200 { border-color: rgb(254, 202, 202); }
  .hover\\:bg-red-200:hover { background-color: rgb(254, 202, 202); }
  
  .bg-blue-100 { background-color: rgb(219, 234, 254); }
  .text-blue-800 { color: rgb(30, 64, 175); }
  .border-blue-200 { border-color: rgb(191, 219, 254); }
  .text-blue-600 { color: rgb(37, 99, 235); }
  .bg-blue-50 { background-color: rgb(239, 246, 255); }
  .hover\\:bg-blue-100:hover { background-color: rgb(219, 234, 254); }
  
  .bg-green-100 { background-color: rgb(220, 252, 231); }
  .text-green-800 { color: rgb(22, 101, 52); }
  .border-green-200 { border-color: rgb(187, 247, 208); }
  .hover\\:bg-green-200:hover { background-color: rgb(187, 247, 208); }
  
  .bg-yellow-100 { background-color: rgb(254, 249, 195); }
  .text-yellow-800 { color: rgb(133, 77, 14); }
  .border-yellow-200 { border-color: rgb(254, 240, 138); }
  
  .bg-purple-100 { background-color: rgb(243, 232, 255); }
  .text-purple-800 { color: rgb(107, 33, 168); }
  .border-purple-200 { border-color: rgb(233, 213, 255); }
  
  .bg-amber-50 { background-color: rgb(255, 251, 235); }
  .text-amber-600 { color: rgb(217, 119, 6); }
  .hover\\:bg-amber-100:hover { background-color: rgb(254, 243, 199); }
  
  .p-4 { padding: 1rem; }
  .p-8 { padding: 2rem; }
  .p-1\\.5 { padding: 0.375rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .px-2\\.5 { padding-left: 0.625rem; padding-right: 0.625rem; }
  .py-0\\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .pl-10 { padding-left: 2.5rem; }
  .pr-4 { padding-right: 1rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .mr-1 { margin-right: 0.25rem; }
  
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-md { border-radius: 0.375rem; }
  .rounded { border-radius: 0.25rem; }
  .rounded-full { border-radius: 9999px; }
  
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .border { border-width: 1px; }
  .border-gray-200 { border-color: rgb(229, 231, 235); }
  .border-gray-300 { border-color: rgb(209, 213, 219); }
  
  .flex { display: flex; }
  .inline-flex { display: inline-flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .gap-2 { gap: 0.5rem; }
  .gap-4 { gap: 1rem; }
  .space-x-2 > * + * { margin-left: 0.5rem; }
  .flex-1 { flex: 1 1 0%; }
  .flex-wrap { flex-wrap: wrap; }
  
  .w-full { width: 100%; }
  .min-w-\\[200px\\] { min-width: 200px; }
  .h-12 { height: 3rem; }
  .w-12 { width: 3rem; }
  .w-3 { width: 0.75rem; }
  .h-3 { height: 0.75rem; }
  
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-y-0 { top: 0px; bottom: 0px; }
  .left-0 { left: 0px; }
  .pointer-events-none { pointer-events: none; }
  
  .divide-y > * + * { border-top-width: 1px; }
  .divide-gray-200 > * + * { border-color: rgb(229, 231, 235); }
  
  .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  
  .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
  .focus\\:ring-2:focus { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); }
  .focus\\:ring-blue-500:focus { --tw-ring-color: rgb(59, 130, 246); }
  .focus\\:border-blue-500:focus { border-color: rgb(59, 130, 246); }
  .focus\\:ring-offset-2:focus { --tw-ring-offset-width: 2px; }
  
  .hover\\:bg-gray-50:hover { background-color: rgb(249, 250, 251); }
  
  .overflow-hidden { overflow: hidden; }
  .overflow-auto { overflow: auto; }
  
  .text-center { text-align: center; }
  .text-left { text-align: left; }
`;

// Ajouter le style au document
const styleElement = document.createElement("style");
styleElement.textContent = tailwindStyles;
document.head.appendChild(styleElement);

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [serviceFilter, setServiceFilter] = useState("");

  // Ajouter ce code au début de la fonction UsersList, juste après les déclarations de useState
  const [searchParams] = useSearchParams();

  // Ajouter ce useEffect pour détecter le paramètre refresh
  useEffect(() => {
    const refreshParam = searchParams.get("refresh");
    if (refreshParam) {
      setRefreshTrigger((prev) => prev + 1);
      // Nettoyer l'URL après le rafraîchissement
      window.history.replaceState({}, "", "/admin/users");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/users?_=${timestamp}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
      setErrorDetails(null);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des utilisateurs:", err);
      setError(
        "Erreur lors du chargement des utilisateurs. Veuillez réessayer."
      );

      try {
        const errorResponse = await fetch(
          `${API_BASE_URL}/users?_=${new Date().getTime()}`
        );
        const errorData = await errorResponse.json();
        if (errorData.error) {
          setErrorDetails(errorData.error);
          if (errorData.details) {
            setErrorDetails((prev) => `${prev}: ${errorData.details}`);
          }
          if (errorData.solution) {
            setErrorDetails((prev) => `${prev}. ${errorData.solution}`);
          }
        }
      } catch (detailsErr) {
        console.error(
          "Impossible de récupérer les détails de l'erreur:",
          detailsErr
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshList = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      refreshList();
      alert("Utilisateur supprimé avec succès");
    } catch (err) {
      console.error("❌ Erreur lors de la suppression:", err);
      alert("Erreur lors de la suppression: " + err.message);
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;

      const response = await fetch(`${API_BASE_URL}/users/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      refreshList();
    } catch (err) {
      console.error("❌ Erreur lors de la modification du statut:", err);
      alert("Erreur lors de la modification du statut: " + err.message);
    }
  };

  // Extraire tous les services uniques pour le filtre
  const uniqueServices = [
    ...new Set(users.map((user) => user.service).filter(Boolean)),
  ].sort();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = !serviceFilter || user.service === serviceFilter;

    return matchesSearch && matchesService;
  });

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <h2>Erreur</h2>
        <p>{error}</p>
        {errorDetails && (
          <div className="error-details">
            <p>
              <strong>Détails:</strong> {errorDetails}
            </p>
          </div>
        )}
        <button onClick={fetchUsers} className="btn-retry">
          Réessayer
        </button>
      </div>
    );
  }

  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "utilisateur":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getServiceBadgeClass = (service) => {
    switch (service?.toLowerCase()) {
      case "informatique":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "administratifs":
        return "bg-green-100 text-green-800 border-green-200";
      case "calog":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="users-list">
      <div className="page-header">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des Utilisateurs
        </h1>
        <div className="header-actions">
          <button
            onClick={refreshList}
            className="btn-secondary flex items-center gap-2 bg-white hover:bg-gray-50"
            title="Rafraîchir la liste"
          >
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
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            Rafraîchir
          </button>
          <Link to="/users/new" className="btn-primary flex items-center gap-2">
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
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Nouvel utilisateur
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="filters flex flex-wrap gap-4">
          <div className="search-box flex-1 min-w-[200px]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
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
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher par nom, username, email, service ou rôle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="filter-box min-w-[200px]">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les services</option>
              {uniqueServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="results-info text-sm text-gray-600 mb-2">
        <p>{filteredUsers.length} utilisateur(s) trouvé(s)</p>
      </div>

      <div className="table-container bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="data-table w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Nom
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Username
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Service
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Rôle
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Statut
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {user.nom || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.username || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.email || "N/A"}
                </td>
                <td className="px-4 py-3">
                  {user.service && (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getServiceBadgeClass(
                        user.service
                      )}`}
                    >
                      {user.service}
                    </span>
                  )}
                  {!user.service && (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeClass(
                      user.role
                    )}`}
                  >
                    {user.role || "Non défini"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleUserStatus(user.id, user.active)}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      user.active === 1
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {user.active === 1 ? (
                      <>
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Actif
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Inactif
                      </>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="action-buttons flex space-x-2">
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="p-1.5 bg-amber-50 text-amber-600 rounded hover:bg-amber-100 transition-colors"
                      title="Modifier"
                    >
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
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </Link>
                    <Link
                      to={`/users/${user.id}/password`}
                      className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      title="Changer le mot de passe"
                    >
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
                      >
                        <rect
                          width="18"
                          height="11"
                          x="3"
                          y="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <circle cx="12" cy="16" r="1" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                      title="Supprimer"
                    >
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
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200 mt-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">Aucun utilisateur trouvé</p>
          {(searchTerm || serviceFilter) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setServiceFilter("");
              }}
              className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UsersList;
