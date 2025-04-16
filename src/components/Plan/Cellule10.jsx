import PcIcons from "/src/components/Icons/Cellule10/PcIcons";
import ImpSupIcons from "../Icons/Cellule10/ImpSupIcons";
import BackButton from "../BackButton";
import DeviceManagerWrapper from "../DeviceManagerWrapper";

function Cellule10() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 10</h1>
        <p className={`title2`}>Voici le plan de la cellule 10 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/cellule10.png"
            alt="Cellule 10"
          />
          <PcIcons />
          <ImpSupIcons />
          <DeviceManagerWrapper planId="cellule10" />
        </div>
      </div>
    </>
  );
}

export default Cellule10;
