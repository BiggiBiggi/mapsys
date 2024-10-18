import PcGLPI from "/src/components/API/PcGLPI";
import { useState } from "react";
import styles from "./PcIcons.module.scss";
import pcFixe from "/src/assets/images/pcFixe.png";
import pcPortable from "/src/assets/images/pcPortable.png";

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
        onMouseOver={() => handleMouseOver(48, "pc1")}
        onMouseOut={handleMouseOut}
        className={`${styles.pc1} ${styles.iconFixe}`}
        src={pcFixe}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(114, "pc2")}
        onMouseOut={handleMouseOut}
        className={`${styles.pc2} ${styles.iconPort}`}
        src={pcPortable}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(50, "pc3")}
        onMouseOut={handleMouseOut}
        className={`${styles.pc3} ${styles.iconFixe}`}
        src={pcFixe}
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
