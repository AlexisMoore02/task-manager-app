import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";

/**
 * Регистрация нового пользователя
 * @param {Object} param0
 * @param {string} param0.email
 * @param {string} param0.password
 * @param {string} [param0.displayName]
 * @returns {Promise<User>} пользователь Firebase
 */
export const registerUser = async ({ email, password, displayName }) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(credential.user, { displayName });
  }
  return credential.user;
};

/**
 * Вход пользователя по email и паролю
 * @param {Object} param0
 * @param {string} param0.email
 * @param {string} param0.password
 * @returns {Promise<User>}
 */
export const loginWithEmail = async ({ email, password }) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

/**
 * Выход пользователя из приложения
 */
export const logoutUser = async () => {
  await signOut(auth);
};

/**
 * Отправка письма для сброса пароля
 * @param {string} email
 */
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
