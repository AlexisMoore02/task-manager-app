import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useNotification } from "../../hooks/useNotification";

/**
 * Компонент формы создания/редактирования задачи
 */
export const TaskForm = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [notify, contextHolder] = useNotification();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
      form.resetFields();
  
  }, [form, open]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (!values.description) values.description = "";

      const taskData =  values;
      await onSubmit(taskData);

      notify("success", "Задача добавлена");
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
        title={"Новая задача"}
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
                { value: "Низкий", label: "Низкий" },
                { value: "Средний", label: "Средний" },
                { value: "Высокий", label: "Высокий" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
