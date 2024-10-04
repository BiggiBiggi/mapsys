import PcIcons from "/src/components/Icons/Cellule6/PcIcons";
import styles from "./Cellule6.module.scss";
import ImpCopIcons from "../Icons/Cellule6/ImpCopIcons";
import ImpSupIcons from "../Icons/Cellule6/ImpSupIcons";
import BackButton from "../BackButton";

function Cellule6() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <BackButton />
        <h1 className={`${styles.title}`}>Cellule 6</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 6 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={` ${styles.imageContainer}`}>
          <img
            className={`card ${styles.img}`}
            src="/src/assets/images/cellule6.png"
            alt="Cellule 6"
          />
          <PcIcons />
          <ImpCopIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule6;
