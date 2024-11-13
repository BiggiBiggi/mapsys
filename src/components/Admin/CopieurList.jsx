/* eslint-disable react/jsx-key */
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  SimpleForm,
  Edit,
  TextInput,
  Create,
  DeleteButton,
  Toolbar,
  SaveButton,
  TopToolbar,
  CreateButton,
  ExportButton,
} from "react-admin";
import { MyPagination } from "./Theme/MyPagination";

const CopieurFilters = [<TextInput source="q" label="Rechercher" alwaysOn />];

const ListActions = () => (
  <TopToolbar>
    <CreateButton label="Ajouter une Imprimante" />
    <ExportButton label="Exporter" />
  </TopToolbar>
);

export const CopieurList = () => (
  <List
    actions={<ListActions />}
    filters={CopieurFilters}
    sort={{ field: "NomImpServeur", order: "ASC" }}
    pagination={<MyPagination />}
  >
    <Datagrid rowClick={false}>
      <TextField source="id" label="ID" />
      <TextField source="NomImpServeur" label="Nom du Copieur" />
      <TextField source="Lieux" label="Lieux" />
      <TextField source="Model" label="Modèle" />
      <TextField source="AdresseIp" label="Adresse IP" />
      <TextField source="NomInfolog" label="Nom Infolog" />
      <EditButton label="Modifier" />
      <DeleteButton label="Supprimer" />
    </Datagrid>
  </List>
);

export const CopieurEdit = () => (
  <Edit title="Modification Imprimante Copieuse">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="id" label="ID" disabled />
      <TextInput source="NomImpServeur" label="Nom du Copieur" />
      <TextInput source="Lieux" label="Lieux" />
      <TextInput source="Model" label="Modèle" />
      <TextInput source="AdresseIp" label="Adresse IP" />
      <TextInput source="NomInfolog" label="Nom Infolog" />
    </SimpleForm>
  </Edit>
);

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton label="Enregistrer" />
  </Toolbar>
);

export const CopieurCreate = () => (
  <Create title="Création Imprimante Copieuse" notification={false}>
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="NomImpServeur" label="Nom du Copieur" />
      <TextInput source="Lieux" label="Lieux" />
      <TextInput source="Model" label="Modèle" />
      <TextInput source="AdresseIp" label="Adresse IP" />
      <TextInput source="NomInfolog" label="Nom Infolog" />
    </SimpleForm>
  </Create>
);
