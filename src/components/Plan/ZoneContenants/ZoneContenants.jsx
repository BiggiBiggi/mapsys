import styles from "./ZoneContenants.module.scss";
import ClickableZone from "./ClickableZone";
import BackButton from "../../BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function ZoneContenants() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Zone Contenants</h1>
        <p className={`title2`}>Voici le plan de la Zone Contenants :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/ZoneContenants.png"
            alt="Zone Contenants"
          />
          <ClickableZone />
          <DeviceManagerWrapper planId="contenants" />
        </div>
      </div>
    </>
  );
}

export default ZoneContenants;
