import BackButton from "../BackButton";
import DeviceManagerWrapper from "../DeviceManagerWrapper";

function Cellule12() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 12</h1>
        <p className={`title2`}>Voici le plan de la cellule 12 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/cellule12.png"
            alt="Cellule 12"
          />
          <DeviceManagerWrapper planId="cellule12" />
        </div>
      </div>
    </>
  );
}

export default Cellule12;
