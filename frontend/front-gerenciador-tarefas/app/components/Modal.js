"use client";
import { useState, useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  addTask,
  message,
  onConfirm,
  onCancel
}) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (isOpen && !message) {
      setText("");
      setDescription("");
      setDueDate("");
    }
  }, [isOpen, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || !dueDate) {
      alert("Por favor, preencha o título e a data de conclusão.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      description: description.trim(),
      dueDate,
      completed: false,
    };

    addTask?.(newTask);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={`${styles.modalContent} shadow-lg rounded-4 p-4`}>
        {message ? (
          <>
            <h5 id="modal-title" className="mb-3">Confirmação</h5>
            <p className="mb-4">{message}</p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-success" onClick={onConfirm}>
                Confirmar
              </button>
              <button className="btn btn-outline-secondary" onClick={onCancel || onClose}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 id="modal-title" className="mb-4">Adicionar Nova Tarefa</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="modal-title-input" className="form-label">Título *</label>
                <input
                  id="modal-title-input"
                  type="text"
                  className="form-control"
                  placeholder="Digite o título da tarefa"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="modal-description" className="form-label">Descrição</label>
                <textarea
                  id="modal-description"
                  className="form-control"
                  placeholder="Descrição (opcional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="modal-dueDate" className="form-label">Data de Conclusão *</label>
                <input
                  id="modal-dueDate"
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="submit" className="btn btn-primary">
                  Adicionar
                </button>
                <button type="button" onClick={onClose} className="btn btn-outline-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
