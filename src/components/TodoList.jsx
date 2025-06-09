import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";
import { ListGroup, Button } from "react-bootstrap";

function TodoList({ tasks, onTooggle, onDelete }) {
  return (
    <ListGroup className="mt-3">
      {tasks.map((task) => (
        <ListGroup.Item
          key={task.id}
          className="d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: task.completed ? "#e0ffe0" : "#f8f9fa",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          <span style={{ color: "darkblue", fontWeight: "500" }}>{task.text}</span>
          <div className="d-flex gap-2">
            <Button
              variant={task.completed ? "success" : "outline-secondary"}
              onClick={() => onTooggle(task.id)}
            >
              {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
            </Button>
            <Button variant="danger" onClick={() => onDelete(task.id)}>
              <FaTrash />
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TodoList;