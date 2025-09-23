import { notification } from "antd";
import { useSelector } from "react-redux";
/**
 * Пользовательский хук для вывода сообщений на экран
 */
export const useNotification = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [api, contextHolder] = notification.useNotification();

  const notify = (type, message, description) => {
    api[type]({
      message,
      description,
      style: {
        backgroundColor: darkMode ? "#474B4F" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        border: `1px solid ${darkMode ? "#28BE46" : "#2E3337"}`,
        borderRadius: "8px",
      },
    });
  };

  return [notify, contextHolder];
};
