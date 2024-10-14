import PcIcons from "/src/components/Icons/Meca/PcIcons";
import ImpSupIcons from "../Icons/Meca/ImpSupIcons";
import ImpCopIcons from "../Icons/Meca/ImpCopIcons";
import BackButton from "../BackButton";

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
          <PcIcons />
          <ImpSupIcons />
          <ImpCopIcons />
        </div>
      </div>
    </>
  );
}

export default Meca;
