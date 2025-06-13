import styles from "./Cellule9.module.scss";
import ClickableZone from "./ClickableZone";
import BackButton from "/src/components/BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function Cellule9() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 9</h1>
        <p className={`title2`}>Voici le plan de la cellule 9 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img} `}
            src="/src/assets/images/cellule9.png"
            alt="Cellule 9"
          />
          <ClickableZone />
          <DeviceManagerWrapper planId="cellule9" />
        </div>
      </div>
    </>
  );
}

export default Cellule9;
