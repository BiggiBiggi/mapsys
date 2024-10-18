import styles from "./SalleRepos.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import PcIcons from "/src/components/Icons/GelCellule2/SalleRepos/PcIcons";
import ImpSupIcons from "/src/components/Icons/GelCellule2/SalleRepos/ImpSupIcons";
import ImpCopIcons from "/src/components/Icons/GelCellule2/SalleRepos/ImpCopIcons";

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
          <PcIcons />
          <ImpCopIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default SalleRepos;
