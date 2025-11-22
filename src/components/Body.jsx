import { useState } from "react";
import { Button, Tooltip, Layout, Dropdown, Grid, Avatar, Drawer, Menu, theme, Typography } from "antd";
import { UserOutlined, LogoutOutlined, SunOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CarryOutOutlined, DatabaseOutlined, ProjectOutlined, SettingOutlined, MoonOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { toggleTheme } from "../features/themeSlice";

import { useNavigate, useLocation } from "react-router-dom";

const { Text } = Typography;
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function Body({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const screens = useBreakpoint();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  const userMenu = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Профиль",
        onClick: () => navigate("/profile"),
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Настройки",
        onClick: () => navigate("/settings"),
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Выйти",
        onClick: handleLogout,
      },
    ],
  };

  const menuButtonStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: "16px",
    padding: "0 24px",
    color: !darkMode ? "#3a413f" : "#fff",
    border: "none",
    cursor: "pointer",
  };

  const siderContent = (
    <div
      style={{
        height: "98%",
        display: "flex",
        flexDirection: "column",
        border: "1px 0px solid black",
        borderRadius: "50px",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={(item) => navigate(item.key)}
        style={{ flex: 1, dangerItemSelectedBg: "#000" }}
        items={[
          { key: "/tasks", icon: <CarryOutOutlined />, label: "Задачи" },
          { key: "/boards", icon: <DatabaseOutlined />, label: "Доски" },
          { key: "/projects", icon: <ProjectOutlined />, label: "Проекты" },
        ]}
      />
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!screens.xs && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={200}
          style={{
            overflow: "hidden",
            background: !darkMode ? "#ffffff" : "#1a1d20",
          }}
          theme={!darkMode ? "light" : "dark"}
        >
          {siderContent}
        </Sider>
      )}

      {screens.xs && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          bodyStyle={{ padding: 0 }}
          width={200}
        >
          {siderContent}
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <Button
            type="text"
            icon={
              screens.xs ? (
                <MenuUnfoldOutlined />
              ) : collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() =>
              screens.xs ? setMobileOpen(true) : setCollapsed(!collapsed)
            }
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <div
            style={{
              background: colorBgContainer,
              display: "flex",
              padding: "10px 0",
              alignSelf: collapsed ? "center" : "stretch",
            }}
          >
            <Dropdown menu={userMenu} placement="rightTop" trigger={["hover"]}>
              <Button type="text" style={menuButtonStyle}>
                <Avatar
                  style={{ backgroundColor: "#8d76e2ff", marginRight: 8 }}
                  icon={<UserOutlined />}
                />
                <Text>
                  {!collapsed && (user?.displayName || "Пользователь")}
                </Text>
              </Button>
            </Dropdown>

            <Tooltip title={darkMode ? "Темная тема" : "Светлая тема"}>
              <Button
                shape="circle"
                icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
                onClick={toggleDarkMode}
              />
            </Tooltip>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
