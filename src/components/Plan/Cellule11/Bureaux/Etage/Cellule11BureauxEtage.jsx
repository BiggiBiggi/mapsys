import styles from "./Cellule11BureauxEtage.module.scss";
import BackButton from "../../../../BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function Cellule9BureauxEtage() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 11</h1>
        <p className={`title2`}>Voici le plan des Étage 1 de la Cellule 11 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/bureauxCellule11Etage.png"
            alt="Bureaux Etage Cellule 11"
          />
          <h3 className={`${styles.name1}`}>REX Sec</h3>
          <h3 className={`${styles.name2}`}>RH Proximité</h3>
          <DeviceManagerWrapper planId="Etage1_cellule11" />
        </div>
      </div>
    </>
  );
}

export default Cellule9BureauxEtage;
