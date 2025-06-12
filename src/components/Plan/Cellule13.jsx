import PcIcons from "/src/components/Icons/Cellule13/PcIcons";
import ImpCopIcons from "../Icons/Cellule13/ImpCopIcons";
import BackButton from "../BackButton";
import DeviceManagerWrapper from "../DeviceManagerWrapper";

function Cellule13() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 13</h1>
        <p className={`title2`}>Voici le plan de la cellule 13 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/Cellule13.png"
            alt="Cellule 13"
          />
          <PcIcons />
          <ImpCopIcons />
          <DeviceManagerWrapper planId="cellule13" />
        </div>
      </div>
    </>
  );
}

export default Cellule13;
