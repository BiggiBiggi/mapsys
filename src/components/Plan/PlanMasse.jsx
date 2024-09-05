import planBase from "/src/assets/images/plan_base.png";
import ClickableZone from "./ClickableZone";
import styles from "./PlanMasse.module.scss";

function PlanMasse() {
  return (
    <div className={`container`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center`}
      >
        <h1 className="my-30">Plan de masse</h1>
        <p>Cliquez pour agrandir une zone !</p>
      </div>
      <div className={styles.imageWrapper}>
        <img
          className={`d-flex flex-fill align-items-center justify-content-center ${styles.planImage}`}
          src={planBase}
          alt="Plan Base"
        />
        <ClickableZone />
      </div>
    </div>
  );
}

export default PlanMasse;
