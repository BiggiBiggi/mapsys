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

const PCFilters = [<TextInput source="q" label="Rechercher" alwaysOn />];

const ListActions = () => (
  <TopToolbar>
    <CreateButton label="Ajouter un PC" />
    <ExportButton label="Exporter" />
  </TopToolbar>
);

export const PCList = () => (
  <List
    actions={<ListActions />}
    filters={PCFilters}
    sort={{ field: "Nom_PC", order: "ASC" }}
    pagination={<MyPagination />}
  >
    <Datagrid rowClick={false}>
      <TextField source="ID" label="ID" />
      <TextField source="Nom_PC" label="Nom du PC" />
      <TextField source="SN" label="Numéro de Série" />
      <TextField source="IP_Wifi" label="IP Wifi" />
      <TextField source="IP_Filaire" label="IP Filaire" />
      <TextField source="Prise" label="Prise" />
      <TextField source="ID_GLPI" label="ID dans GLPI" />
      <EditButton label="Modifier" />
      <DeleteButton label="Supprimer" />
    </Datagrid>
  </List>
);

export const PCEdit = () => (
  <Edit title="Modification Imprimante PC">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="ID" label="ID" disabled />
      <TextInput source="Nom_PC" label="Nom du PC" />
      <TextInput source="SN" label="Numéro de Série" />
      <TextInput source="IP_Wifi" label="IP Wifi" />
      <TextInput source="IP_Filaire" label="IP Filaire" />
      <TextInput source="Prise" label="Prise" />
      <TextInput source="ID_GLPI" label="ID dans GLPI" />
    </SimpleForm>
  </Edit>
);

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton label="Enregistrer" />
  </Toolbar>
);

export const PCCreate = () => (
  <Create title="Création PC" notification={false}>
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="Nom_PC" label="Nom du PC" />
      <TextInput source="SN" label="Numéro de Série" />
      <TextInput source="IP_Wifi" label="IP Wifi" />
      <TextInput source="IP_Filaire" label="IP Filaire" />
      <TextInput source="Prise" label="Prise" />
      <TextInput source="ID_GLPI" label="ID dans GLPI" />
    </SimpleForm>
  </Create>
);
