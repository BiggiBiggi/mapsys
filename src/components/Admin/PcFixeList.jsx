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

const PcFixeFilters = [
  <TextInput source="q" label="Rechercher" alwaysOn resettable={true} />,
];

const ListActions = () => (
  <TopToolbar>
    <CreateButton label="Ajouter un PC Fixe" />
    <ExportButton label="Exporter" />
  </TopToolbar>
);

export const PcFixeList = () => (
  <List
    actions={<ListActions />}
    filters={PcFixeFilters}
    sort={{ field: "nom", order: "ASC" }}
    pagination={<MyPagination />}
    filter={{ type: "PC Fixe" }} // filtre automatique par type
  >
    <Datagrid rowClick={false}>
      <TextField source="id_eqts" label="ID" />
      <TextField source="nom" label="Nom du PC" />
      <TextField source="sn" label="Numéro de série" />
      <TextField source="prise" label="Prise" />
      <TextField source="model" label="Modèle" />
      <TextField source="type" label="Type" />
      <EditButton label="Modifier" />
      <DeleteButton label="Supprimer" mutationMode="pessimistic" />
    </Datagrid>
  </List>
);

export const PcFixeEdit = () => (
  <Edit title="Modification PC Fixe">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="id_eqts" label="ID" disabled />
      <TextInput source="nom" label="Nom du PC" />
      <TextInput source="sn" label="Numéro de série" />
      <TextInput source="prise" label="Prise" />
      <TextInput source="model" label="Modèle" />
      <TextInput source="type" label="Type" />
    </SimpleForm>
  </Edit>
);

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton label="Enregistrer" />
  </Toolbar>
);

export const PcFixeCreate = () => (
  <Create title="Création PC Fixe">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="nom" label="Nom du PC" />
      <TextInput source="sn" label="Numéro de série" />
      <TextInput source="prise" label="Prise" />
      <TextInput source="model" label="Modèle" />
      <TextInput source="type" label="Type" defaultValue="PC Fixe" />
    </SimpleForm>
  </Create>
);
