import BackButton from "../BackButton";
import styles from "./Administratif.module.scss";

function Administratif() {
  return (
    <>
      <div
        className={`d-flex flex-column align-items-center justify-content-center b1 ${styles.posDiv}`}
      >
        <BackButton />
        <h1 className={`${styles.title}`}>Administratif</h1>
        <p className={`${styles.title2}`}>
          Voici le plan de l&apos;administratif :
        </p>
        <img
          className={`d-flex flex-column align-items-center justify-content-center ${styles.planImage}`}
          src="src\assets\images\administratif.png"
          alt="Administratif"
        />
      </div>
    </>
  );
}

export default Administratif;
