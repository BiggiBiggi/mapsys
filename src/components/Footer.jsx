import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer
      className={`${styles.footer} align-items-center justify-content-center d-flex flex-row p-10`}
    >
      <p>Copyright © 2025 Freland Benjamin, ITMLAI Base de Castets.</p>
    </footer>
  );
}

export default Footer;
