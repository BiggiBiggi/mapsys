import styles from "./BureauRecepGel.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper.jsx";

function BureauRecepGel() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau Réception Gel</h1>
        <p className={`title2`}>Voici le plan du Bureau Réception Gel :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauRecepGel.png"
            alt="Bureau Prep Gel"
          />
          <DeviceManagerWrapper planId="recepgel_gelcellule1" />
        </div>
      </div>
    </>
  );
}

export default BureauRecepGel;
