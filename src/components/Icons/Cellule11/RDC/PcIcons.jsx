import PcGLPI from "/src/components/API/PcGLPI";
import { useState } from "react";
import styles from "./PcIcons.module.scss";
import pcFixe from "/src/assets/images/pcFixe.png";

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
        onMouseOver={() => handleMouseOver(68, "pc1")}
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
        onMouseOver={() => handleMouseOver(67, "pc2")}
        onMouseOut={handleMouseOut}
        src={pcFixe}
        className={`${styles.iconFixe} ${styles.pc2}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(165, "pc3")}
        onMouseOut={handleMouseOut}
        src={pcFixe}
        className={`${styles.iconFixe} ${styles.pc3}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(65, "pc4")}
        onMouseOut={handleMouseOut}
        src={pcFixe}
        className={`${styles.iconFixe} ${styles.pc4}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(30, "pc5")}
        onMouseOut={handleMouseOut}
        src={pcFixe}
        className={`${styles.iconFixe} ${styles.pc5}`}
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
