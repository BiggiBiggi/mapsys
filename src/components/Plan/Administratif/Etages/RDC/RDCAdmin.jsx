import styles from "./RDCAdmin.module.scss";
import BackButton from "/src/components/BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

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
          <DeviceManagerWrapper planId="RDC_admin" />
        </div>
      </div>
    </>
  );
}

export default RDCAdmin;
