import styles from "./ZoneContenantsBureau.module.scss";
import BackButton from "../../../BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper.jsx";

function ZoneContenantsBureau() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.divTitle}`}
      >
        <BackButton />
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
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/ZoneContenantsBureau.png"
            alt="Bureau Contenants"
          />
          <DeviceManagerWrapper planId="bureau_contenants" />
        </div>
      </div>
    </>
  );
}

export default ZoneContenantsBureau;
