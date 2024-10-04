import BackButton from "../BackButton";

function Meca() {
  return (
    <div className={`container`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center`}
      >
        <BackButton />
        <h1 className="my-30">MECA</h1>
        <p>Voici le plan de la MECA :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center `}
      >
        <img src="src\assets\images\MECA.png" alt="MECA" />
      </div>
    </div>
  );
}

export default Meca;
