import { Layout } from "antd";
import { Background } from "../../assets/backgraund";

/**
 * UI компонент обертка форм аутентификации
 */
export const AuthLayout = ({ children, darkMode, contextHolder }) => (
  <Layout
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
    className={darkMode ? "dark-theme" : "light-theme"}
  >
    <Background theme={darkMode} />
    {contextHolder}
    {children}
  </Layout>
);
