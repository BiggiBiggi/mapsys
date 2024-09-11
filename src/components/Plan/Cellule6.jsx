import PcIcons from "../Icons/PcIcons";
import styles from "./Cellule6.module.scss";

function Cellule6() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Cellule 6</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 6 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/cellule6.png"
            alt="Cellule 6"
          />
          <PcIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule6;
