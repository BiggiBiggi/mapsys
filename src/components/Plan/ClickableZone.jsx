import styles from "./ClickableZone.module.scss";
import { Link } from "react-router-dom";

function ClickableZone() {
  const zonesCliquables = [
    {
      id: 1,
      place: `${styles.cellule6}`,
      image: "src/assets/images/cellule6.png",
      link: "cellule6",
      name: "Cellule 6",
      display: true,
    },
    {
      id: 2,
      place: `${styles.cellule7}`,
      image: "src/assets/images/cellule7.png",
      link: "cellule7",
      name: "Cellule 7",
      display: true,
    },
    {
      id: 3,
      place: `${styles.cellule8}`,
      image: "src/assets/images/cellule8.png",
      name: "Cellule 8",
      link: "cellule8",
      display: true,
    },
    {
      id: 4,
      place: `${styles.cellule9}`,
      image: "src/assets/images/cellule9.png",
      link: "cellule9",
      name: "Cellule 9",
      display: true,
    },
    {
      id: 5,
      place: `${styles.cellule10}`,
      image: "src/assets/images/cellule10.png",
      link: "cellule10",
      name: "Cellule 10",
      display: true,
    },
    {
      id: 6,
      place: `${styles.cellule11}`,
      image: "src/assets/images/cellule11.png",
      link: "cellule11",
      name: "Cellule 11",
      display: true,
    },
    {
      id: 7,
      place: `${styles.cellule12}`,
      image: "src/assets/images/cellule12.png",
      link: "cellule12",
      name: "Cellule 12",
      display: true,
    },
    {
      id: 8,
      place: `${styles.cellule13}`,
      image: "src/assets/images/cellule13.png",
      link: "cellule13",
      name: "Cellule 13",
      display: true,
    },
    {
      id: 9,
      place: `${styles.airePalettes}`,
      image: "src/assets/images/airePalettes.png",
      link: "airePalettes",
      name: "Aire Palettes",
      display: true,
    },
    {
      id: 10,
      place: `${styles.pdg}`,
      image: "src/assets/images/pdg.png",
      link: "pdg",
      name: "PDG",
      display: false,
    },
    {
      id: 11,
      place: `${styles.ffl}`,
      image: "src/assets/images/FFL.png",
      link: "ffl",
      name: "FFL",
      display: true,
    },
    {
      id: 12,
      place: `${styles.meca}`,
      image: "src/assets/images/MECA.png",
      link: "meca",
      name: "MECA",
      display: true,
    },
    {
      id: 13,
      place: `${styles.gelCellule1}`,
      image: "src/assets/images/gelCellule1.png",
      link: "gelCellule1",
      name: "Gel Cellule 1",
      display: true,
    },
    {
      id: 14,
      place: `${styles.gelCellule2}`,
      image: "src/assets/images/gelCellule2.png",
      link: "gelCellule2",
      name: "Gel Cellule 2",
      display: true,
    },
    {
      id: 15,
      place: `${styles.bureaux}`,
      image: "src/assets/images/administratif.png",
      link: "administratif",
      name: "Admin",
      display: false,
    },
    {
      id: 16,
      place: `${styles.zoneContenants}`,
      image: "src/assets/images/zoneContenants.png",
      link: "zoneContenants",
      name: "Zone Contenants",
      display: true,
    },
  ];

  return (
    <div>
      {zonesCliquables.map((zones) => (
        <Link
          key={zones.id}
          className={`${styles.clickableZone} ${zones.place}`}
          to={zones.link} // Utilisez 'to' pour les liens internes
        >
          {zones.display ? <p>{zones.name}</p> : ""}
        </Link>
      ))}
      <p className={`${styles.txtPDG}`}>Poste de Garde</p>
      <p className={`${styles.txtAdministratif}`}>Administratif</p>
    </div>
  );
}

export default ClickableZone;
