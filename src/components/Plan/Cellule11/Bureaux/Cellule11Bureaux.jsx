import { Link } from "react-router-dom";
import styles from "./Cellule11Bureaux.module.scss";

function Cellule11Bureaux() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Choix bureaux Cellule 11 </h1>
        <p className={`${styles.title2}`}>
          Cliquez sur le niveau que vous souhaitez voir :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <Link to="/cellule11/bureaux/rdc">
          <button className={`btn btn-reverse-primary ${styles.btnRDC}`}>
            Bureaux N
          </button>
        </Link>
        <Link to="/cellule11/bureaux/etage">
          <button className={`btn btn-reverse-primary ${styles.btnEtage}`}>
            Bureaux N+1
          </button>
        </Link>
      </div>
    </>
  );
}

export default Cellule11Bureaux;
