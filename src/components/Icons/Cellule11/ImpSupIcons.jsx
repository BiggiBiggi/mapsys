import ImpSupports from "/src/components/API/ImpSupports";
import { useState } from "react";
import styles from "./ImpSupIcons.module.scss";
import ImpSup from "/src/assets/images/ImpSupport.png";

function ImpSupIcons() {
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

  function openLink(url) {
    const dynamicUrl = `${url}`;
    window.open(dynamicUrl, "_blank");
  }

  return (
    <div>
      <img
        onClick={() => openLink("http://172.27.238.139/")}
        onMouseOver={() => handleMouseOver(41, "imp1")}
        onMouseOut={handleMouseOut}
        className={`${styles.imp1} ${styles.iconImp}`}
        src={ImpSup}
      />
      {/* Tooltip dynamique, affiché uniquement pour l'icône survolé */}
      {showTooltip && hoveredIcon && (
        <div className={`${styles.mouseHover} ${styles[hoveredIcon]}`}>
          <ImpSupports
            id={hoveredImpId}
            showNomImp={true}
            showModel={true}
            showIP={true}
            showSN={true}
          />
        </div>
      )}
    </div>
  );
}

export default ImpSupIcons;
