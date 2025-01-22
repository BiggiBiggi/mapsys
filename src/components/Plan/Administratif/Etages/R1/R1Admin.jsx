// import PcIcons from "/src/components/Icons/Administratif/R1/PcIcons";
import styles from "./R1Admin.module.scss";
// import ImpCopIcons from "/src/components/Icons/Administratif/R1/ImpCopIcons";
import BackButton from "/src/components/BackButton";
import DeviceManagerWrapper from "../../../../DeviceManagerWrapper";

function R1Admin() {
  return (
    <>
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
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/r1_admin.png"
            alt="RDC Zone Administrative"
          />
          {/* <PcIcons />
          <ImpCopIcons /> */}
          <DeviceManagerWrapper planId="R1_admin" />
        </div>
      </div>
    </>
  );
}

export default R1Admin;
