import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import mapsys from "../assets/images/mapsys.png";

function Header() {
  const [impSupport, setImpSupport] = useState(false);
  const [impCopieur, setImpCopieur] = useState(false);
  const [computer, setComputer] = useState(false);

  function handleImpSupport() {
    setImpSupport(!impSupport);
  }
  function handleImpCopieur() {
    setImpCopieur(!impCopieur);
  }
  function handleComputer() {
    setComputer(!computer);
  }

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
        <button
          onClick={handleImpCopieur}
          className={`mr-5 btn ${
            impCopieur ? "btn-primary" : "btn-reverse-primary"
          }`}
        >
          <i className="fa-solid fa-print mr-5"></i>
          <span>Imprimantes Copieurs</span>
        </button>
        <button
          onClick={handleImpSupport}
          className={`mr-5 btn ${
            impSupport ? "btn-primary" : "btn-reverse-primary"
          }`}
        >
          <i className="fa-solid fa-print mr-5"></i>
          <span>Imprimantes Supports</span>
        </button>
        <button
          onClick={handleComputer}
          className={`btn ${computer ? "btn-primary" : "btn-reverse-primary"}`}
        >
          <i className={`fa-solid fa-computer mr-5 `}></i>
          <span>Ordinateurs</span>
        </button>
        <i className={`fa-solid fa-bars ml-20`}></i>
      </ul>
    </header>
  );
}

export default Header;
