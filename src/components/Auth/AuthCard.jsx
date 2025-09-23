import { Card, Divider, Typography, theme } from "antd";

const { Title } = Typography;
/**
 * Универсалный компонент формы аутентификации
 */
export const AuthCard = ({ title, children }) => {
  const { token } = theme.useToken();
  return (
    <Card style={{ maxWidth: 400, width: "100%", background: token.colorBgCard }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {title}
      </Title>
      <Divider />
      {children}
    </Card>
  );
};
