import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Admin, Resource } from "react-admin";

import {
  ImpSupList,
  ImpSupEdit,
  ImpSupCreate,
} from "./components/Admin/ImpSupportList";
import {
  ImpCopList,
  ImpCopEdit,
  ImpCopCreate,
} from "./components/Admin/ImpCopieurList";
import {
  PcFixeList,
  PcFixeEdit,
  PcFixeCreate,
} from "./components/Admin/PcFixeList";
import {
  PcPortList,
  PcPortEdit,
  PcPortCreate,
} from "./components/Admin/PcPortList";
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
import { dataProvider, i18nProvider } from "./components/Admin/DataProvider";
import { MyLayout } from "./components/Admin/Theme/MyLayout";
import LoginPage from "./components/Admin/Connexion/LoginPage";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Router>
        <AppContent />{" "}
        {/* Utilisation d'un composant interne pour gérer l'affichage */}
      </Router>
    </div>
  );
}

// Nouveau composant interne pour gérer le contenu en fonction de la route
function AppContent() {
  const location = useLocation(); // Utiliser useLocation à l'intérieur du Router

  // Condition pour masquer le header et le footer sur la route /admin et /login
  const isAdminRoute =
    location.pathname.startsWith("/admin/") || location.pathname === "/login";

  // Condition pour forcer le Login avant d'acceder au site
  const PrivateRoute = ({ children }) => {
    const user = sessionStorage.getItem("user");

    return user ? children : <Navigate to="/login" />;
  };

  return (
    <>
      {!isAdminRoute && <Header />}{" "}
      {/* Masquer le header sur les routes admin */}
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Routes protégées */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <AppRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
      {!isAdminRoute && <Footer />}{" "}
      {/* Masquer le footer sur les routes admin */}
    </>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PlanMasse />} />
      <Route path="/cellule6" element={<Cellule6 />} />
      <Route path="/cellule7" element={<Cellule7 />} />
      <Route path="/cellule8" element={<Cellule8 />} />
      <Route path="/cellule9" element={<Cellule9 />} />
      <Route path="/cellule9/bureaux" element={<Cellule9Bureaux />} />
      <Route path="/cellule9/bureaux/rdc" element={<Cellule9BureauxRDC />} />
      <Route
        path="/cellule9/bureaux/etage"
        element={<Cellule9BureauxEtage />}
      />
      <Route path="/cellule10" element={<Cellule10 />} />
      <Route path="/cellule11" element={<Cellule11 />} />
      <Route path="/cellule11/bureaux" element={<Cellule11Bureaux />} />
      <Route path="/cellule11/bureaux/rdc" element={<Cellule11BureauxRDC />} />
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
      <Route path="/zoneContenants/bureau" element={<ZoneContenantsBureau />} />
      <Route path="/administratif" element={<Administratif />} />
      <Route path="/administratif/etage/rdc" element={<RDCAdmin />} />
      <Route path="/administratif/etage/r1" element={<R1Admin />} />
      <Route path="/administratif/etage/r2" element={<R2Admin />} />
      <Route path="/administratif/etage/scafruits" element={<Scafruits />} />
      <Route path="/meca" element={<Meca />} />
      <Route path="/meca/bureaux" element={<MecaBureaux />} />
      <Route path="/meca/bureaux/recepfrais" element={<BureauRecepFrais />} />
      <Route path="/meca/bureaux/rexfrais" element={<BureauRexFrais />} />
      <Route path="/meca/bureauOrdo" element={<BureauOrdo />} />
      <Route path="/meca/bureauCEFrais" element={<BureauCeFrais />} />
      <Route path="/gelCellule1" element={<GelCellule1 />} />
      <Route path="/gelCellule1/bureauPrepGel" element={<BureauPrepGel />} />
      <Route path="/gelCellule1/bureauRecepGel" element={<BureauRecepGel />} />
      <Route path="/gelCellule2" element={<GelCellule2 />} />
      <Route path="/gelCellule2/salleRepos" element={<SalleRepos />} />

      {/* React-admin toujours autorisé (géré séparément) */}
      <Route
        path="/admin/*"
        element={
          <Admin
            dataProvider={dataProvider}
            basename="/admin"
            i18nProvider={i18nProvider}
            layout={MyLayout}
            darkTheme={null}
          >
            <Resource
              name="imp_copieur"
              options={{ label: "Imprimantes Copieurs" }}
              list={ImpCopList}
              edit={ImpCopEdit}
              create={ImpCopCreate}
            />
            <Resource
              name="imp_support"
              options={{ label: "Imprimantes Supports" }}
              list={ImpSupList}
              edit={ImpSupEdit}
              create={ImpSupCreate}
            />
            <Resource
              name="pc_fixe"
              options={{ label: "PC Fixe" }}
              list={PcFixeList}
              edit={PcFixeEdit}
              create={PcFixeCreate}
            />
            <Resource
              name="pc_port"
              options={{ label: "PC Portable" }}
              list={PcPortList}
              edit={PcPortEdit}
              create={PcPortCreate}
            />
          </Admin>
        }
      />
    </Routes>
  );
};

export default App;
