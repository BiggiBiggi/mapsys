import PcIcons from "/src/components/Icons/Cellule13/PcIcons";
import styles from "./Cellule13.module.scss";
import ImpCopIcons from "../Icons/Cellule13/ImpCopIcons";

function Cellule13() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Cellule 13</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 13 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/Cellule13.png"
            alt="Cellule 13"
          />
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule13;
