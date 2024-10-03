import PcIcons from "/src/components/Icons/Cellule11/Etage/PcIcons";
import styles from "./Cellule11BureauxEtage.module.scss";
import ImpCopIcons from "/src/components/Icons/Cellule11/Etage/ImpCopIcons";

function Cellule9BureauxEtage() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Cellule 11</h1>
        <p className={`${styles.title2}`}>
          Voici le plan des Bureaux N+1 de la Cellule 11 :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/bureauxCellule11Etage.png"
            alt="Bureaux Etage Cellule 11"
          />
          <h3 className={`${styles.name1}`}>REX Sec</h3>
          <h3 className={`${styles.name2}`}>RH Proximité</h3>
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule9BureauxEtage;
