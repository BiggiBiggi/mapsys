import BackButton from "../BackButton";

function AirePalettes() {
  return (
    <div className={`container`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center`}
      >
        <BackButton />
        <h1 className="my-30">Aire Palettes</h1>
        <p>Voici le plan de la zone Aire Palettes :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <img src="src\assets\images\airePalettes.png" alt="Aire Palettes" />
      </div>
    </div>
  );
}

export default AirePalettes;
