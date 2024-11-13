import styles from "./BureauRecepGel.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import PcIcons from "/src/components/Icons/GelCellule1/BureauRecepGel/PcIcons";
import ImpCopIcons from "/src/components/Icons/GelCellule1/BureauRecepGel/ImpCopIcons";

function BureauRecepGel() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau Réception Gel</h1>
        <p className={`title2`}>Voici le plan du Bureau Réception Gel :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauRecepGel.png"
            alt="Bureau Prep Gel"
          />
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default BureauRecepGel;
