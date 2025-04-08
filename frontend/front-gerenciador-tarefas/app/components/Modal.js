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
    // Limpa os campos sempre que o modal abrir
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

    addTask?.(newTask); // Só chama se for passado

    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent}>
        {/* Modal de Confirmação */}
        {message ? (
          <>
            <h2 id="modal-title" className={styles.modalTitle}>Confirmação</h2>
            <p className={styles.confirmMessage}>{message}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.addButton} onClick={onConfirm}>
                Confirmar
              </button>
              <button className={styles.cancelButton} onClick={onCancel || onClose}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          // Modal de Adição de Tarefa
          <>
            <h2 id="modal-title" className={styles.modalTitle}>Adicionar Nova Tarefa</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="modal-title-input">Título *</label>
                <input
                  id="modal-title-input"
                  type="text"
                  placeholder="Digite o título da tarefa"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-description">Descrição</label>
                <textarea
                  id="modal-description"
                  placeholder="Descrição (opcional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-dueDate">Data de Conclusão *</label>
                <input
                  id="modal-dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.addButton}>
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                >
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
