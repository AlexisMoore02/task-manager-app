/**
 * Форматирование даты в читаемый вид.
 * @param {string} dateString - ISO строка даты
 * @param {string} mode - "date" для даты, "datetime" для даты + времени
 * @returns {string} Отформатированная дата
 */
export const formatDate = (dateString, mode) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (mode === "date") {
    if (isToday) return "Сегодня";
    if (isYesterday) return "Вчера";
    return date.toLocaleDateString(); // формат "дд.мм.гггг"
  }

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Сегодня, ${time}`;
  if (isYesterday) return `Вчера, ${time}`;

  return date.toLocaleString(); // полная дата + время
};

/**
 * Форматирование даты задачи для отображения
 * @param {string} createdAt - дата создания
 * @param {string} updatedAt - дата последнего изменения
 * @returns {string} Строка вида "Создано: ..." или "Изменено: ..."
 */
export const renderTaskDate = (createdAt, updatedAt) => {
  if (updatedAt && updatedAt !== createdAt) {
    return `Изменено: ${formatDate(updatedAt, "datetime")}`;
  }
  if (createdAt) {
    return `Создано: ${formatDate(createdAt, "datetime")}`;
  }
  return "";
};
