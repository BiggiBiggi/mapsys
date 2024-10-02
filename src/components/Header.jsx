import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import mapsys from "../assets/images/mapsys.png";

function Header() {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <Link className={``} to="/">
        <img src={mapsys} alt="Logo MapSys" />
      </Link>
      <Link className={`${styles.links} flex-fill`} to="/">
        <div className="flex-fill">
          <h1>MapSys</h1>
        </div>
      </Link>
      <ul className={`${styles.headerList}  `}>
        <button className={`mr-5 btn btn-reverse-primary`}>
          <i className="fa-solid fa-print mr-5"></i>
          <span>Imprimantes Copieurs</span>
        </button>
        <button className={`mr-5 btn btn-reverse-primary`}>
          <i className="fa-solid fa-print mr-5"></i>
          <span>Imprimantes Supports</span>
        </button>
        <button className={`btn btn-reverse-primary`}>
          <i className={`fa-solid fa-computer mr-5 `}></i>
          <span>Ordinateurs</span>
        </button>
      </ul>
    </header>
  );
}

export default Header;
