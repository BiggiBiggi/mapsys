import { Link } from "react-router-dom";
import styles from "./Cellule9Bureaux.module.scss";
import BackButton from "/src/components/BackButton";

function Cellule9Bureaux() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Choix bureaux Cellule 9</h1>
        <p className={`title2`}>Sélectionnez l'étage :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <Link to="/cellule9/bureaux/rdc">
          <button className={`btn btn-reverse-primary ${styles.btnRDC}`}>
            RDC
          </button>
        </Link>
        <Link to="/cellule9/bureaux/etage">
          <button className={`btn btn-reverse-primary ${styles.btnEtage}`}>
            Étage 1
          </button>
        </Link>
      </div>
    </>
  );
}

export default Cellule9Bureaux;
