import PcIcons from "/src/components/Icons/ZoneContenants/PcIcons";
import styles from "./ZoneContenants.module.scss";
import ImpCopIcons from "/src/components/Icons/ZoneContenants/ImpCopIcons";
import ClickableZone from "./ClickableZone";

function ZoneContenants() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Zone Contenants</h1>
        <p className={`${styles.title2}`}>
          Voici le plan de la Zone Contenants :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/ZoneContenants.png"
            alt="Zone Contenants"
          />
          <PcIcons />
          <ImpCopIcons />
          <ClickableZone />
        </div>
      </div>
    </>
  );
}

export default ZoneContenants;
