import { useState, useContext, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import FilterBar from "../components/FilterBar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { getTasksFromStorage, saveTasksToStorage } from "../utils/storage";
import { AuthContext } from "../context/AuthContext";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const { currentuser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storagetask = getTasksFromStorage();
    if (storagetask) setTasks(storagetask);
  }, []);

  useEffect(() => {
    if (!currentuser) navigate("/login");
  }, [currentuser]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const toggleTask = (taskID) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskID ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const deleteTask = (taskID) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskID);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const filterTasks = () => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  };

  return (
    <>
    
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f0f8ff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#4A90E2", fontSize: "28px", fontWeight: "600" }}>
          Bienvenue, {currentuser?.identifiant || currentuser?.email}
        </h2>
        <p style={{ fontSize: "18px", color: "#6c757d" }}>
          Voici votre emploi du temps
        </p>
      </div>

      <TodoForm onAddTask={addTask} />
      <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      <TodoList tasks={filterTasks()} onTooggle={toggleTask} onDelete={deleteTask} />


    </>
  );
}

export default Todo;