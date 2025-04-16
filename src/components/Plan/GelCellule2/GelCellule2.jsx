import PcIcons from "/src/components/Icons/GelCellule2/PcIcons";
import ImpSupIcons from "/src/components/Icons/GelCellule2/ImpSupIcons";
import BackButton from "/src/components/BackButton";
import ClickableZone from "./ClickableZone";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function GelCellule2() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Gel Cellule 2</h1>
        <p className={`title2`}>Voici le plan du Gel cellule 2 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/GelCellule2.png"
            alt="Gel Cellule 2"
          />
          <PcIcons />
          <ImpSupIcons />
          <ClickableZone />
          <DeviceManagerWrapper planId="gelcellule2" />
        </div>
      </div>
    </>
  );
}

export default GelCellule2;
