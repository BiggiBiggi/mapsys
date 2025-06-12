import ImpCopieurs from "/src/components/API/ImpCopieurs";
import { useState } from "react";
import styles from "./ImpCopIcons.module.scss";
import ImpCop from "/src/assets/images/ImpCopieur.png";

function ImpCopIcons() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredImpId, setHoveredImpId] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null); // État pour savoir quel icône est survolé

  function handleMouseOver(id, icon) {
    setHoveredImpId(id);
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
            "http://172.27.238.101/web/guest/fr/websys/webArch/mainFrame.cgi"
          )
        }
        onMouseOver={() => handleMouseOver(33, "imp1")}
        onMouseOut={handleMouseOut}
        className={`${styles.imp1} ${styles.iconImp}`}
        src={ImpCop}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.238.114/web/guest/fr/websys/webArch/mainFrame.cgi"
          )
        }
        onMouseOver={() => handleMouseOver(35, "imp2")}
        onMouseOut={handleMouseOut}
        className={`${styles.imp2} ${styles.iconImp}`}
        src={ImpCop}
      />
      {/* Tooltip dynamique, affiché uniquement pour l'icône survolé */}
      {showTooltip && hoveredIcon && (
        <div className={`${styles.mouseHover} ${styles[hoveredIcon]}`}>
          <ImpCopieurs
            id={hoveredImpId}
            showNomImp={true}
            showModel={true}
            showIP={true}
            showSN={true}
            showNomInf={true}
          />
        </div>
      )}
    </div>
  );
}

export default ImpCopIcons;
