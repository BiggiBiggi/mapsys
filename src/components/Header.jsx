import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import mapsys from "../assets/images/mapsys.png";

function Header() {
  return (
    <header
      className={`${styles.header} m-10 d-flex flex-row align-items-center`}
    >
      <Link to="/">
        <img src={mapsys} alt="Logo MapSys" />
      </Link>
      <Link className={`${styles.links}`} to="/">
        <div className="flex-fill">
          <h1>Accueil</h1>
        </div>
      </Link>
    </header>
  );
}

export default Header;
