import PcIcons from "/src/components/Icons/ZoneContenants/Bureau/PcIcons.jsx";
import styles from "./ZoneContenantsBureau.module.scss";
import ImpCopIcons from "/src/components/Icons/ZoneContenants/Bureau/ImpCopIcons.jsx";

function ZoneContenantsBureau() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <h1 className={`${styles.title}`}>Bureau Contenants</h1>
        <p className={`${styles.title2}`}>
          Voici le plan du Bureau Contenants :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`${styles.img}`}
            src="/src/assets/images/ZoneContenantsBureau.png"
            alt="Bureau Contenants"
          />
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default ZoneContenantsBureau;
