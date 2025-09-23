import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useNotification } from "../../hooks/useNotification";

/**
 * Компонент формы создания/редактирования задачи
 */
export const TaskForm = ({ open, onClose, taskToEdit, onSubmit }) => {
  const [form] = Form.useForm();
  const [notify, contextHolder] = useNotification();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (taskToEdit) {
      form.setFieldsValue({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
      });
    } else {
      form.resetFields();
    }
  }, [taskToEdit, form, open]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (!values.description) values.description = "";

      const taskData = taskToEdit ? { ...taskToEdit, ...values } : values;
      await onSubmit(taskData);

      notify("success", taskToEdit ? "Задача обновлена" : "Задача добавлена");
      form.resetFields();
      onClose();
    } catch (err) {
      notify("error", "Ошибка", err.message || "Не удалось сохранить задачу");
      console.error("Ошибка формы:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={taskToEdit ? "Редактировать задачу" : "Новая задача"}
        open={open}
        onCancel={onClose}
        width={400}
        footer={[
          <Button key="cancel" onClick={onClose}>Отмена</Button>,
          <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
            Сохранить
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Название"
            rules={[{ required: true, message: "Введите название задачи" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea autoSize={{ minRows: 9, maxRows: 16 }} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Приоритет"
            rules={[{ required: true, message: "Выберите приоритет" }]}
          >
            <Select
              options={[
                { value: "low", label: "Низкий" },
                { value: "medium", label: "Средний" },
                { value: "high", label: "Высокий" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
