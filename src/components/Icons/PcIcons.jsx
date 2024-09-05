import PcGLPI from "./PcGLPI";
import { useState } from "react";
import styles from "./PcIcons.module.scss";

function PcIcons() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredPcId, setHoveredPcId] = useState(null);
  function handleMouseOver(id) {
    setHoveredPcId(id);
    setShowTooltip(true);
  }

  function handleMouseOut() {
    setShowTooltip(false);
  }

  function openLink(url, id) {
    const dynamicUrl = `${url}${id}`;
    window.open(dynamicUrl, "_blank");
  }

  return (
    <div>
      <i
        onClick={() =>
          openLink(
            "http://172.27.38.34/glpi/front/computer.form.php?id=",
            hoveredPcId
          )
        }
        onMouseOver={() => handleMouseOver(123)}
        onMouseOut={handleMouseOut}
        className={`fa-solid fa-computer ${styles.icons} b1`}
      ></i>
      {showTooltip && (
        <div className={styles.mouseHover}>
          <PcGLPI
            id={hoveredPcId}
            showNom={true}
            showUtilisateur={true}
            showModel={true}
          />{" "}
        </div>
      )}
    </div>
  );
}

export default PcIcons;
