import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";

function TodoForm({ onAddTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAddTask(text);
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit} className="my-3">
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Nouvelle tâche..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="primary" type="submit" aria-label="Ajouter une tâche">
          <FiSend size={20} />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default TodoForm;