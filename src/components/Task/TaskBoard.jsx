import { useMemo } from "react";
import { TaskColumn } from "./TaskColumn";

/**
 * Компонент доски задач
 * - Сортирует задачи по полю order
 * - Поддерживает мобильный и десктопный вид
 */
export const TaskBoard = ({ tasks, onEdit, onDelete, onView, actionLoading, isMobile }) => {
  
  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [tasks]
  ); 

  return (
    <div>
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {sortedTasks.map((task) => (
            <TaskColumn
              key={task.id}
              id={`card-${task.id}`}
              tasks={[task]}
              isCardView
              onEdit={onEdit}
              onDelete={onDelete} 
              onView={onView}
              actionLoading={actionLoading} 
            />
          ))}
        </div>
      ) : (
        <TaskColumn
          id="list"
          tasks={sortedTasks}
          isCardView={false}
          onEdit={onEdit}
          onDelete={onDelete} 
          onView={onView}
          actionLoading={actionLoading} 
        />
      )}
    </div>
  );
};
