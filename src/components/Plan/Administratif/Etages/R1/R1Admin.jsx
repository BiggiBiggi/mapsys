import styles from "./R1Admin.module.scss";
import BackButton from "/src/components/BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function R1Admin() {
  return (
    <div className={`d-flex flex-column h-100`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>R1 Zone Administrative</h1>
        <p className={`title2`}>
          Voici le plan du premier etage de la zone administrative :
        </p>
      </div>
      <div
        className={`flex-grow-1 d-flex align-items-start justify-content-center position-relative`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/r1_admin.png"
            alt="RDC Zone Administrative"
          />
          <DeviceManagerWrapper planId="Etage1_admin" />
        </div>
      </div>
    </div>
  );
}

export default R1Admin;
