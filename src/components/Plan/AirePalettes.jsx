import BackButton from "../BackButton";

function AirePalettes() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center divTitle`}
      >
        <BackButton />
        <h1 className={`title`}>Aire Palettes</h1>
        <p className={`title2`}>Voici le plan de l&apos;Aire Palettes :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <div className={`imageContainer`}>
          <img
            className={`card-rect img`}
            src="/src/assets/images/airePalettes.png"
            alt="Aire Palettes"
          />
        </div>
      </div>
    </>
  );
}

export default AirePalettes;
