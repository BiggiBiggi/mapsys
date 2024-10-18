import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import mapsys from "../assets/images/mapsys.png";

function Header() {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <Link to="/">
        <img src={mapsys} alt="Logo MapSys" />
      </Link>
      <Link className={`${styles.links} flex-fill`} to="/">
        <div className="flex-fill">
          <h1>MapSys</h1>
        </div>
      </Link>
      <ul className={`${styles.headerList}  `}>
        <Link to="/admin/imp_copieurs">
          <button className={`mr-5 btn btn-reverse-primary`}>
            <i className="fa-solid fa-print mr-5"></i>
            <span>Imprimantes Copieurs</span>
          </button>
        </Link>
        <Link to="/admin/imp_support">
          <button className={`mr-5 btn btn-reverse-primary`}>
            <i className="fa-solid fa-print mr-5"></i>
            <span>Imprimantes Supports</span>
          </button>
        </Link>
        <Link to="/admin/pc_glpi">
          <button className={`btn btn-reverse-primary`}>
            <i className={`fa-solid fa-computer mr-5 `}></i>
            <span>Ordinateurs</span>
          </button>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
