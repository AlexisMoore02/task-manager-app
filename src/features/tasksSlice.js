import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTask as addTaskAPI, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI, getTasks as getTasksAPI } from "../services/taskService";

/**
 * Получение списка задач пользователя
 *
 * @param {string} userId - ID пользователя
 * @returns {Promise<Array<Object>>} Массив задач с полями { id, title, description, completed, priority, createdAt, updatedAt, userId, order }
 * @throws {string} Ошибка загрузки задач
 */
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (userId, { rejectWithValue }) => {
     if (!userId) return rejectWithValue("Возникла ошибка. Пожалуйста, войдите заново в систему.");

    try {
      const tasks = await getTasksAPI(userId);
      return tasks.map(task => ({
        ...task,
        createdAt: task.createdAt ? new Date(task.createdAt).toISOString() : null,
        updatedAt: task.updatedAt ? new Date(task.updatedAt).toISOString() : null,
      }));
    } catch (error) {
      return rejectWithValue(error.message || "Ошибка при загрузке задач");
    }
  }
);

/**
 * Добавление новой задачи
 *
 * @param {Object} payload
 * @param {Object} payload.task - Данные задачи
 * @param {string} payload.userId - ID пользователя
 * @returns {Promise<Object>} Новая задача с добавленным id
 * @throws {string} Ошибка при добавлении задачи
 */
export const addTask = createAsyncThunk(
  "tasks/add",
  async ({ task, userId }, { rejectWithValue }) => {
    if (!userId) return rejectWithValue("Возникла ошибка. Пожалуйста, войдите заново в систему.");

    try {
      const newTask = { ...task, completed: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), userId };
      const docRef = await addTaskAPI(newTask);
      return { ...newTask, id: docRef.id };
    } catch (error) {
      return rejectWithValue(error.message || "Ошибка при добавлении задачи");
    }
  }
);

/**
 * Обновление существующей задачи
 *
 * @param {Object} payload
 * @param {string} payload.id - ID задачи
 * @param {Object} payload.updatedTask - Обновленные поля задачи
 * @returns {Promise<Object>} Объект с id задачи и обновленными полями
 * @throws {string} Ошибка при обновлении задачи
 */
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updatedTask }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const taskIndex = state.tasks.tasks.findIndex(t => t.id === id);
      if (taskIndex === -1) return rejectWithValue("Задача не найдена");

      const currentTask = state.tasks.tasks[taskIndex];
      const updated = { ...currentTask, ...updatedTask, updatedAt: new Date().toISOString() };

      if ("completed" in updatedTask) {
        const tasksExcludingCurrent = state.tasks.tasks.filter(t => t.id !== id);
        const relevantTasks = tasksExcludingCurrent.filter(t => t.completed === updated.completed);
        updated.order = relevantTasks.length
          ? Math.max(...relevantTasks.map(t => t.order ?? 0)) + 1
          : 0;
      }

      await updateTaskAPI(id, updated);
      return { id, updatedTask: updated };
    } catch (error) {
      return rejectWithValue(error.message || "Ошибка при обновлении задачи");
    }
  }
);

/**
 * Удаление задачи
 *
 * @param {string} id - ID задачи
 * @returns {Promise<string>} ID удаленной задачи
 * @throws {string} Ошибка при удалении задачи
 */
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    if (!id) return rejectWithValue("ID задачи не указан");

    try {
      await deleteTaskAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Ошибка при удалении задачи");
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.tasks = action.payload; })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // addTask
      .addCase(addTask.fulfilled, (state, action) => { state.tasks.push(action.payload); })
      .addCase(addTask.rejected, (state, action) => { state.error = action.payload; })

      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = { ...state.tasks[index], ...action.payload.updatedTask };
      })
      .addCase(updateTask.rejected, (state, action) => { state.error = action.payload; })

      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => { state.tasks = state.tasks.filter(t => t.id !== action.payload); })
      .addCase(deleteTask.rejected, (state, action) => { state.error = action.payload; });
  },
});

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
