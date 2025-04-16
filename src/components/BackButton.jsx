import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={`${styles.back}`}>
      <i className="fa-solid fa-arrow-left"></i>
    </button>
  );
}
export default BackButton;
