import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cellule6 from "./components/Plan/Cellule6";
import Cellule7 from "./components/Plan/Cellule7";
import Cellule8 from "./components/Plan/Cellule8";
import Cellule9 from "./components/Plan/Cellule9";
import Cellule10 from "./components/Plan/Cellule10";
import Cellule11 from "./components/Plan/Cellule11";
import Cellule12 from "./components/Plan/Cellule12";
import Cellule13 from "./components/Plan/Cellule13";
import AirePalettes from "./components/Plan/AirePalettes";
import Administratif from "./components/Plan/Administratif";
import Pdg from "./components/Plan/PDG";
import ZoneContenants from "./components/Plan/ZoneContenants";
import Ffl from "./components/Plan/FFL";
import Meca from "./components/Plan/MECA";
import GelCellule1 from "./components/Plan/GelCellule1";
import GelCellule2 from "./components/Plan/GelCellule2";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./App.module.scss";
import PlanMasse from "./components/Plan/PlanMasse";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PlanMasse />} />
          <Route path="/cellule6" element={<Cellule6 />} />
          <Route path="/cellule7" element={<Cellule7 />} />
          <Route path="/cellule8" element={<Cellule8 />} />
          <Route path="/cellule9" element={<Cellule9 />} />
          <Route path="/cellule10" element={<Cellule10 />} />
          <Route path="/cellule11" element={<Cellule11 />} />
          <Route path="/cellule12" element={<Cellule12 />} />
          <Route path="/cellule13" element={<Cellule13 />} />
          <Route path="/airePalettes" element={<AirePalettes />} />
          <Route path="/pdg" element={<Pdg />} />
          <Route path="/ffl" element={<Ffl />} />
          <Route path="/zoneContenants" element={<ZoneContenants />} />
          <Route path="/administratif" element={<Administratif />} />
          <Route path="/meca" element={<Meca />} />
          <Route path="/gelCellule1" element={<GelCellule1 />} />
          <Route path="/gelCellule2" element={<GelCellule2 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
