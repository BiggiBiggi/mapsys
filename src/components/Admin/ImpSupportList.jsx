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

const ImpSupFilters = [
  <TextInput source="q" label="Rechercher" alwaysOn resettable={true} />,
];

const ListActions = () => (
  <TopToolbar>
    <CreateButton label="Ajouter une Imprimante Support" />
    <ExportButton label="Exporter" />
  </TopToolbar>
);

export const ImpSupList = () => (
  <List
    actions={<ListActions />}
    filters={ImpSupFilters}
    sort={{ field: "nom", order: "ASC" }}
    pagination={<MyPagination />}
    filter={{ type: "Imprimante Support" }} // filtre automatique par type
  >
    <Datagrid rowClick={false}>
      <TextField source="id_eqts" label="ID" />
      <TextField source="nom" label="Nom de l'Imprimante" />
      <TextField source="sn" label="Numéro de série" />
      <TextField source="prise" label="Prise" />
      <TextField source="model" label="Modèle" />
      <TextField source="type" label="Type" />
      <EditButton label="Modifier" />
      <DeleteButton label="Supprimer" mutationMode="pessimistic" />
    </Datagrid>
  </List>
);

export const ImpSupEdit = () => (
  <Edit title="Modification Imprimante Support">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="id_eqts" label="ID" disabled />
      <TextInput source="nom" label="Nom de l'Imprimante" />
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

export const ImpSupCreate = () => (
  <Create title="Création Imprimante Support">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="nom" label="Nom de l'Imprimante" />
      <TextInput source="sn" label="Numéro de série" />
      <TextInput source="prise" label="Prise" />
      <TextInput source="model" label="Modèle" />
      <TextInput source="type" label="Type" defaultValue="Imprimante Support" />
    </SimpleForm>
  </Create>
);
