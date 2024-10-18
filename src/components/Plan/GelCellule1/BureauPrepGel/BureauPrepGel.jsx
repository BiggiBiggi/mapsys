import styles from "./BureauPrepGel.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import PcIcons from "/src/components/Icons/GelCellule1/BureauPrepGel/PcIcons";
import ImpSupIcons from "/src/components/Icons/GelCellule1/BureauPrepGel/ImpSupIcons";
import ImpCopIcons from "/src/components/Icons/GelCellule1/BureauPrepGel/ImpCopIcons";

function BureauPrepGel() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau Préparation Gel</h1>
        <p className={`title2`}>Voici le plan du Bureau Préparation Gel :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauPrepGel.png"
            alt="Bureau Prep Gel"
          />
          <PcIcons />
          <ImpCopIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default BureauPrepGel;
