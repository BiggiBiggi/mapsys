"use client";

function AccessDenied({ error, user, debugInfo }) {
  const handleReturnToApp = () => {
    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="access-denied-container">
      <div className="access-denied-card">
        <div className="access-denied-icon">🚫</div>

        <div className="access-denied-content">
          <h1>Accès refusé</h1>

          {!user ? (
            <>
              <p>
                Vous devez être connecté pour accéder à l'interface
                d'administration.
              </p>
              <div className="access-denied-actions">
                <button onClick={handleLogin} className="btn-primary">
                  Se connecter
                </button>
                <button onClick={handleReturnToApp} className="btn-secondary">
                  Retour à l'application
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                Bonjour{" "}
                <strong>
                  {user.username || user.nom || user.name || "Utilisateur"}
                </strong>
                , vous n'avez pas les permissions nécessaires pour accéder à
                l'interface d'administration.
              </p>
              <div className="access-denied-details">
                <div className="detail-item">
                  <span className="detail-label">Votre rôle :</span>
                  <span
                    className={`role-badge ${(
                      user.role ||
                      user.Role ||
                      user.type ||
                      ""
                    ).toLowerCase()}`}
                  >
                    {user.role || user.Role || user.type || "Non défini"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rôle requis :</span>
                  <span className="role-badge admin">Admin</span>
                </div>
              </div>
              <p className="access-denied-help">
                Si vous pensez que c'est une erreur, contactez votre
                administrateur système.
              </p>
              <div className="access-denied-actions">
                <button onClick={handleRefresh} className="btn-primary">
                  🔄 Réessayer
                </button>
                <button onClick={handleReturnToApp} className="btn-secondary">
                  Retour à l'application
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="error-details">
              <p>
                <strong>Détails de l'erreur :</strong> {error}
              </p>
            </div>
          )}

          {debugInfo && (
            <div className="debug-details">
              <details>
                <summary>
                  🔧 Informations de débogage (cliquez pour voir)
                </summary>
                <div className="debug-content">
                  <p>
                    <strong>Debug :</strong> {debugInfo}
                  </p>
                  {user && (
                    <div className="user-debug">
                      <p>
                        <strong>Données utilisateur :</strong>
                      </p>
                      <pre>{JSON.stringify(user, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
