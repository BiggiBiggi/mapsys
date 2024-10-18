import styles from "./BureauRecepFrais.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import PcIcons from "/src/components/Icons/MECA/Bureaux/RecepFrais/PcIcons";
import ImpCopIcons from "/src/components/Icons/MECA/Bureaux/RecepFrais/ImpCopIcons";

function BureauRecepFrais() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau Reception Frais</h1>
        <p className={`title2`}>Voici le plan du Bureau Reception Frais :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauRecepFrais.png"
            alt="Bureau RecepFrais"
          />
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default BureauRecepFrais;
