import planBase from "../assets/images/plan_base.png";
import ClickableZone from "./ClickableZone";
import styles from "./Content.module.scss";

function Content() {
  return (
    <div className={`container`}>
      <h1 className="my-30">Plan de masse</h1>
      <p>Cliquez pour agrandir une zone !</p>
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

export default Content;
