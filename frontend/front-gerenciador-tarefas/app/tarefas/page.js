"use client";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useRouter } from "next/navigation";

import {
  buscarTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
} from "../../services/taskServiceSelector";

export default function TarefasPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const response = await buscarTarefas();
        setTasks(response.data || response); // funciona para mock e backend real
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    carregarTarefas();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await criarTarefa(task);
      setTasks([...tasks, response.data || task]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deletarTarefa(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    }
  };

  const editTask = async (id, newText, newDescription, newDueDate) => {
    try {
      const tarefaAtualizada = {
        text: newText,
        description: newDescription,
        dueDate: newDueDate,
      };
      const response = await atualizarTarefa(id, tarefaAtualizada);
      setTasks(tasks.map((task) => (task.id === id ? response.data || tarefaAtualizada : task)));
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const tarefaAtualizada = { ...task, completed: !task.completed };
      const response = await atualizarTarefa(id, tarefaAtualizada);
      setTasks(tasks.map((t) => (t.id === id ? response.data || tarefaAtualizada : t)));
    } catch (error) {
      console.error("Erro ao alternar conclusão:", error);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <main className="container mt-4 mb-5 d-flex flex-column align-items-center">
      <div className="text-center mb-4">
        <h1 className="text-danger">Gerenciador de Tarefas</h1>
      </div>

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
