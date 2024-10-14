import PcIcons from "/src/components/Icons/Cellule7/PcIcons";
import ImpSupIcons from "../Icons/Cellule7/ImpSupIcons";
import BackButton from "../BackButton";

function Cellule7() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Cellule 7</h1>
        <p className={`title2`}>Voici le plan de la cellule 7 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`imageContainer`}>
          <img
            className={`card-rect img`}
            src="/src/assets/images/cellule7.png"
            alt="Cellule 7"
          />
          <PcIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default Cellule7;
