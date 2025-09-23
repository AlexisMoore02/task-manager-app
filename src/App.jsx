import { useEffect } from "react";
import { listenToAuthChanges } from "./features/authSlice";
import { lightTheme, darkTheme } from "./assets/theme";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, notification } from "antd";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  return (
    <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>
      {contextHolder}
      <AppRoutes />
    </ConfigProvider>
  );
}
