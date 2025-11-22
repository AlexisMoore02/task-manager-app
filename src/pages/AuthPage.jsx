import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, register, resetPasswordThunk } from "../features/authSlice";
import { useNotification } from "../hooks/useNotification";
import { formatError } from "../utils/errorFormatter";
import * as AuthComponent from "../components/Auth";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.auth.loading);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [notify, contextHolder] = useNotification();
  const [form, setForm] = useState("login");

  const handleLogin = async (values) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      notify("success", "Добро пожаловать!");
      navigate("/tasks");
    } else {
      notify("error", "Ошибка входа", formatError(result.payload));
    }
  };

  const handleRegister = async (values) => {
      const result = await dispatch(register(values));
  
      if (register.fulfilled.match(result)) {
        notify("success", "Регистрация успешна!");
        navigate("/tasks");
      } else {
        notify("error", "Ошибка регистрации", formatError(result.payload));
      }
    };

  const handleReset = async ({ email }) => {
      const result = await dispatch(resetPasswordThunk(email));
      if (resetPasswordThunk.fulfilled.match(result)) {
        notify("success", result.payload);
      } else {
        notify("error", "Ошибка отправки письма", formatError(result.payload));
      }
    };

  return (
    <AuthComponent.AuthLayout darkMode={darkMode} contextHolder={contextHolder}>
      <AuthComponent.AuthCard
        title={
          form === "login"
            ? "Вход"
            : form === "register"
            ? "Регистрация"
            : "Сброс пароля"
        }
      >
        {form === "login" && (
          <AuthComponent.LoginForm
            onSubmit={handleLogin}
            loading={loading}
            ForgotAction={(e) => {
              e.preventDefault();
              setForm("forgot");
            }}
            RegisterAction={(e) => {
              e.preventDefault();
              setForm("register");
            }}
          />
        )}

        {form === "register" && (
          <AuthComponent.RegisterForm
                  onSubmit={handleRegister}
                  loading={loading}
                  LoginAction={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                />
        )}

        {form === "forgot" && (
          <AuthComponent.ForgotPasswordForm
            onSubmit={handleReset}
            loading={loading}
            LoginAction={(e) => {
              e.preventDefault();
              setForm("login");
            }}
          />
        )}
      </AuthComponent.AuthCard>
    </AuthComponent.AuthLayout>
  );
}
