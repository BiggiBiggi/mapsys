"use client"

import { Admin, Resource } from "react-admin"
import { SupportList, SupportCreate, SupportEdit } from "./components/Admin/SupportList"
import { CopieurList, CopieurCreate, CopieurEdit } from "./components/Admin/CopieurList"
import { PCList, PCCreate, PCEdit } from "./components/Admin/PCList"
import { dataProvider, i18nProvider } from "./components/Admin/DataProvider"
import { MyLayout } from "./components/Admin/Theme/MyLayout"
import LoginPage from "./components/Admin/Connexion/LoginPage"

// Application React Admin complètement indépendante
function AdminApp() {
  return (
    <div style={{ height: "100vh" }}>
      {/* Bouton pour retourner à l'application principale */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999,
          background: "#1976d2",
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
        onClick={() => (window.location.href = "/")}
      >
        ← Retour à l'application
      </div>

      <Admin
        dataProvider={dataProvider}
        basename="/admin"
        i18nProvider={i18nProvider}
        layout={MyLayout}
        darkTheme={null}
        loginPage={LoginPage}
      >
        <Resource name="equipements" options={{ label: "Équipements" }} list={PCList} edit={PCEdit} create={PCCreate} />
        <Resource
          name="imp_copieurs"
          options={{ label: "Imprimantes Copieurs" }}
          list={CopieurList}
          edit={CopieurEdit}
          create={CopieurCreate}
        />
        <Resource
          name="imp_support"
          edit={SupportEdit}
          create={SupportCreate}
          options={{ label: "Imprimantes Supports" }}
          list={SupportList}
        />
      </Admin>
    </div>
  )
}

export default AdminApp
