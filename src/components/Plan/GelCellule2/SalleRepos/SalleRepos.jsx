import styles from "./SalleRepos.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper.jsx";

function SalleRepos() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Salle de Repos Gel</h1>
        <p className={`title2`}>Voici le plan de la Salle de Repos Gel :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/SalleRepos.png"
            alt="Bureau Prep Gel"
          />
          <DeviceManagerWrapper planId="repos_gelcellule2" />
        </div>
      </div>
    </>
  );
}

export default SalleRepos;
