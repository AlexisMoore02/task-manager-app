import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthFormButton } from "./AuthFormButton";

/**
 * UI компонент формы авторизации
 */
export const LoginForm = ({
  onSubmit,
  loading,
  ForgotAction,
  RegisterAction,
}) => {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Введите корректный email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Email"
          autoFocus
          autoComplete="email"
        />
      </Form.Item>

      <Form.Item
        noStyle
        name="password"
        rules={[{ required: true, message: "Введите пароль!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Пароль"
          autoComplete="current-password"
        />
      </Form.Item>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <a
          href="/forgot-password"
          onClick={ForgotAction}
          style={{ color: "#28BE46" }}
        >
          Забыли пароль?
        </a>
      </div>

      <Form.Item>
        <AuthFormButton loading={loading}>Войти</AuthFormButton>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
        <span>Еще нет аккаунта?</span>
        <a
          href="/register"
          onClick={RegisterAction}
          style={{ color: "#28BE46" }}
        >
          Регистрация
        </a>
      </div>
    </Form>
  );
};
