import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

/**
 * Преобразует поля Firestore Timestamp в ISO строки
 * @param {Object} task - объект задачи
 * @returns {Object} задача с полями createdAt и updatedAt в формате ISO
 */
const convertTimestamps = (task) => ({
  ...task,
  createdAt: task.createdAt?.toDate?.()?.toISOString?.() ?? task.createdAt,
  updatedAt: task.updatedAt?.toDate?.()?.toISOString?.() ?? task.updatedAt,
});

/**
 * Получение всех задач пользователя
 * @param {string} userId - ID пользователя
 * @returns {Promise<Array<Object>>} массив задач
 */
export const getTasks = async (userId) => {
  if (!userId) throw new Error("User ID не указан");

  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => convertTimestamps({ id: doc.id, ...doc.data() }));
};

/**
 * Добавление новой задачи
 * @param {Object} task - данные задачи
 * @returns {Promise<DocumentReference>} ссылка на созданный документ
 */
export const addTask = async (task) => {
  if (!task) throw new Error("Данные задачи не указаны");

  const docRef = await addDoc(collection(db, "tasks"), {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef;
};

/**
 * Обновление существующей задачи
 * @param {string} id - ID задачи
 * @param {Object} updatedTask - обновленные поля
 * @returns {Promise<void>}
 */
export const updateTask = async (id, updatedTask) => {
  if (!id) throw new Error("ID задачи не указан");
  if (!updatedTask) throw new Error("Обновленные данные не указаны");

  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, { ...updatedTask, updatedAt: serverTimestamp() });
};

/**
 * Удаление задачи
 * @param {string} id - ID задачи
 * @returns {Promise<void>}
 */
export const deleteTask = async (id) => {
  if (!id) throw new Error("ID задачи не указан");

  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
};
