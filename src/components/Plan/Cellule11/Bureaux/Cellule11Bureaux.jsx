import { Link } from "react-router-dom";
import styles from "./Cellule11Bureaux.module.scss";
import BackButton from "../../../BackButton";

function Cellule11Bureaux() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Choix bureaux Cellule 11 </h1>
        <p className={`title2`}>Sélectionnez l'étage :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <Link to="/cellule11/bureaux/rdc">
          <button className={`btn btn-reverse-primary ${styles.btnRDC}`}>
            RDC
          </button>
        </Link>
        <Link to="/cellule11/bureaux/etage">
          <button className={`btn btn-reverse-primary ${styles.btnEtage}`}>
            Étage 1
          </button>
        </Link>
      </div>
    </>
  );
}

export default Cellule11Bureaux;
