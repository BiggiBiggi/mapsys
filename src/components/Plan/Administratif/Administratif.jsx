import { Link } from "react-router-dom";
import styles from "./Administratif.module.scss";
import BackButton from "/src/components/BackButton";

function Administratif() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Choix Étage Zone Administrative</h1>
        <p className={`title2`}>Sélectionnez l'étage :</p>
      </div>
      <div
        className={`d-flex flex-fill flex-row align-items-center justify-content-center ${styles.button} `}
      >
        <Link to="/administratif/etage/rdc">
          <button className={`btn btn-reverse-primary ${styles.btnRDC}`}>
            RDC
          </button>
        </Link>
        <Link to="/administratif/etage/r1">
          <button className={`btn btn-reverse-primary ${styles.btnR1}`}>
            Étage 1
          </button>
        </Link>
        <Link to="/administratif/etage/r2">
          <button className={`btn btn-reverse-primary ${styles.btnR2}`}>
            Étage 2
          </button>
        </Link>
      </div>
      <div
        className={`d-flex flex-fill flex-row align-items-center justify-content-center ${styles.button}`}
      >
        <Link to="/administratif/etage/scafruits">
          <button className={`btn btn-reverse-primary ${styles.btnScafruits}`}>
            Scafruits (Étage 1,5)
          </button>
        </Link>
      </div>
    </>
  );
}

export default Administratif;
