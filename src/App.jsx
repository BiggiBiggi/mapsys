"use client";

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Import de la nouvelle interface d'administration
import AdminApp from "./components/CustomAdmin/AdminApp";

// Imports pour l'application principale
import Cellule6 from "./components/Plan/Cellule6";
import Cellule7 from "./components/Plan/Cellule7";
import Cellule8 from "./components/Plan/Cellule8";
import Cellule9 from "./components/Plan/Cellule9/Cellule9";
import Cellule10 from "./components/Plan/Cellule10";
import Cellule11 from "/src/components/Plan/Cellule11/Cellule11";
import Cellule11Bureaux from "/src/components/Plan/Cellule11/Bureaux/Cellule11Bureaux";
import Cellule11BureauxEtage from "/src/components/Plan/Cellule11/Bureaux/Etage/Cellule11BureauxEtage.jsx";
import Cellule11BureauxRDC from "/src/components/Plan/Cellule11/Bureaux/RDC/Cellule11BureauxRDC.jsx";
import Cellule12 from "./components/Plan/Cellule12";
import Cellule13 from "./components/Plan/Cellule13";
import AirePalettes from "./components/Plan/AirePalettes";
import Administratif from "./components/Plan/Administratif/Administratif";
import RDCAdmin from "./components/Plan/Administratif/Etages/RDC/RDCAdmin";
import R1Admin from "./components/Plan/Administratif/Etages/R1/R1Admin";
import R2Admin from "./components/Plan/Administratif/Etages/R2/R2Admin";
import Scafruits from "./components/Plan/Administratif/Etages/ScaFruit(R1,5)/Scafruits";
import Pdg from "./components/Plan/PDG";
import ZoneContenants from "/src/components/Plan/ZoneContenants/ZoneContenants.jsx";
import ZoneContenantsBureau from "/src/components/Plan/ZoneContenants/Bureau/ZoneContenantsBureau.jsx";
import Ffl from "./components/Plan/FFL/FFL";
import BureauFFL from "./components/Plan/FFL/Bureaux/BureauFFL/BureauFFL";
import BureauMuri from "./components/Plan/FFL/Bureaux/BureauMuri/BureauMuri";
import Meca from "./components/Plan/MECA/MECA";
import GelCellule1 from "./components/Plan/GelCellule1/GelCellule1";
import BureauPrepGel from "./components/Plan/GelCellule1/BureauPrepGel/BureauPrepGel";
import BureauRecepGel from "./components/Plan/GelCellule1/BureauRecepGel/BureauRecepGel";
import GelCellule2 from "./components/Plan/GelCellule2/GelCellule2";
import SalleRepos from "./components/Plan/GelCellule2/SalleRepos/SalleRepos";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./App.module.scss";
import PlanMasse from "./components/Plan/PlanMasse";
import Cellule9Bureaux from "/src/components/Plan/Cellule9/Bureaux/Cellule9Bureaux";
import Cellule9BureauxRDC from "/src/components/Plan/Cellule9/Bureaux/RDC/Cellule9BureauxRDC";
import Cellule9BureauxEtage from "/src/components/Plan/Cellule9/Bureaux/Etage/Cellule9BureauxEtage.jsx";
import BureauOrdo from "./components/Plan/MECA/Bureaux/Ordo/BureauOrdo";
import BureauCeFrais from "./components/Plan/MECA/Bureaux/CeFRAIS/BureauCeFrais";
import MecaBureaux from "./components/Plan/MECA/Bureaux/MecaBureaux";
import BureauRecepFrais from "./components/Plan/MECA/Bureaux/RecepFrais/BureauRecepFrais";
import BureauRexFrais from "./components/Plan/MECA/Bureaux/RexFrais/BureauRexFrais";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";

// Hook pour détecter les changements d'URL
function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      handleLocationChange();
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return currentPath;
}

// Condition pour forcer le Login avant d'accéder au site
function PrivateRoute({ children }) {
  const user = sessionStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      {!isLoginRoute && <Header />}
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<PlanMasse />} />
                <Route path="/cellule6" element={<Cellule6 />} />
                <Route path="/cellule7" element={<Cellule7 />} />
                <Route path="/cellule8" element={<Cellule8 />} />
                <Route path="/cellule9" element={<Cellule9 />} />
                <Route path="/cellule9/bureaux" element={<Cellule9Bureaux />} />
                <Route
                  path="/cellule9/bureaux/rdc"
                  element={<Cellule9BureauxRDC />}
                />
                <Route
                  path="/cellule9/bureaux/etage"
                  element={<Cellule9BureauxEtage />}
                />
                <Route path="/cellule10" element={<Cellule10 />} />
                <Route path="/cellule11" element={<Cellule11 />} />
                <Route
                  path="/cellule11/bureaux"
                  element={<Cellule11Bureaux />}
                />
                <Route
                  path="/cellule11/bureaux/rdc"
                  element={<Cellule11BureauxRDC />}
                />
                <Route
                  path="/cellule11/bureaux/etage"
                  element={<Cellule11BureauxEtage />}
                />
                <Route path="/cellule12" element={<Cellule12 />} />
                <Route path="/cellule13" element={<Cellule13 />} />
                <Route path="/airePalettes" element={<AirePalettes />} />
                <Route path="/pdg" element={<Pdg />} />
                <Route path="/ffl" element={<Ffl />} />
                <Route path="/ffl/bureauFfl" element={<BureauFFL />} />
                <Route path="/ffl/bureauMurisserie" element={<BureauMuri />} />
                <Route path="/zoneContenants" element={<ZoneContenants />} />
                <Route
                  path="/zoneContenants/bureau"
                  element={<ZoneContenantsBureau />}
                />
                <Route path="/administratif" element={<Administratif />} />
                <Route path="/administratif/etage/rdc" element={<RDCAdmin />} />
                <Route path="/administratif/etage/r1" element={<R1Admin />} />
                <Route path="/administratif/etage/r2" element={<R2Admin />} />
                <Route
                  path="/administratif/etage/scafruits"
                  element={<Scafruits />}
                />
                <Route path="/meca" element={<Meca />} />
                <Route path="/meca/bureaux" element={<MecaBureaux />} />
                <Route
                  path="/meca/bureaux/recepfrais"
                  element={<BureauRecepFrais />}
                />
                <Route
                  path="/meca/bureaux/rexfrais"
                  element={<BureauRexFrais />}
                />
                <Route path="/meca/bureauOrdo" element={<BureauOrdo />} />
                <Route path="/meca/bureauCEFrais" element={<BureauCeFrais />} />
                <Route path="/gelCellule1" element={<GelCellule1 />} />
                <Route
                  path="/gelCellule1/bureauPrepGel"
                  element={<BureauPrepGel />}
                />
                <Route
                  path="/gelCellule1/bureauRecepGel"
                  element={<BureauRecepGel />}
                />
                <Route path="/gelCellule2" element={<GelCellule2 />} />
                <Route
                  path="/gelCellule2/salleRepos"
                  element={<SalleRepos />}
                />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
      {!isLoginRoute && <Footer />}
    </div>
  );
}

// Composant principal
function App() {
  const currentPath = useCurrentPath();
  const isAdminRoute = currentPath.startsWith("/admin");

  console.log("🔍 Current path:", currentPath, "Is admin route:", isAdminRoute);

  // Si c'est une route admin, afficher la nouvelle interface d'administration
  if (isAdminRoute) {
    console.log("🚀 Loading Custom Admin...");
    return <AdminApp />;
  }

  // Sinon, afficher l'application principale avec Router
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
