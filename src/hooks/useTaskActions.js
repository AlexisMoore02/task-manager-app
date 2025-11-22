import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, updateTask, deleteTask } from "../features/tasksSlice";
import { useNotification } from "./useNotification";

/**
 * Хук для работы с задачами
 */
export const useTaskActions = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const loading = useSelector(state => state.tasks.loading);
  const userUid = useSelector(state => state.auth.user?.uid);
  const darkMode = useSelector(state => state.theme.darkMode);

  const [actionLoading, setActionLoading] = useState({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [notify, contextHolder] = useNotification();
  const notifyRef = useRef(notify);
  useEffect(() => { notifyRef.current = notify; }, [notify]);

  // Загрузка задач при смене пользователя
  useEffect(() => {
    if (!userUid) return;
    dispatch(fetchTasks(userUid))
      .unwrap()
      .catch(err => notifyRef.current("error", "Ошибка загрузки задач", err));
  }, [dispatch, userUid]);

 /**
 * Обработчик действия: фильтрация/поиск задач
 */
  const filteredTasks = useMemo(() => {
    if (!Array.isArray(tasks)) return [];
    let result = tasks;
    if (filter === "completed") result = result.filter(t => t?.completed);
    if (filter === "active") result = result.filter(t => !t?.completed);
    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(t => (t?.title ?? "").toLowerCase().includes(lower));
    }
    return result;
  }, [tasks, filter, search]);

   /**
 * Обработчик действия: Удаление задачи
 */ 
  const handleDeleteTask = useCallback(async (idOrTask) => {
    const id = typeof idOrTask === "string" ? idOrTask : idOrTask?.id;
    if (!id) return notifyRef.current("error", "Ошибка удаления", "Неверный id задачи");

    setActionLoading(prev => ({ ...prev, [id]: { ...(prev[id] || {}), delete: true } }));
    try {
      await dispatch(deleteTask(id)).unwrap();
      notifyRef.current("success", "Задача удалена");
    } catch (err) {
      notifyRef.current("error", "Ошибка удаления", err);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: { ...(prev[id] || {}), delete: false } }));
    }
  }, [dispatch]);

  /**
 * Обработчик действия: Добавление/редактирование задачи
 */ 
  const handleSaveTask = useCallback(async (task) => {
    try {
      if (task.id) {
        await dispatch(updateTask({ id: task.id, updatedTask: task })).unwrap();
        notifyRef.current("success", "Задача обновлена");
      } else {
        await dispatch(addTask({ task, userId: userUid })).unwrap();
        notifyRef.current("success", "Задача создана");
      }
    } catch (err) {
      notifyRef.current("error", "Ошибка задачи", err);
    } finally {
      // setIsModalOpen(false);
      setIsEditing(false);
    }
  }, [dispatch, userUid]);

  /**
 * Обработчик действия: изменение статуса задачи
 */ 
  const handleToggleComplete = useCallback(async (task) => {
    setActionLoading(prev => ({ ...prev, [task.id]: { ...(prev[task.id] || {}), toggle: true } }));
    try {
      await dispatch(updateTask({ id: task.id, updatedTask: { completed: !task.completed } })).unwrap();
      notifyRef.current("success", "Статус задачи обновлен");
    } catch (err) {
      notifyRef.current("error", "Ошибка обновления статуса", err);
    } finally {
      setActionLoading(prev => ({ ...prev, [task.id]: { ...(prev[task.id] || {}), toggle: false } }));
    }
  }, [dispatch]);

  return {
    darkMode, userUid, loading, filter, setFilter, search, setSearch,
    isEditing, setIsEditing, isModalOpen, setIsModalOpen,
    filteredTasks, handleSaveTask, handleDeleteTask, handleToggleComplete,
    actionLoading, contextHolder,
  };
};
