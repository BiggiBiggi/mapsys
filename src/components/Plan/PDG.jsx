import PcIcons from "/src/components/Icons/PDG/PcIcons";
import ImpSupIcons from "../Icons/PDG/ImpSupIcons";
import ImpCopIcons from "../Icons/PDG/ImpCopIcons";
import BackButton from "../BackButton";
import DeviceManagerWrapper from "../DeviceManagerWrapper";

function Pdg() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Poste de Garde</h1>
        <p className={`title2`}>Voici le plan du Poste de Garde:</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/PDG.png"
            alt="PDG"
          />
          <PcIcons />
          <ImpSupIcons />
          <ImpCopIcons />
          <DeviceManagerWrapper planId="pdg" />
        </div>
      </div>
    </>
  );
}

export default Pdg;
