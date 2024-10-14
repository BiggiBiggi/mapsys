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
        <p className={`title2`}>
          Cliquez sur le niveau que vous souhaitez voir :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <Link to="/cellule9/bureaux/rdc">
          <button className={`btn btn-reverse-primary ${styles.btnRDC}`}>
            Bureaux N
          </button>
        </Link>
        <Link to="/cellule9/bureaux/etage">
          <button className={`btn btn-reverse-primary ${styles.btnEtage}`}>
            Bureaux N+1
          </button>
        </Link>
      </div>
    </>
  );
}

export default Cellule9Bureaux;
