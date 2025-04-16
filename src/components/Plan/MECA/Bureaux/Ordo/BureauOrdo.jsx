import styles from "./BureauOrdo.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import PcIcons from "/src/components/Icons/MECA/Bureaux/Ordo/PcIcons";
import ImpSupIcons from "/src/components/Icons/MECA/Bureaux/Ordo/ImpSupIcons";
import ImpCopIcons from "/src/components/Icons/MECA/Bureaux/Ordo/ImpCopIcons.jsx";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper.jsx";

function BureauOrdo() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau Ordo</h1>
        <p className={`title2`}>Voici le plan du Bureau Ordo :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauOrdo.png"
            alt="Bureau Ordo"
          />
          <PcIcons />
          <ImpCopIcons />
          <ImpSupIcons />
          <DeviceManagerWrapper planId="ordo_meca" />
        </div>
      </div>
    </>
  );
}

export default BureauOrdo;
