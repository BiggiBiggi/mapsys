import { List, Datagrid, TextField } from "react-admin";

const CopieurList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="Nom_IMP_Serveur" label="Nom du Copieur" />
      <TextField source="Lieux" label="Lieux" />
      <TextField source="Model" label="Modèle" />
      <TextField source="Adresse_IP" label="Adresse IP" />
    </Datagrid>
  </List>
);

export default CopieurList;
