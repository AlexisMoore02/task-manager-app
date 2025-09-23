import { Spin, Empty } from "antd";
import * as TaskComponents from "../components/Task";
import { useTaskActions } from "../hooks/useTaskActions"; 

/**
 * Главная страница задач
 * - Управление состояниями загрузки, фильтров
 * - Отображение доски задач
 */
export default function Tasks() {
  const {
    darkMode,
    userUid,
    loading,
    filter,
    setFilter,
    search,
    setSearch,
    taskToEdit,
    setTaskToEdit,
    isModalOpen,
    setIsModalOpen,
    filteredTasks,
    handleToggleComplete,
    handleDeleteTask,
    handleSaveTask,
    actionLoading,
    contextHolder,
  } = useTaskActions();
 

  if (!userUid) {
    return (
      <section className={darkMode ? "dark-theme" : "light-theme"}>
        {contextHolder}
      </section>
    );
  }

  return (
    <section className={darkMode ? "dark-theme" : "light-theme"}>
      {contextHolder}

      <TaskComponents.TaskControls
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        onAddTask={() => {
          setTaskToEdit(null);
          setIsModalOpen(true);
        }}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Загрузка задач...</div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <Empty description="Задачи не найдены" />
      ) : (
        <TaskComponents.TaskBoard
          tasks={filteredTasks}
          onEdit={(task) => {
            setTaskToEdit(task);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteTask}
          onToggle={handleToggleComplete}
          actionLoading={actionLoading}
        />
      )}

      <TaskComponents.TaskForm
        open={isModalOpen}
        taskToEdit={taskToEdit}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleSaveTask}
      />
    </section>
  );
}
