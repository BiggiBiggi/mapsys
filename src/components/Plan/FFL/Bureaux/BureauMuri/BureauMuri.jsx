import styles from "./BureauMuri.module.scss";
import BackButton from "/src/components/BackButton.jsx";
import PcIcons from "../../../../Icons/FFL/BureauMuri/PcIcons";
import ImpSupIcons from "../../../../Icons/FFL/BureauMuri/ImpSupIcons";
import ImpCopIcons from "../../../../Icons/FFL/BureauMuri/ImpCopIcons";

function BureauMuri() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Bureau Murisserie</h1>
        <p className={`title2`}>Voici le plan du Bureau de la Murisserie :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/BureauMurisserie.png"
            alt="Bureau Murisserie"
          />
          <PcIcons />
          <ImpCopIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default BureauMuri;
