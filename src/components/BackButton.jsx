import styles from "./BackButton.module.scss";

function BackButton() {
  return (
    <div className={`${styles.back}`}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}

export default BackButton;
