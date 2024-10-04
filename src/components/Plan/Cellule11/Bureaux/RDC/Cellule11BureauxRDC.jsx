import PcIcons from "/src/components/Icons/Cellule11/RDC/PcIcons.jsx";
import styles from "./Cellule11BureauxRDC.module.scss";
import ImpCopIcons from "/src/components/Icons/Cellule11/RDC/ImpCopIcons";
import ImpSupIcons from "../../../../Icons/Cellule11/RDC/ImpSupIcons";
import BackButton from "../../../../BackButton";

function Cellule9BureauxRDC() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <BackButton />
        <h1 className={`${styles.title}`}>Cellule 11</h1>
        <p className={`${styles.title2}`}>
          Voici le plan des bureaux N de la Cellule 11 :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/bureauxCellule11RDC.png"
            alt="Bureaux RDC Cellule 11"
          />
          <h3 className={`${styles.name1}`}>Chef de quai</h3>
          <h3 className={`${styles.name2}`}>Prépa Sec</h3>
          <PcIcons />
          <ImpCopIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule9BureauxRDC;
