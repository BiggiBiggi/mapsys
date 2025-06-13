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
          <DeviceManagerWrapper planId="pdg" />
        </div>
      </div>
    </>
  );
}

export default Pdg;
