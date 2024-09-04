import styles from "./ClickableZone.module.scss";

function ClickableZone() {
  const zonesCliquables = [
    {
      id: 1,
      place: `${styles.cellule6}`,
      link: "https://google.com",
      name: "Cellule 6",
      display: true,
    },
    {
      id: 2,
      place: `${styles.cellule7}`,
      link: "https://google.com",
      name: "Cellule 7",
      display: true,
    },
    {
      id: 3,
      place: `${styles.cellule8}`,
      link: "https://google.com",
      name: "Cellule 8",
      display: true,
    },
    {
      id: 4,
      place: `${styles.cellule9}`,
      link: "https://google.com",
      name: "Cellule 9",
      display: true,
    },
    {
      id: 5,
      place: `${styles.cellule10}`,
      link: "https://google.com",
      name: "Cellule 10",
      display: true,
    },
    {
      id: 6,
      place: `${styles.cellule11}`,
      link: "https://google.com",
      name: "Cellule 11",
      display: true,
    },
    {
      id: 7,
      place: `${styles.cellule12}`,
      link: "https://google.com",
      name: "Cellule 12",
      display: true,
    },
    {
      id: 8,
      place: `${styles.cellule13}`,
      link: "https://google.com",
      name: "Cellule 13",
      display: true,
    },
    {
      id: 9,
      place: `${styles.airePalette}`,
      link: "https://google.com",
      name: "Aire Palette",
      display: true,
    },
    {
      id: 10,
      place: `${styles.pdg}`,
      link: "https://google.com",
      name: "PDG",
      display: false,
    },
    {
      id: 11,
      place: `${styles.ffl}`,
      link: "https://google.com",
      name: "FFL",
      display: true,
    },
    {
      id: 12,
      place: `${styles.meca}`,
      link: "https://google.com",
      name: "MECA",
      display: true,
    },
    {
      id: 13,
      place: `${styles.gelCellule1}`,
      link: "https://google.com",
      name: "Gel Cellule 1",
      display: true,
    },
    {
      id: 14,
      place: `${styles.gelCellule2}`,
      link: "https://google.com",
      name: "Gel Cellule 2",
      display: true,
    },
    {
      id: 15,
      place: `${styles.bureaux}`,
      link: "https://google.com",
      name: "Admin",
      display: false,
    },
    {
      id: 16,
      place: `${styles.zoneContenants}`,
      link: "https://google.com",
      name: "Zone Contenants",
      display: true,
    },
  ];

  return (
    <div>
      {zonesCliquables.map((zones) => (
        <a
          key={zones.id}
          className={`${styles.clickableZone} ${zones.place}`}
          href={`${zones.link}`}
          target="_blank"
        >
          {zones.display ? <p>{zones.name}</p> : ""}
        </a>
      ))}
      <p className={`${styles.txtPDG}`}>Poste de Garde</p>
      <p className={`${styles.txtAdministratif}`}>Administratif</p>
    </div>
  );
}

export default ClickableZone;
