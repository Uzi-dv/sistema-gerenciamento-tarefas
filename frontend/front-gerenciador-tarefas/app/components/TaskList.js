"use client";
import React, { useState } from "react";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

export default function TaskList({ tasks = [], removeTask, editTask, toggleCompletion }) {
  const [filtro, setFiltro] = useState("todas");
  const [ordenacao, setOrdenacao] = useState("data");

  const tarefasFiltradasEOrdenadas = tasks
    .filter((task) => {
      if (filtro === "todas") return true;
      return filtro === "concluidas" ? task.completed : !task.completed;
    })
    .sort((a, b) => {
      if (ordenacao === "data") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (ordenacao === "titulo") {
        return a.text.localeCompare(b.text);
      }
      return 0;
    });

  return (
    <section className={styles.pageContainer}>
      <div className={styles.taskListContainer}>
        <header className={styles.header}>
          <h2 className={styles.title}>Tarefas</h2>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="filter" className={styles.label}>Filtrar:</label>
              <select
                id="filter"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className={styles.select}
              >
                <option value="todas">Todas</option>
                <option value="pendentes">Pendentes</option>
                <option value="concluidas">Concluídas</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="sort" className={styles.label}>Ordenar por:</label>
              <select
                id="sort"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className={styles.select}
              >
                <option value="data">Data de conclusão</option>
                <option value="titulo">Título</option>
              </select>
            </div>
          </div>
        </header>

        {tarefasFiltradasEOrdenadas.length > 0 ? (
          <ul className={styles.taskList}>
            {tarefasFiltradasEOrdenadas.map((task) => (
              <li key={task.id} className={styles.taskListItem}>
                <TaskItem
                  task={task}
                  removeTask={() => removeTask(task.id)}
                  editTask={(newText, newDescription, newDueDate) =>
                    editTask(task.id, newText, newDescription, newDueDate)
                  }
                  toggleCompletion={() => toggleCompletion(task.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noTasks}>Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </section>
  );
}
