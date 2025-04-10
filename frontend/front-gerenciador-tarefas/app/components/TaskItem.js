"use client";
import React, { useState, useEffect } from "react";
import styles from "./TaskItem.module.css";
import Modal from "./Modal";

export default function TaskItem({ task, removeTask, editTask, toggleCompletion }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text || "");
  const [newDescription, setNewDescription] = useState(task.description || "");
  const [newDueDate, setNewDueDate] = useState(task.dueDate || "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    setNewText(task.text || "");
    setNewDescription(task.description || "");
    setNewDueDate(task.dueDate || "");
  }, [task]);

  const handleToggleCompletion = () => {
    setActionType(task.completed ? "desfazer" : "concluir");
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (isEditing && newText.trim() !== "") {
      editTask(newText, newDescription, newDueDate);
    }
    setIsEditing(!isEditing);
  };

  const handleRemove = () => {
    removeTask();
  };

  const handleModalConfirm = () => {
    toggleCompletion();
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`card shadow-sm mb-4 p-3 rounded-4 ${styles.taskContainer}`}>
      {!isEditing ? (
        <>
          <h5 className={`fw-bold ${task.completed ? styles.completed : ""}`}>
            {task.text}
          </h5>

          {task.description && (
            <p className="text-muted mb-1">{task.description}</p>
          )}

          <p className="mb-1">
            <strong>Status:</strong> {task.completed ? "Concluída" : "Pendente"}
          </p>

          {task.dueDate && (
            <p className="mb-1">
              <strong>Data de conclusão:</strong>{" "}
              {new Date(task.dueDate).toLocaleString()}
            </p>
          )}
        </>
      ) : (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Título da tarefa"
            className="form-control mb-2"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Descrição da tarefa"
            className="form-control mb-2"
          />
          <label htmlFor={`dueDate-${task.id}`} className="form-label">
            Data e Hora de Conclusão:
          </label>
          <input
            type="datetime-local"
            id={`dueDate-${task.id}`}
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="form-control"
          />
        </div>
      )}

      <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
        <button className="btn btn-success" onClick={handleToggleCompletion}>
          {task.completed ? "Desfazer" : "Concluir"}
        </button>
        <button
          className="btn btn-warning"
          onClick={handleEdit}
          disabled={isEditing && newText.trim() === ""}
        >
          {isEditing ? "Salvar" : "Editar"}
        </button>
        <button className="btn btn-danger" onClick={handleRemove}>
          Remover
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        message={`Tem certeza que deseja ${actionType} a tarefa "${task.text}"?`}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
}
