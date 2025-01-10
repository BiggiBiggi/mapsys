import glpi from "/src/assets/images/glpi.png";
import ocs from "/src/assets/images/ocs.png";
import oasis from "/src/assets/images/oasis.png";
import copieur from "/src/assets/images/copieur.png";
import support from "/src/assets/images/support.png";
import ordi from "/src/assets/images/ordi.png";
import styles from "./LienExternes.module.scss";
import { Link } from "react-router-dom";

function Liens() {
  return (
    <>
      <div className={`${styles.linksContainer}`}>
        <div className={`${styles.internLinks} m-30 p-10`}>
          <div>
            <h2>
              <u>Liens Internes :</u>
            </h2>
          </div>
          <div>
            <Link to={"/admin/imp_copieurs"}>
              <img src={copieur} alt="Logo Imprimantes Copieur" />
            </Link>
            <Link to={"/admin/imp_support"}>
              <img src={support} alt="Logo Imprimantes Support" />
            </Link>
            <Link to={"/admin/pc_glpi"}>
              <img src={ordi} alt="Logo Imprimantes Support" />
            </Link>
          </div>
        </div>
        <div className={`${styles.externLinks} m-30 p-10`}>
          <div>
            <h2>
              <u>Liens Externes :</u>
            </h2>
            <a
              href="http://172.27.38.34/glpi/front/central.php"
              target="_blank"
            >
              <img src={glpi} alt="Logo GLPI" />
            </a>
            <a
              href="https://ocs-groupement/ocsreports/index.php"
              target="_blank"
            >
              <img src={ocs} alt="Logo OCS" />
            </a>
            <a
              href="https://mousquetaires.service-now.com/now/nav/ui/classic/params/target/%2Fhome.do%3F"
              target="_blank"
            >
              <img src={oasis} alt="Logo Oasis" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Liens;
