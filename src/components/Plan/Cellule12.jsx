import PcIcons from "/src/components/Icons/Cellule12/PcIcons";
import styles from "./Cellule12.module.scss";
import ImpSupIcons from "../Icons/Cellule12/ImpSupIcons";
import ImpCopIcons from "../Icons/Cellule12/ImpCopIcons";

function Cellule12() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Cellule 12</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 12 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/cellule12.png"
            alt="Cellule 12"
          />
          <PcIcons />
          <ImpSupIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule12;
