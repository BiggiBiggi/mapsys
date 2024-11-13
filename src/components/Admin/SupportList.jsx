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

const supportFilters = [<TextInput source="q" label="Rechercher" alwaysOn />];

const ListActions = () => (
  <TopToolbar>
    <CreateButton label="Ajouter une Imprimante" />
    <ExportButton label="Exporter" />
  </TopToolbar>
);

export const SupportList = () => (
  <List
    actions={<ListActions />}
    filters={supportFilters}
    sort={{ field: "Nom_IMP", order: "ASC" }}
    pagination={<MyPagination />}
  >
    <Datagrid rowClick={false}>
      <TextField source="id" label="ID" />
      <TextField source="Nom_IMP" label="Nom de l'Imprimante" />
      <TextField source="AdresseIp" label="Adresse IP" />
      <TextField source="SN" label="Numéro de Série" />
      <TextField source="LieuxAffectation" label="Emplacement" />
      <TextField source="Type" label="Modèle" />
      <EditButton label="Modifier" />
      <DeleteButton label="Supprimer" />
    </Datagrid>
  </List>
);

export const SupportEdit = () => (
  <Edit title="Modification Imprimante Support">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="id" label="ID" disabled />
      <TextInput source="Nom_IMP" label="Nom de l'Imprimante" />
      <TextInput source="AdresseIp" label="Adresse IP" />
      <TextInput source="SN" label="Numéro de Série" />
      <TextInput source="LieuxAffectation" label="Emplacement" />
      <TextInput source="Type" label="Modèle" />
    </SimpleForm>
  </Edit>
);

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton label="Enregistrer" />
  </Toolbar>
);

export const SupportCreate = () => (
  <Create title="Création Imprimante Support" notification={false}>
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="Nom_IMP" label="Nom de l'Imprimante" />
      <TextInput source="AdresseIp" label="Adresse IP" />
      <TextInput source="SN" label="Numéro de Série" />
      <TextInput source="LieuxAffectation" label="Emplacement" />
      <TextInput source="Type" label="Modèle" />
    </SimpleForm>
  </Create>
);
