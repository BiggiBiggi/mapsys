import styles from "./BureauRexFrais.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import PcIcons from "/src/components/Icons/MECA/Bureaux/RexFrais/PcIcons";
import ImpCopIcons from "/src/components/Icons/MECA/Bureaux/RexFrais/ImpCopIcons";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper.jsx";

function BureauRexFrais() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau Reception Frais</h1>
        <p className={`title2`}>Voici le plan du Bureau Reception Frais :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauRexFrais.png"
            alt="Bureau RexFrais"
          />
          <PcIcons />
          <ImpCopIcons />
          <DeviceManagerWrapper planId="rexfrais_meca" />
        </div>
      </div>
    </>
  );
}

export default BureauRexFrais;
