import PcIcons from "/src/components/Icons/GelCellule2/PcIcons";
import ImpSupIcons from "../Icons/GelCellule2/ImpSupIcons";
import ImpCopIcons from "../Icons/GelCellule2/ImpCopIcons";
import BackButton from "../BackButton";

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
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default GelCellule2;
