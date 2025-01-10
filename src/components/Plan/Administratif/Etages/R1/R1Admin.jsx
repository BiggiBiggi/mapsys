import PcIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/PcIcons";
import styles from "./R1Admin.module.scss";
import ImpCopIcons from "/src/components/Icons/Cellule9/Cellule9Bureaux/RDC/ImpCopIcons";
import BackButton from "/src/components/BackButton";

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
          {/* <h3 className={`${styles.name1}`}>Réception SEC</h3>
          <h3 className={`${styles.name2}`}>Stocks</h3> */}
          <PcIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default R1Admin;
