import { Card, Divider, Typography, theme } from "antd";

const { Title } = Typography;

/**
 * Универсальный компонент для форм аутентификации
 */
export const AuthCard = ({ title, children }) => {
  const { token } = theme.useToken();

  return (
    <Card
      style={{
        maxWidth: 400, 
        width: "100%",
        background: token.colorBgContainer,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {title && (
        <>
          <Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
            {title}
          </Title>
          <Divider />
        </>
      )}
      {children}
    </Card>
  );
};
