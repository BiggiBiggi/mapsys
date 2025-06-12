import { Link } from "react-router-dom";
import styles from "./MecaBureaux.module.scss";
import BackButton from "/src/components/BackButton";

function MecaBureaux() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Choix bureaux MECA</h1>
        <p className={`title2`}>Sélectionnez l'étage :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <Link to="/meca/bureaux/recepfrais">
          <button className={`btn btn-reverse-primary ${styles.btnRDC}`}>
            Reception Frais
          </button>
        </Link>
        <Link to="/meca/bureaux/rexfrais">
          <button className={`btn btn-reverse-primary ${styles.btnEtage}`}>
            Rex Frais
          </button>
        </Link>
      </div>
    </>
  );
}

export default MecaBureaux;
