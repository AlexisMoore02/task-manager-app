import { Button, Input, Select, Row, Col } from "antd";

/**
 * Панель управления задачами
 * - Поиск
 * - Фильтрация
 * - Добавление новой задачи
 */
export const TaskControls = ({ filter, setFilter, search, setSearch, onAddTask }) => (
  <Row gutter={[16, 16]} justify="start" style={{ margin: "0 0 1.5rem .5rem" }}>
    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
      <Input.Search
        placeholder="Поиск задач"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        enterButton
        style={{ width: "100%" }}
      />
    </Col>

    <Col xs={12} sm={8} md={6} lg={4} xl={3}>
      <Select
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "Все" },
          { value: "active", label: "Активные" },
          { value: "completed", label: "Выполненные" },
        ]}
        style={{ width: "100%" }}
      />
    </Col>

    <Col xs={12} sm={8} md={6} lg={4} xl={3}>
      <Button type="primary" onClick={onAddTask} block>
        Добавить задачу
      </Button>
    </Col>
  </Row>
);