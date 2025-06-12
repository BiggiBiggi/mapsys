import PcGLPI from "/src/components/API/PcGLPI";
import { useState } from "react";
import styles from "./PcIcons.module.scss";
import pcPort from "/src/assets/images/pcPortable.png";

function PcIcons() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredPcId, setHoveredPcId] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null); // État pour savoir quel icône est survolé

  function handleMouseOver(id, icon) {
    setHoveredPcId(id);
    setHoveredIcon(icon); // Définir l'icône survolé
    setShowTooltip(true);
  }

  function handleMouseOut() {
    setShowTooltip(false);
    setHoveredIcon(null); // Réinitialiser l'icône survolé
  }

  function openLink(url, id) {
    const dynamicUrl = `${url}${id}`;
    window.open(dynamicUrl, "_blank");
  }

  return (
    <div>
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(178, "pc1")}
        onMouseOut={handleMouseOut}
        className={`${styles.pc1} ${styles.iconPort}`}
        src={pcPort}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(105, "pc2")}
        onMouseOut={handleMouseOut}
        src={pcPort}
        className={`${styles.iconPort} ${styles.pc2}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(169, "pc3")}
        onMouseOut={handleMouseOut}
        src={pcPort}
        className={`${styles.iconPort} ${styles.pc3}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(55, "pc4")}
        onMouseOut={handleMouseOut}
        src={pcPort}
        className={`${styles.iconPort} ${styles.pc4}`}
      />
      {/* Tooltip dynamique, affiché uniquement pour l'icône survolé */}
      {showTooltip && hoveredIcon && (
        <div className={`${styles.mouseHover} ${styles[hoveredIcon]}`}>
          <PcGLPI
            id={hoveredPcId}
            showNom={true}
            showSN={true}
            showIpWifi={true}
            showIpFilaire={true}
            showPrise={true}
          />
        </div>
      )}
    </div>
  );
}

export default PcIcons;
