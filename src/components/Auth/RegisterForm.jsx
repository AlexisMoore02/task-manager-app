import { Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { AuthFormButton } from "./AuthFormButton";

/**
 * UI компонент формы регистрации
 */
export const RegisterForm = ({ onSubmit, loading, LoginAction }) => {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="displayName"
        rules={[{ required: true, message: "Введите имя пользователя!" }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Имя пользователя"
          autoComplete="name"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Введите email!" },
          { type: "email", message: "Введите корректный email!" },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          autoComplete="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Введите пароль!" },
          { min: 6, message: "Пароль должен содержать минимум 6 символов!" },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
            message: "Пароль должен содержать буквы и цифры",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Пароль"
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Подтвердите пароль!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Подтвердите пароль"
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item>
        <AuthFormButton loading={loading}>Зарегистрироваться</AuthFormButton>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
        <span>Уже есть аккаунт?</span>{" "}
        <a href="/login" onClick={LoginAction} style={{ color: "#9a6decff" }}>
          Войти
        </a>
      </div>
    </Form>
  );
}
