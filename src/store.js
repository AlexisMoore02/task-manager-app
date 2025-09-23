import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import tasksReducer from "./features/tasksSlice";
import themeReducer from "./features/themeSlice";

/**
 * Конфигурация Redux store с тремя срезами:
 * - auth: авторизация пользователя
 * - tasks: управление задачами
 * - theme: переключение светлой/темной темы
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    theme: themeReducer,
  },
});
