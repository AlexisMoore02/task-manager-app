import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { registerUser, loginWithEmail, logoutUser, resetPassword } from "../services/authService";

/**
 * Проверяет наличие интернет-соединения
 * @returns {boolean}
 */
const isOnline = () => navigator.onLine;

/**
* Сериализуемые данные пользователя
*/
const serializeUser = (user) => user ? {
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || null
} : null;
 
/**
 * Авторизация пользователя по email и паролю
 *
 * @param {Object} payload - Данные для входа
 * @param {string} payload.email - email пользователя
 * @param {string} payload.password - Пароль пользователя
 * @returns {Promise<Object>} Объект пользователя { uid, email, displayName }
 */
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    if (!isOnline()) return rejectWithValue("Нет соединения с интернетом");

    try {
      const user = await loginWithEmail({ email, password });
      return serializeUser(user);
    } catch (error) {
      return rejectWithValue({ code: error.code, message: error.message });
    }
  }
);

/**
 * Регистрация нового пользователя
 *
 * @param {Object} values - Данные пользователя для регистрации
 */
export const register = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    if (!isOnline()) return rejectWithValue("Нет соединения с интернетом");

    try {
      const user = await registerUser(values);
      return serializeUser(user);
    } catch (error) {
      return rejectWithValue({ code: error.code, message: error.message });
    }
  }
);

/**
 * Выход пользователя из аккаунта
 */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    if (!isOnline()) return rejectWithValue("Нет соединения с интернетом");

    try {
      await logoutUser();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Сброс пароля по email
 *
 * @param {string} email - email пользователя для сброса пароля
 */
export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    if (!isOnline()) return rejectWithValue("Нет соединения с интернетом");

    try {
      await resetPassword(email);
      return "Ссылка для сброса пароля отправлена! Если не нашли письмо проверьте правильно ли введен адрес электронной почты, а также проверьте папку спам";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Подписка на изменения состояния авторизации Firebase
 */
export const listenToAuthChanges = createAsyncThunk(
  "auth/listenToAuthChanges",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        dispatch(setUser(serializeUser(user)));
        dispatch(authChecked());
        resolve();
      });
      return unsubscribe;
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    authChecked: false,
  },
  reducers: {
    authChecked: (state) => { state.authChecked = true; },
    setUser: (state, action) => { state.user = action.payload; },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(logout.fulfilled, (state) => { state.user = null; })

      .addCase(resetPasswordThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPasswordThunk.fulfilled, (state) => { state.loading = false; })
      .addCase(resetPasswordThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { authChecked, setUser } = authSlice.actions;
export default authSlice.reducer;
