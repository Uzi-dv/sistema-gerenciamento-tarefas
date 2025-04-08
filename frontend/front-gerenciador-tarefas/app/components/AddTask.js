import React, { useState } from "react";
import styles from "./AddTask.module.css";
import Modal from "./Modal";

export default function AddTask({ addTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.addTaskContainer}>
      <button onClick={handleOpenModal} className={styles.addTaskButton}>
        + Nova Tarefa
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} addTask={addTask} />
    </div>
  );
}
