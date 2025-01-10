import PcIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/PcIcons";
import styles from "./RDCAdmin.module.scss";
import ImpCopIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/ImpCopIcons";
import BackButton from "/src/components/BackButton";

function RDCAdmin() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>RDC Zone Administrative</h1>
        <p className={`title2`}>
          Voici le plan du rez-de-chaussée de la zone administrative :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/rdc_admin.png"
            alt="RDC Zone Administrative"
          />
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default RDCAdmin;
