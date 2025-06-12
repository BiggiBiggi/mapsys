import PcIcons from "/src/components/Icons/FFL/PcIcons";
import styles from "./FFL.module.scss";
import ImpSupIcons from "../../Icons/FFL/ImpSupIcons";
import BackButton from "../../BackButton";
import ClickableZone from "./ClickableZone";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function Ffl() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>FFL</h1>
        <p className={`title2`}>Voici le plan du FFL :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={styles.imageContainer}>
          <img
            className={`card-rect ${styles.img}`}
            src="/src/assets/images/ffl.png"
            alt="FFL"
          />
          <PcIcons />
          <ImpSupIcons />
          <ClickableZone />
          <DeviceManagerWrapper planId="ffl" />
        </div>
      </div>
    </>
  );
}

export default Ffl;
