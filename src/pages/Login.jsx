import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { useNotification } from "../hooks/useNotification"; 
import { formatError } from "../utils/errorFormatter";
import * as AuthCommponent from "../components/Auth";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [notify, contextHolder] = useNotification();

 const handleLogin = async (values) => {
 const result = await dispatch(login(values));

if (login.fulfilled.match(result)) {
  notify("success", "Добро пожаловать!");
  navigate("/tasks");
} else {
    notify("error", "Ошибка входа", formatError(result.payload));
}

};
  return (
    <AuthCommponent.AuthLayout
      title="Вход в аккаунт"
      darkMode={darkMode}
      contextHolder={contextHolder}
    >
      <AuthCommponent.LoginForm
        onSubmit={handleLogin}
        loading={loading}
        ForgotAction={(e) => { e.preventDefault(); navigate("/forgot-password");}}
        RegisterAction={(e) => { e.preventDefault(); navigate("/register"); }}
      />
    </AuthCommponent.AuthLayout>
  );
}
