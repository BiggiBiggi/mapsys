import planBase from "/src/assets/images/plan_base.png";
import ClickableZone from "./ClickableZone";
import styles from "./PlanMasse.module.scss";
import logo from "/src/assets/images/logo_inter.png";
import Base from "/src/assets/images/photoBase.png";
import ITMLAI from "/src/assets/images/ITMLAI.png";
import OfflineIPs from "./PingIp";
import Liens from "./LienExternes";

function PlanMasse() {
  return (
    <>
      <div className={`d-flex flex-row  ${styles.divLogo} m-30`}>
        <div className={`${styles.logo} d-flex `}>
          <img src={logo} alt="Logo Intermarché" />
        </div>
        <div className={`${styles.base} center d-flex `}>
          <img src={Base} alt="Photo Base" />
        </div>
        <div className={`${styles.itmlai} center d-flex `}>
          <img src={ITMLAI} alt="ITMLAI Base Intermarché de Castets" />
        </div>
      </div>
      <Liens />
      <div className={`${styles.imageWrapper} container`}>
        <img
          className={`d-flex flex-fill align-items-center justify-content-center card-masse ${styles.planImage}`}
          src={planBase}
          alt="Plan Base"
        />
        <h1 className={`${styles.title}`}>Plan de masse :</h1>
        <p className={`${styles.title2}`}>Cliquez pour agrandir une zone !</p>
        <ClickableZone />
      </div>
      <OfflineIPs />
    </>
  );
}

export default PlanMasse;
