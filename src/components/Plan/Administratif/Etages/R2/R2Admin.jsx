import styles from "./R2Admin.module.scss";
import BackButton from "/src/components/BackButton";
import DeviceManagerWrapper from "../../../../DeviceManagerWrapper";

function R2Admin() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>R2 Zone Administrative</h1>
        <p className={`title2`}>
          Voici le plan du second etage de la zone administrative :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/r1_admin.png"
            alt="RDC Zone Administrative"
          />
          <h3 className={`${styles.name1}`}>Réception SEC</h3>
          <h3 className={`${styles.name2}`}>Stocks</h3>
          <DeviceManagerWrapper planId="Etage2_admin" />
        </div>
      </div>
    </>
  );
}

export default R2Admin;
