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
            "http://172.27.238.42/web/guest/fr/websys/webArch/mainFrame.cgi"
          )
        }
        onMouseOver={() => handleMouseOver(13, "imp1")}
        onMouseOut={handleMouseOut}
        className={`${styles.imp1} ${styles.iconImp}`}
        src={ImpCop}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.238.48/web/guest/fr/websys/webArch/mainFrame.cgi"
          )
        }
        onMouseOver={() => handleMouseOver(15, "imp2")}
        onMouseOut={handleMouseOut}
        src={ImpCop}
        className={`${styles.iconImp} ${styles.imp2}`}
      />
      <img
        onClick={() =>
          openLink(
            "http://172.27.238.49/web/guest/fr/websys/webArch/mainFrame.cgi"
          )
        }
        onMouseOver={() => handleMouseOver(14, "imp3")}
        onMouseOut={handleMouseOut}
        src={ImpCop}
        className={`${styles.iconImp} ${styles.imp3}`}
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
