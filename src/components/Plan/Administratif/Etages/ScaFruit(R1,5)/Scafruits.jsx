import PcIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/PcIcons";
import styles from "./Scafruits.module.scss";
import ImpCopIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/ImpCopIcons";
import BackButton from "/src/components/BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function Scafruits() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>ScaFruits</h1>
        <p className={`title2`}>Voici le plan de la ScaFruits :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/scafruits.png"
            alt="RDC Zone Administrative"
          />
          <PcIcons />
          <ImpCopIcons />
          <DeviceManagerWrapper planId="scafruits" />
        </div>
      </div>
    </>
  );
}

export default Scafruits;
