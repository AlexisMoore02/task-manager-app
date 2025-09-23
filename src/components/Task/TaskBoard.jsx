import { useMemo, useState, useEffect } from "react";
import { TaskColumn } from "./TaskColumn";

/**
 * Компонент доски задач
 * - Сортирует задачи по полю order
 * - Поддерживает мобильный и десктопный вид
 */
export const TaskBoard = ({ tasks, onEdit, onDelete, onToggle, actionLoading }) => {
  
  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [tasks]
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              onToggle={onToggle}
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
          onToggle={onToggle}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
};
