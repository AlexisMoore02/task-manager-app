import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/authSlice";
import { useNotification } from "../hooks/useNotification";
import { formatError } from "../utils/errorFormatter";
import * as AuthCommponent from "../components/Auth";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [notify, contextHolder] = useNotification();

  const handleRegister = async (values) => {
    const result = await dispatch(register(values));

if (register.fulfilled.match(result)) {
  notify("success", "Регистрация успешна!");
  navigate("/tasks");
} else {
      notify("error", "Ошибка регистрации", formatError(result.payload));
}

  };

  return (
    <AuthCommponent.AuthLayout title="Регистрация" darkMode={darkMode} contextHolder={contextHolder}>
      <AuthCommponent.RegisterForm onSubmit={handleRegister}  loading={loading} LoginAction={(e) => { e.preventDefault(); navigate("/login"); }}/>
    </AuthCommponent.AuthLayout>
  );
}
