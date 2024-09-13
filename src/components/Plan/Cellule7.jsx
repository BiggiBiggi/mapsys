import PcIcons from "/src/components/Icons/Cellule7/PcIcons";
import styles from "./Cellule7.module.scss";
import ImpSupIcons from "../Icons/Cellule7/ImpSupIcons";

function Cellule7() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Cellule 7</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 7 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/cellule7.png"
            alt="Cellule 7"
          />
          <PcIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule7;
