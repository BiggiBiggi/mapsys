import PcIcons from "/src/components/Icons/Cellule11/PcIcons";
import styles from "./Cellule11.module.scss";
import ImpSupIcons from "/src/components/Icons/Cellule11/ImpSupIcons.jsx";
import ClickableZone from "./ClickableZone";
import BackButton from "../../BackButton";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function Cellule11() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 11</h1>
        <p className={`title2`}>Voici le plan de la cellule 11 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`${styles.imageContainer}`}>
          <img
            className={`card-rect ${styles.img} `}
            src="/src/assets/images/cellule11.png"
            alt="Cellule 11"
          />
          <ClickableZone />
          <PcIcons />
          <ImpSupIcons />
          <DeviceManagerWrapper planId="cellule11" />
        </div>
      </div>
    </>
  );
}

export default Cellule11;
