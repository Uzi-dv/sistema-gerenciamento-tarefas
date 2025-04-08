"use client";
import { useState } from "react";
import AddTask from "./AddTask"; // ✅ novo componente
import TaskList from "./TaskList";

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text, description, dueDate) => {
    const newTask = {
      text,
      description,
      dueDate,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const editTask = (index, newText, newDescription, newDueDate) => {
    const updated = [...tasks];
    updated[index] = {
      ...updated[index],
      text: newText,
      description: newDescription,
      dueDate: newDueDate,
    };
    setTasks(updated);
  };

  const toggleCompletion = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="container mt-4 mx-auto" style={{ maxWidth: "700px" }}>
      <AddTask addTask={addTask} /> {/* ✅ novo botão com modal */}
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
}
