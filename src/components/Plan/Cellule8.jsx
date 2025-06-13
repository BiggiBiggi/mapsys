import BackButton from "../BackButton";
import DeviceManagerWrapper from "../DeviceManagerWrapper";

function Cellule8() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 8</h1>
        <p className={`title2`}>Voici le plan de la cellule 8 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/cellule8.png"
            alt="Cellule 8"
          />
          <DeviceManagerWrapper planId="cellule8" />
        </div>
      </div>
    </>
  );
}

export default Cellule8;
