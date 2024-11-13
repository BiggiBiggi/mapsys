import { AppBar, TitlePortal } from "react-admin";
import Box from "@mui/material/Box";
import mapsys from "/src/assets/images/mapsys.png";
import { Link } from "react-router-dom";

import styles from "./MyAppBar.module.scss";

export const MyAppBar = () => (
  <AppBar
    sx={{
      backgroundColor: "var(--gray-1)",
      color: "var(--primary)",
      "& .RaAppBar-toolbar": { padding: 0 },
    }}
  >
    <TitlePortal />
    <Link to="/">
      <img className={`${styles.logo}`} src={mapsys} alt="Logo MapSys" />
    </Link>
    <Link className={`${styles.txt}`} to="/">
      <h1>MapSys</h1>
    </Link>
    <Box flex="1" />
  </AppBar>
);
