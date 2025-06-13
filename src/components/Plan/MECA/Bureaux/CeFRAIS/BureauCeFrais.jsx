import styles from "./BureauCeFrais.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper.jsx";

function BureauCeFrais() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau CE Frais</h1>
        <p className={`title2`}>
          Voici le plan du Bureau des Chefs d&apos;Équipe Frais :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauCeFrais.png"
            alt="Bureau CeFrais"
          />
          <DeviceManagerWrapper planId="cefrais_meca" />
        </div>
      </div>
    </>
  );
}

export default BureauCeFrais;
