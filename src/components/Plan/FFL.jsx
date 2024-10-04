import BackButton from "../BackButton";

function Ffl() {
  return (
    <div className={`container`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center`}
      >
        <BackButton />
        <h1 className="my-30">FFL</h1>
        <p>Voici le plan du FFL :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center `}
      >
        <img src="src\assets\images\FFL.png" alt="FFL" />
      </div>
    </div>
  );
}

export default Ffl;
