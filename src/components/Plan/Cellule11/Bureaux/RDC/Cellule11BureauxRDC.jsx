import styles from "./Cellule11BureauxRDC.module.scss";
import BackButton from "../../../../BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function Cellule9BureauxRDC() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 11</h1>
        <p className={`title2`}>
          Voici le plan des bureaux N de la Cellule 11 :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/bureauxCellule11RDC.png"
            alt="Bureaux RDC Cellule 11"
          />
          <h3 className={`${styles.name1}`}>Chef de quai</h3>
          <h3 className={`${styles.name2}`}>Prépa Sec</h3>
          <DeviceManagerWrapper planId="RDC_cellule11" />
        </div>
      </div>
    </>
  );
}

export default Cellule9BureauxRDC;
