// import ImpCopIcons from "../Icons/Cellule6/ImpCopIcons";
// import ImpSupIcons from "../Icons/Cellule6/ImpSupIcons";
import BackButton from "../BackButton";
import DeviceManagerWrapper from "../DeviceManagerWrapper";

function Cellule6() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 6</h1>
        <p className={`title2`}>Voici le plan de la cellule 6 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`imageContainer`}>
          <img
            className={`card img`}
            src="/src/assets/images/cellule6.png"
            alt="Cellule 6"
          />
          {/* <ImpCopIcons /> */}
          {/* <ImpSupIcons /> */}
          <DeviceManagerWrapper planId="cellule6" />
        </div>
      </div>
    </>
  );
}

export default Cellule6;
