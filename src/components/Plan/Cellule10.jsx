import PcIcons from "/src/components/Icons/Cellule10/PcIcons";
import styles from "./Cellule10.module.scss";
import ImpSupIcons from "../Icons/Cellule10/ImpSupIcons";

function Cellule10() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Cellule 10</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 10 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/cellule10.png"
            alt="Cellule 10"
          />
          <PcIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule10;
