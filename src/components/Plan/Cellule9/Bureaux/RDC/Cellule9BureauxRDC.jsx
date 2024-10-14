import PcIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/PcIcons";
import styles from "./Cellule9BureauxRDC.module.scss";
import ImpCopIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/ImpCopIcons";
import BackButton from "/src/components/BackButton";

function Cellule9BureauxRDC() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 9</h1>
        <p className={`title2`}>
          Voici le plan des bureaux N de la Cellule 9 :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/bureauxCellule9RDC.png"
            alt="Bureaux RDC Cellule 9"
          />
          <h3 className={`${styles.name1}`}>Réception SEC</h3>
          <h3 className={`${styles.name2}`}>Stocks</h3>
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule9BureauxRDC;
