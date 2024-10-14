import PcIcons from "/src/components/Icons/Administratif/PcIcons";
import ImpCopIcons from "../Icons/Administratif/ImpCopIcons";
import ImpSupIcons from "../Icons/Administratif/ImpSupIcons";
import BackButton from "../BackButton";

function Administratif() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Administratif</h1>
        <p className={`title2`}>Voici le plan de l&apos;Administratif :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`imageContainer`}>
          <img
            className={`card-rect img`}
            src="/src/assets/images/administratif.png"
            alt="Administratif"
          />
          <PcIcons />
          <ImpCopIcons />
          <ImpSupIcons />
        </div>
      </div>
    </>
  );
}

export default Administratif;
