import { Link } from "react-router-dom";
import styles from "./Cellule9Bureaux.module.scss";

function Cellule9Bureaux() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Choix bureaux Cellule 9</h1>
        <p className={`${styles.title2}`}>
          Cliquez sur le niveau que vous souhaitez voir :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <Link to="/cellule9/bureaux/rdc">
          <button className={`btn btn-reverse-primary ${styles.btnRDC}`}>
            Bureaux RDC
          </button>
        </Link>
        <Link to="/cellule9/bureaux/etage">
          <button className={`btn btn-reverse-primary ${styles.btnEtage}`}>
            Bureaux Étages
          </button>
        </Link>
      </div>
    </>
  );
}

export default Cellule9Bureaux;
