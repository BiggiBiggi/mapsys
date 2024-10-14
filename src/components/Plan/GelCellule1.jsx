import PcIcons from "/src/components/Icons/GelCellule1/PcIcons";
import ImpSupIcons from "../Icons/GelCellule1/ImpSupIcons";
import ImpCopIcons from "../Icons/GelCellule1/ImpCopIcons";
import BackButton from "../BackButton";

function GelCellule1() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Gel Cellule 1</h1>
        <p className={`title2`}>Voici le plan du Gel cellule 1 :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className="imageContainer">
          <img
            className={`card-rect img`}
            src="/src/assets/images/GelCellule1.png"
            alt="Gel Cellule 1"
          />
          <PcIcons />
          <ImpSupIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default GelCellule1;
