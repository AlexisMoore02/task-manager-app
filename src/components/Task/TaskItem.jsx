import { Card, Tag, Button, Popconfirm, Typography, Tooltip, theme } from "antd";
import {
  CheckCircleOutlined, UndoOutlined, EditOutlined, DeleteOutlined,
  CopyOutlined, ArrowsAltOutlined, ShrinkOutlined
} from "@ant-design/icons";
import { renderTaskDate, formatDate } from "../../utils/dateHelpers";

const { Paragraph } = Typography;

/**
 * Отображение одной задачи
 * - Карточка или строка в списке в зависимости от размера экрана  
 * - Состав карточки: наименование, описание, приоритет, дата, действия над задачей
 */
export const TaskItem = ({ task, isCardView = false, onEdit, onDelete, onToggle, actionLoading }) => {
  const { token } = theme.useToken();

  const loadingDelete = !!actionLoading?.[task.id]?.delete;
  const loadingToggle = !!actionLoading?.[task.id]?.toggle;

  const borderColor = task.completed
    ? token.Card.taskBorderCompleted
    : task.priority === "high"
    ? token.Card.taskBorderHigh
    : task.priority === "medium"
    ? token.Card.taskBorderMedium
    : token.Card.taskBorderLow;

  const actions = [
    <Button
      type="text"
      icon={task.completed ? <UndoOutlined /> : <CheckCircleOutlined />}
      onClick={() => onToggle(task)}
      key="toggle"
      loading={loadingToggle}
    />,
    <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(task)} key="edit" />,
    <Popconfirm
      title="Удалить задачу?"
      color={token.Card.taskBg}
      onConfirm={() => onDelete(task)}
      key="delete"
    >
      <Button type="text" danger icon={<DeleteOutlined />} loading={loadingDelete} />
    </Popconfirm>,
  ];

  const descriptionProps = {
    style: { whiteSpace: "pre-wrap", wordBreak: "break-word" },
    ellipsis: {
      rows: 4,
      expandable: "collapsible",
      symbol: (expanded) =>
        expanded ? <ShrinkOutlined style={{ color: "#28BE46" }} /> : <ArrowsAltOutlined style={{ color: "#28BE46" }} />,
    },
    copyable: task.description ? { text: task.description, icon: <CopyOutlined style={{ color: "#28BE46" }} /> } : false,
  };

  return isCardView ? (
    <Card
      hoverable
      title={<Tooltip title={task.title}><Paragraph strong ellipsis={{ rows: 1 }}>{task.title}</Paragraph></Tooltip>}
      extra={
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Tag color={borderColor}>{task.priority}</Tag>
          <Tag color={borderColor}>{formatDate(task.updatedAt || task.createdAt)}</Tag>
        </div>
      }
      actions={actions}
      style={{ border: `1px solid ${borderColor}`, borderRadius: token.borderRadius, background: token.Card.taskBg }}
    >
      <Paragraph {...descriptionProps}>{task.description}</Paragraph>
    </Card>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 3fr 1fr 1fr 1fr",
        gap: "1rem",
        alignItems: "center",
        padding: 8,
        borderRadius: token.borderRadius,
        background: token.Card.taskBg,
        marginBottom: 8,
      }}
    >
      <Paragraph strong>{task.title}</Paragraph>
      <Paragraph {...descriptionProps}>{task.description}</Paragraph>
      <Tag color={borderColor}>{task.priority}</Tag>
      {renderTaskDate(task.createdAt, task.updatedAt)}
      <div style={{ display: "flex", gap: "0.25rem" }}>{actions}</div>
    </div>
  );
};
