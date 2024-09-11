import PcGLPI from "../API/PcGLPI";
import { useState } from "react";
import styles from "./PcIcons.module.scss";
import pcPortable from "/src/assets/images/pcPortable.png";
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
        onMouseOver={() => handleMouseOver(100, "pc1")}
        onMouseOut={handleMouseOut}
        className={`${styles.pc1} ${styles.iconPort}`}
        src={pcPortable}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(108, "pc2")}
        onMouseOut={handleMouseOut}
        src={pcPortable}
        className={`${styles.iconPort} ${styles.pc2}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(168, "pc3")}
        onMouseOut={handleMouseOut}
        src={pcPortable}
        className={`${styles.iconPort} ${styles.pc3}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(89, "pc4")}
        onMouseOut={handleMouseOut}
        src={pcPortable}
        className={`${styles.iconPort} ${styles.pc4}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(101, "pc5")}
        onMouseOut={handleMouseOut}
        src={pcPortable}
        className={`${styles.iconPort} ${styles.pc5}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(99, "pc6")}
        onMouseOut={handleMouseOut}
        src={pcPortable}
        className={`${styles.iconPort} ${styles.pc6}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(79, "pc7")}
        onMouseOut={handleMouseOut}
        src={pcFixe}
        className={`${styles.iconFixe} ${styles.pc7}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(81, "pc8")}
        onMouseOut={handleMouseOut}
        src={pcFixe}
        className={`${styles.iconFixe} ${styles.pc8}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(80, "pc9")}
        onMouseOut={handleMouseOut}
        src={pcFixe}
        className={`${styles.iconFixe} ${styles.pc9}`}
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
          />
        </div>
      )}
    </div>
  );
}

export default PcIcons;
