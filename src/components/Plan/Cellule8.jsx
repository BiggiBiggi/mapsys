import PcIcons from "/src/components/Icons/Cellule8/PcIcons";
import styles from "./Cellule8.module.scss";
import ImpSupIcons from "../Icons/Cellule8/ImpSupIcons";
import BackButton from "../BackButton";

function Cellule8() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <BackButton />
        <h1 className={`${styles.title}`}>Cellule 8</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 8 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/cellule8.png"
            alt="Cellule 8"
          />
          <PcIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule8;
