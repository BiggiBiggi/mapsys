import styles from "./BureauFFL.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper.jsx";

function BureauFFL() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau FFL</h1>
        <p className={`title2`}>Voici le plan du Bureau FFL :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauFFL.png"
            alt="Bureau Contenants"
          />
          <DeviceManagerWrapper planId="bureau_ffl" />
        </div>
      </div>
    </>
  );
}

export default BureauFFL;
