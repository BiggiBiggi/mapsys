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
        onClick={() => openLink("http://172.27.238.10/")}
        onMouseOver={() => handleMouseOver(1, "ME01")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME01} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.11/")}
        onMouseOver={() => handleMouseOver(6, "ME02")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME02} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.12/")}
        onMouseOver={() => handleMouseOver(7, "ME03")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME03} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.13/")}
        onMouseOver={() => handleMouseOver(8, "ME04")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME04} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.14/")}
        onMouseOver={() => handleMouseOver(9, "ME05")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME05} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.16/")}
        onMouseOver={() => handleMouseOver(10, "ME07")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME07} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.17/")}
        onMouseOver={() => handleMouseOver(11, "ME08")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME08} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.18/")}
        onMouseOver={() => handleMouseOver(12, "ME09")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME09} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.19/")}
        onMouseOver={() => handleMouseOver(13, "ME10")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME10} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.20/")}
        onMouseOver={() => handleMouseOver(14, "ME11")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME11} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.21/")}
        onMouseOver={() => handleMouseOver(15, "ME12")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME12} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.22/")}
        onMouseOver={() => handleMouseOver(16, "ME13")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME13} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.23/")}
        onMouseOver={() => handleMouseOver(17, "ME14")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME14} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.24/")}
        onMouseOver={() => handleMouseOver(18, "ME15")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME15} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.25/")}
        onMouseOver={() => handleMouseOver(19, "ME16")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME16} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.28/")}
        onMouseOver={() => handleMouseOver(20, "ME17")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME17} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.29/")}
        onMouseOver={() => handleMouseOver(21, "ME18")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME18} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.31/")}
        onMouseOver={() => handleMouseOver(22, "ME20")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME20} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.100/")}
        onMouseOver={() => handleMouseOver(2, "ME21")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME21} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.101/")}
        onMouseOver={() => handleMouseOver(3, "ME22")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME22} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.102/")}
        onMouseOver={() => handleMouseOver(4, "ME23")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME23} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.103/")}
        onMouseOver={() => handleMouseOver(5, "ME24")}
        onMouseOut={handleMouseOut}
        className={`${styles.ME24} ${styles.iconImp}`}
        src={ImpSup}
      />
      <img
        onClick={() => openLink("http://172.27.238.103/")}
        onMouseOver={() => handleMouseOver(24, "I06820V1")}
        onMouseOut={handleMouseOut}
        className={`${styles.I06820V1} ${styles.iconImp}`}
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
