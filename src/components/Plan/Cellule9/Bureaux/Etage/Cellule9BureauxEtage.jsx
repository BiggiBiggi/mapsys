import PcIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/Etage/PcIcons";
import styles from "./Cellule9BureauxEtage.module.scss";
import ImpCopIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/Etage/ImpCopIcons";
import BackButton from "/src/components/BackButton";

function Cellule9BureauxEtage() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 9</h1>
        <p className={`title2`}>
          Voici le plan des Bureaux N+1 de la Cellule 9 :
        </p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/bureauxCellule9Etage.png"
            alt="Bureaux Etage Cellule 9"
          />
          <h3 className={`${styles.name1}`}>CIBE</h3>
          <h3 className={`${styles.name2}`}>Quais Flottants</h3>
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule9BureauxEtage;
