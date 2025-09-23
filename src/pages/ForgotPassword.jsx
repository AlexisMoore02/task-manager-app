import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordThunk } from "../features/authSlice";
import { useNotification } from "../hooks/useNotification";
import { formatError } from "../utils/errorFormatter";
import * as AuthCommponent from "../components/Auth";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [notify, contextHolder] = useNotification();

  const handleReset = async ({ email }) => {
    const result = await dispatch(resetPasswordThunk(email));
    if (resetPasswordThunk.fulfilled.match(result)) {
      notify("success", result.payload);
    } else {
      notify("error", "Ошибка отправки письма", formatError(result.payload));
    }
  };

  return (
    <AuthCommponent.AuthLayout title="Восстановление пароля" darkMode={darkMode} contextHolder={contextHolder}>
      <AuthCommponent.ForgotPasswordForm onSubmit={handleReset} loading={loading} LoginAction={(e) => { e.preventDefault(); navigate("/login"); }}/>
    </AuthCommponent.AuthLayout>
  );
}
