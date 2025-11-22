import { useState, useEffect } from "react";
import { Spin, Empty, Splitter, Flex, Modal } from "antd";
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
    isEditing,
    setIsEditing,
    isModalOpen,
    setIsModalOpen,
    filteredTasks, 
    handleDeleteTask,
    handleSaveTask,
    actionLoading,
    contextHolder,
  } = useTaskActions();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!userUid) {
    return (
      <section className={darkMode ? "dark-theme" : "light-theme"}>
        {contextHolder}
      </section>
    );
  }
  const handleTaskClick = (id) => {
    setSelectedTask(filteredTasks.find((item) => item.id === id));
    !isPanelOpen ? setIsPanelOpen(true) : setIsPanelOpen(false);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedTask(null);
  };
  return (
    <section className={darkMode ? "dark-theme" : "light-theme"}>
      {contextHolder}

      <TaskComponents.TaskControls
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        onAddTask={() => {
          setIsEditing(null);
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
        <Flex vertical gap={20}>
          <Splitter>
            <Splitter.Panel
              size={isPanelOpen ? !isMobile && "60%" : "100%"}
              resizable={false}
            >
              <TaskComponents.TaskBoard
                tasks={filteredTasks}
                onEdit={(id) => {
                  setIsEditing(true);
                  handleTaskClick(id);
                }}
                onDelete={handleDeleteTask} 
                onView={handleTaskClick}
                actionLoading={actionLoading}
                isMobile={isMobile}
              />
            </Splitter.Panel>
            {!isMobile
              ? isPanelOpen && (
                  <Splitter.Panel
                    size="40%"
                    resizable={false}
                    style={{ padding: "15px 0 15px 15px" }} 
                  >
                    <TaskComponents.TaskInfo
                      darkMode={darkMode}
                      task={selectedTask}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      onSubmit={handleSaveTask}
                    />
                  </Splitter.Panel>
                )
              : null}
          </Splitter>
          {isMobile
            ? isPanelOpen && (
                <Modal
                  open={isPanelOpen}
                  onCancel={handleClosePanel}
                  footer={null}
                >
                  <h3>{selectedTask?.title}</h3>
                  <p>{selectedTask?.description}</p>
                </Modal>
              )
            : null}
        </Flex>
      )}

      <TaskComponents.TaskForm
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(null);
        }}
        onSubmit={handleSaveTask}
      />
    </section>
  );
}
