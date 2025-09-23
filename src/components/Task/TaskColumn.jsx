import { TaskItem } from "./TaskItem";

/**
 * Колонка задач
 * - Отображает задачи в виде карточек или списка в зависимости от размера экрана (мобильный/десктоп)
 */
export const TaskColumn = ({ tasks, isCardView, onEdit, onDelete, onToggle, actionLoading }) => {
  return (
    <div style={{ padding: "1rem", borderRadius: 8 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isCardView={isCardView}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
          actionLoading={actionLoading}
        />
      ))}
    </div>
  );
};
