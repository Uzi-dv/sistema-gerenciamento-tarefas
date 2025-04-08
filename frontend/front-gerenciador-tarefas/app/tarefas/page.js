"use client";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useRouter } from "next/navigation";

export default function TarefasPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      if (Array.isArray(savedTasks)) {
        setTasks(savedTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas do localStorage:", error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const removeTask = (id) =>
    setTasks(tasks.filter((task) => task.id !== id));

  const editTask = (id, newText, newDescription, newDueDate) =>
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, description: newDescription, dueDate: newDueDate }
          : task
      )
    );

  const toggleCompletion = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <main className="container mt-4 mb-5 d-flex flex-column align-items-center">
      <div className="text-center mb-4">
        <h1 className="text-danger">Gerenciador de Tarefas</h1>
      </div>

      {/* Container único com mesma largura para formulário e lista */}
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          removeTask={removeTask}
          editTask={editTask}
          toggleCompletion={toggleCompletion}
        />
      </div>

      <div className="text-center mt-5">
        <button onClick={handleLogout} className="btn btn-secondary">
          Sair
        </button>
      </div>
    </main>
  );
}
