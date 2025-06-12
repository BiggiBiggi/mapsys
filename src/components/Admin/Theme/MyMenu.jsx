import { Menu } from "react-admin";

import PrintIcon from "@mui/icons-material/Print";
import PCIcon from "@mui/icons-material/ComputerTwoTone";

export const MyMenu = () => (
  <Menu
    sx={{
      "& .RaMenuItemLink-icon": {
        color: "#08cee1",
      },
      "& .RaMenuItemLink-active": {
        color: "#08cee1",
      },
    }}
  >
    <Menu.Item
      to="/admin/imp_copieurs"
      primaryText="Imprimantes Copieur"
      leftIcon={<PrintIcon />}
    />
    <Menu.Item
      to="/admin/imp_support"
      primaryText="Imprimantes Support"
      leftIcon={<PrintIcon />}
    />
    <Menu.Item
      to="/admin/pc_glpi"
      primaryText="Ordinateurs"
      leftIcon={<PCIcon />}
    />
  </Menu>
);
