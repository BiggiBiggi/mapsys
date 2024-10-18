import styles from "./ClickableZone.module.scss";
import { Link } from "react-router-dom";

function ClickableZone() {
  const zonesCliquables = [
    {
      id: 1,
      place: `${styles.ordo}`,
      link: "bureauOrdo",
      display: true,
    },
    {
      id: 2,
      place: `${styles.cefrais}`,
      link: "bureauCEFrais",
      display: true,
    },
    {
      id: 3,
      place: `${styles.bureaux}`,
      link: "bureaux",
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
        ></Link>
      ))}
    </div>
  );
}

export default ClickableZone;
