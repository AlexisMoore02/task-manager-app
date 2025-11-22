import React, { useState, useEffect } from "react";

// import { useNotification } from "../../hooks/useNotification";
import {
  Form,
  Descriptions,
  Input,
  theme,
  Button,
  Tooltip,
  Tag,
  Space,
  Select,
  Row,
  Col,
} from "antd";
import {
  SyncOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { formatDate } from "../../utils/dateHelpers";

export const TaskInfo = ({ darkMode, task, isEditing, setIsEditing, onSubmit }) => {
  console.log(task);

  const [editableTask, setEditableTask] = useState(task);
  // const [loading, setLoading] = useState(false);
  // const [notify, contextHolder] = useNotification();
  const handleChangeField = (field, value) => {
    setEditableTask((prev) => ({ ...prev, [field]: value }));
  };
  const { token } = theme.useToken();
  const borderColor = editableTask.completed
    ? token.Card.taskBorderCompleted
    : editableTask.priority === "Высокий"
    ? token.Card.taskBorderHigh
    : editableTask.priority === "Средний"
    ? token.Card.taskBorderMedium
    : token.Card.taskBorderLow;

  useEffect(() => {
    if (task) setEditableTask(task);
  }, [task]);

  const items = [
    {
      key: 1,
      children: isEditing ? (
        <Input.TextArea
          showCount
          maxLength={70}
          onChange={(e) => handleChangeField("title", e.target.value)}
          placeholder="Описание отсутствует"
          style={{ height: 50, resize: "none" }}
          value={editableTask.title}
        />
      ) : null,
    },
    {
      key: 2,
      children: isEditing ? (
        <Input.TextArea
          showCount
          // maxLength={100}
          onChange={(e) => handleChangeField("description", e.target.value)}
          placeholder="Описание отсутствует"
          style={{ height: 120, resize: "none" }}
          value={editableTask.description}
        />
      ) : (
        editableTask.description
      ),
    },
    {
      key: 3,
      label: isEditing ? "Статус" : "",
      children: isEditing ? (
        <Select
          defaultValue={editableTask.completed}
          size="small"
          onChange={(value) => handleChangeField("completed", value)}
          options={[
            { value: false, label: "В процессе" },
            { value: true, label: "Выполнена" },
          ]}
        />
      ) : null,
    },
    {
      key: 4,
      label: isEditing ? "Приоритет" : "",
      children: isEditing ? (
        <Select
          defaultValue={editableTask.priority}
          size="small"
          onChange={(value) => handleChangeField("priority", value)}
          options={[
            { value: "Низкий", label: "Низкий" },
            { value: "Средний", label: "Средний" },
            { value: "Высокий", label: "Высокий" },
          ]}
        />
      ) : null,
    },
    {
  key: 5,
  children: (
    <div style={{ display: "flex", justifyContent: "left", gap:'5em' }}>
      <span><strong>Создано:</strong> {formatDate(editableTask.createdAt, "datetime")}</span>
      <span><strong>Изменено:</strong> {formatDate(task.updatedAt, "datetime")}</span>
    </div>
  ),
}

  ];

  return (
    <div style={{ background: !darkMode? "#fff" : "#4a4f52", borderRadius: "10px", padding: "10px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "0",
          height: "auto",
        }}
      >
        <h2>
          Задача {task.index} | {editableTask.title + " "}
          <Tag
            color={!editableTask.completed ? "#2858beff" : "#7d7e7dff"}
            icon={editableTask.completed ? <CheckCircleOutlined /> : <SyncOutlined />}
          >
            {!editableTask.completed ? "В процессе" : "Выполнена"}
          </Tag>
          <Tag color={borderColor} bordered={false}>
            {editableTask.priority}
          </Tag>
        </h2>

        <Space.Compact>
          <Tooltip title="Вложение">
            <Button
              icon={<PaperClipOutlined />}
              onClick={() => {
                alert("Функционал добавления файлов находится в разработке");
              }}
            />
          </Tooltip>
          {!isEditing ? (
            <Tooltip title="Изменить">
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            </Tooltip>
          ) : (
            <>
              <Tooltip title="Отменить изменения">
                <Button
                  type="default"
                  onClick={() => {
                    setIsEditing(false);
                    setEditableTask(task);
                  }}
                >
                  <CloseOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="Сохранить">
                <Button
                  type="primary"
                  onClick={() => {
                    setIsEditing(false);
                    onSubmit(editableTask);
                  }}
                >
                  <CheckOutlined />
                </Button>
              </Tooltip>
            </>
          )}
        </Space.Compact>
      </div>
      {items.map((i) => (
        <p key={i.key}>
          {i.label && <strong>{i.label} </strong>}
          {i.children}
        </p>
      ))}
    </div>
  );
};
