import { Button } from "antd";

/**
 * UI компонент кнопки для форм аутентификации 
 */
export const AuthFormButton = ({ children, loading }) => (
  <Button type="primary" htmlType="submit" block loading={loading} style={{ boxShadow: "none" }}>
    {children}
  </Button>
);
