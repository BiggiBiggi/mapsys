import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer
      className={`${styles.footer} align-items-center justify-content-center d-flex flex-row p-20`}
    >
      <p>Copyright © 2024 Service Informatique, ITMLAI Base de Castets.</p>
    </footer>
  );
}

export default Footer;
