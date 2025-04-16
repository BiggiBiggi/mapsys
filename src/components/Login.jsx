import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo_inter.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      sessionStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/";
    } catch (err) {
      setError("Nom d’utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.container}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Connexion</h2>
        <h2 className={styles.title2}>MapSys</h2>
        <span className={styles.span}></span>
        <form onSubmit={handleLogin}>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.passwordContainer}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button className={styles.connect} type="submit">
            Se connecter
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <div className={styles.footer}>
          <p>
            © 2025 Service Informatique. <br />
            ITMLAI Base de Castets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
