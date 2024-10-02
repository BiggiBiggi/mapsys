import PcIcons from "/src/components/Icons/Cellule9/PcIcons";
import styles from "./Cellule9.module.scss";
import ImpSupIcons from "/src/components/Icons/Cellule9/ImpSupIcons.jsx";
import ClickableZone from "./ClickableZone";
import ImpCopIcons from "../../Icons/Cellule9/ImpCopIcons";

function Cellule9() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Cellule 9</h1>
        <p className={`${styles.title2}`}>Voici le plan de la cellule 9 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`${styles.img} `}
            src="/src/assets/images/cellule9.png"
            alt="Cellule 9"
          />
          <ClickableZone />
          <PcIcons />
          <ImpSupIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule9;
