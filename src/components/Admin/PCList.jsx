import { List, Datagrid, TextField } from "react-admin";

const PCList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="Nom_PC" label="Nom du PC" />
      <TextField source="SN" label="Numéro de Série" />
      <TextField source="IP_Wifi" label="Adresse IP Wifi" />
      <TextField source="IP_Filaire" label="Adresse IP Filaire" />
      <TextField source="Prise" label="Prise" />
    </Datagrid>
  </List>
);

export default PCList;
