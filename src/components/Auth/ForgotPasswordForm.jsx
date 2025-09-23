import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons"; 
import { AuthFormButton } from "./AuthFormButton";

/**
 * UI компонент формы сброса пароля
 */
export const ForgotPasswordForm = ({ onSubmit, loading, LoginAction }) => {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email", message: "Введите корректный email!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" autoComplete="email" />
      </Form.Item>

      <Form.Item>
        <AuthFormButton loading={loading}>Отправить ссылку</AuthFormButton>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "center"}}>
        <a href="/login" onClick={LoginAction} style={{ color: "#28BE46" }}>Вернуться</a>
      </div>
    </Form>
  );
}
