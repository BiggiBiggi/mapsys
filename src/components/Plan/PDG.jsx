function Pdg() {
  return (
    <div className={`container`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center`}
      >
        <h1 className="my-30">Poste de Garde</h1>
        <p>Voici le plan du Poste de Garde :</p>
      </div>
      <div
        className={`d-flex flex-fill align-items-center justify-content-center `}
      >
        <img src="src\assets\images\pdg.png" alt="Poste de Garde" />
      </div>
    </div>
  );
}

export default Pdg;
