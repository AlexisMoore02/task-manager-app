/**
 * Универсальный форматтер ошибок
 */
export const formatError = (error) => {
  if (!error) return "Произошла неизвестная ошибка";

  if (error.code) {
    switch (error.code) {
      case "auth/wrong-password": return "Неверный пароль";
      case "auth/user-not-found": return "Пользователь не найден";
      case "auth/email-already-in-use": return "Этот email уже зарегистрирован";
      case "auth/invalid-credential": return "Неверные учетные данные. Попробуйте снова";
      case "auth/account-exists-with-different-credential": return "Аккаунт уже существует с другим методом входа";
      default: return error.message || "Произошла ошибка";
    }
  }

  if (Array.isArray(error?.errors) && error.errors.length > 0) {
    const first = error.errors[0];
    if (first.message === "EMAIL_EXISTS") return "Этот email уже зарегистрирован";
    if (first.message === "INVALID_LOGIN_CREDENTIALS") return "Неверный логин или пароль";
    return first.message || "Произошла ошибка";
  }

  if (error instanceof Error) return error.message || "Произошла ошибка";

  if (typeof error === "string") return error;

  return "Произошла неизвестная ошибка";
};
