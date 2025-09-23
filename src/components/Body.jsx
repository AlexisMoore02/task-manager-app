import { Button, Tooltip, Avatar, Layout, Typography, theme } from "antd";
import { UserOutlined, LogoutOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { toggleTheme } from "../features/themeSlice";

const { Text } = Typography;
const { Header, Content } = Layout;

/**
 * Компонент обертка контента (шапка страницы и контент: задачи)
 */
export default function Body({ children }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const { token } = theme.useToken();

  const handleLogout = () => dispatch(logout());

  const toggleDarkMode = () => dispatch(toggleTheme());

  return (
    <Layout style={{ minHeight: "100vh", background: token.colorBgLayout }}>
      <Header
        style={{
          background: token.colorBgHeader,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      > 
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar style={{ backgroundColor: "#28BE46" }} icon={<UserOutlined />} />
          <Text>{user?.displayName || "Пользователь"}</Text>
        </div>
 
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title={darkMode ? "Темная тема" : "Светлая тема"}>
            <Button
              shape="circle"
              icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
              onClick={toggleDarkMode}
            />
          </Tooltip>

          <Tooltip title="Выход">
            <Button shape="circle" icon={<LogoutOutlined />} onClick={handleLogout} />
          </Tooltip>
        </div>
      </Header>
 
      <Content
        style={{
          margin: "16px 24px",
          padding: 24,
          minHeight: 280,
          borderRadius: 8,
          background: token.colorBgContainer,
          transition: "background 0.3s ease",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
