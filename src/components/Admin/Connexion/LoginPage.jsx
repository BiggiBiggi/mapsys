import styles from "./LoginPage.module.scss";

function LoginPage() {
  return (
    <div className={`${styles.content}`}>
      <form action="" method="post">
        <div className={`${styles.container}`}>
          <div className={`${styles.log}`}>
            <input type="text" placeholder="Nom d'utilisateur" required />
          </div>
          <div className={`${styles.log}`}>
            <input type="password" placeholder="Mot de passe" required />
          </div>
          <div className={`${styles.loginButton}`}>
            <button type="submit">SE CONNECTER</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
