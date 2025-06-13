import BackButton from "/src/components/BackButton.jsx";
import ClickableZone from "./ClickableZone";
import DeviceManagerWrapper from "/src/components/DeviceManagerWrapper";

function Meca() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Meca</h1>
        <p className={`title2`}>Voici le plan de la Meca :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/Meca.png"
            alt="Meca"
          />
          <ClickableZone />
          <DeviceManagerWrapper planId="meca" />
        </div>
      </div>
    </>
  );
}

export default Meca;
