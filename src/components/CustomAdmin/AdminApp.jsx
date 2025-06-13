"use client";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import EquipmentsList from "./Equipment/EquipmentsList";
import EquipmentForm from "./Equipment/EquipmentForm";
import UsersList from "./Users/UsersList";
import UserForm from "./Users/UserForm";
import PasswordChangeForm from "./Users/PasswordChangeForm";
import Settings from "./Settings/Settings";
import AccessDenied from "./Auth/AccessDenied";
import "./AdminApp.css";

function AdminApp() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    isLoading: true,
    error: null,
    debugInfo: null,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      checkAuthentication();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const checkAuthentication = async () => {
    try {
      // Vérifier si l'utilisateur est connecté dans l'application principale
      const userSession = sessionStorage.getItem("user");

      if (!userSession) {
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
          user: null,
          isLoading: false,
          error: "Vous devez être connecté pour accéder à l'administration",
          debugInfo: "Aucune session utilisateur trouvée",
        });
        return;
      }

      let userData;
      try {
        userData = JSON.parse(userSession);
      } catch (parseError) {
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
          user: null,
          isLoading: false,
          error: "Session utilisateur corrompue",
          debugInfo: `Erreur de parsing: ${parseError.message}`,
        });
        return;
      }

      // Utiliser directement les données de session sans appel API
      const userRole =
        userData.role || userData.Role || userData.type || userData.username;

      // Considérer comme admin si le rôle contient "admin" ou si c'est l'utilisateur "admin"
      const isAdmin =
        userRole &&
        (userRole.toLowerCase().includes("admin") ||
          userRole.toLowerCase() === "administrateur" ||
          userData.username === "admin");

      setAuthState({
        isAuthenticated: true,
        isAdmin: isAdmin,
        user: userData,
        isLoading: false,
        error: isAdmin
          ? null
          : "Rôle insuffisant pour accéder à l'administration",
        debugInfo: `Authentification basée sur la session, rôle: ${userRole}, isAdmin: ${isAdmin}`,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        isLoading: false,
        error:
          error.message || "Erreur lors de la vérification des permissions",
        debugInfo: `Erreur générale: ${error.message}`,
      });
    }
  };

  const handleLogout = () => {
    // Rediriger vers la page de déconnexion de l'application principale
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (authState.isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Vérification des permissions...</p>
      </div>
    );
  }

  if (!authState.isAuthenticated || !authState.isAdmin) {
    return (
      <AccessDenied
        error={authState.error}
        user={authState.user}
        debugInfo={authState.debugInfo}
      />
    );
  }

  return (
    <BrowserRouter
      basename="/admin"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AdminLayout onLogout={handleLogout} user={authState.user}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Équipements (tous types) */}
          <Route path="/equipments" element={<EquipmentsList />} />
          <Route path="/equipments/new" element={<EquipmentForm />} />
          <Route path="/equipments/:id/edit" element={<EquipmentForm />} />

          {/* Utilisateurs */}
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/users/:id/password" element={<PasswordChangeForm />} />

          {/* Paramètres */}
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default AdminApp;
