import { Card, Divider, Layout, Typography } from "antd";
import { Background } from "../../assets/backgraund";

const { Title } = Typography;
/**
 * UI компонент обертка форм аутентификации
 */
export const AuthLayout = ({ title, children, darkMode, contextHolder }) => (
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
    <Card style={{ width: "100%", maxWidth: 400 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {title}
      </Title>
      <Divider />
      {children}
    </Card>
  </Layout>
);
