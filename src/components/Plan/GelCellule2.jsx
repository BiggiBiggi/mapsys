import BackButton from "../BackButton";

function GelCellule2() {
  return (
    <div className={`container`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center`}
      >
        <BackButton />
        <h1 className="my-30">Gel Cellule 2</h1>
        <p>Voici le plan de la Cellule 2 au Gel :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center `}
      >
        <img src="src\assets\images\gelCellule2.png" alt="Gel Cellule 2" />
      </div>
    </div>
  );
}

export default GelCellule2;
