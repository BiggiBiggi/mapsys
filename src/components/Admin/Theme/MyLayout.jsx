import { Layout } from "react-admin";
import { MyAppBar } from "./MyAppBar.jsx";
import { MyMenu } from "./MyMenu.jsx";

export const MyLayout = ({ children }) => (
  <>
    <Layout menu={MyMenu} appBar={MyAppBar}>
      {children}
    </Layout>
  </>
);
