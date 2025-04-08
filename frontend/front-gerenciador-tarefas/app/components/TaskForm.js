"use client";
import React, { useState } from "react";
import styles from "./TaskForm.module.css";

export default function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("O título da tarefa é obrigatório.");
      return;
    }

    // Validação opcional de data futura
    if (dueDate && new Date(dueDate) < new Date()) {
      const confirmar = confirm("A data/hora de conclusão já passou. Deseja continuar?");
      if (!confirmar) return;
    }

    const novaTarefa = {
      id: Date.now(), // ID único baseado no timestamp atual
      text: text.trim(),
      description: description.trim(),
      dueDate,
      completed: false,
    };

    addTask(novaTarefa);
    setText("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Adicionar Nova Tarefa</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="task" className={styles.label}>Título</label>
        <input
          id="task"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite o título da tarefa"
          required
          aria-label="Título da tarefa"
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva a tarefa (opcional)"
          aria-label="Descrição da tarefa"
          className={styles.textarea}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="dueDate" className={styles.label}>Data e Hora de Conclusão</label>
        <input
          id="dueDate"
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Data e hora da tarefa"
          className={styles.input}
        />
      </div>

      <button type="submit" className="btn btn-danger w-100">
        Adicionar Tarefa
      </button>
    </form>
  );
}
