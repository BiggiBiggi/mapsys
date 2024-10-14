import planBase from "/src/assets/images/plan_base.png";
import ClickableZone from "./ClickableZone";
import styles from "./PlanMasse.module.scss";
import logo from "/src/assets/images/logo_inter.png";

function PlanMasse() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center ${styles.divLogo} justify-content-center`}
      >
        <img
          className={`${styles.logo} d-flex justify-content-center align-item-center`}
          src={logo}
          alt="Logo Intermarché"
        />
      </div>
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
    </>
  );
}

export default PlanMasse;
