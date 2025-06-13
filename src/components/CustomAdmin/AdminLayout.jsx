"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function AdminLayout({ children, onLogout, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "Tableau de bord",
      icon: "📊",
    },
    {
      path: "/equipments",
      label: "Équipements",
      icon: "💻",
    },
    {
      path: "/users",
      label: "Utilisateurs",
      icon: "👥",
    },
    {
      path: "/settings",
      label: "Paramètres",
      icon: "⚙️",
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>Administration</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-welcome">
              👋 Bonjour,{" "}
              <strong>{user?.username || user?.nom || "Admin"}</strong>
            </span>
            <span className={`user-role ${user?.role?.toLowerCase()}`}>
              {user?.role || "Admin"}
            </span>
          </div>
          <button
            className="btn-return"
            onClick={() => (window.location.href = "/")}
          >
            ← Retour à l'application
          </button>
          <button className="btn-logout" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
