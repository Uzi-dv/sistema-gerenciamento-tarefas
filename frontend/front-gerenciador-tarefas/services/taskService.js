// services/taskService.js
import api from "./api";

// Buscar todas as tarefas
export const buscarTarefas = () => {
  return api.get("/tarefas");
};

// Criar uma nova tarefa
export const criarTarefa = (tarefa) => {
  return api.post("/tarefas", tarefa);
};

// Atualizar uma tarefa existente
export const atualizarTarefa = (id, tarefaAtualizada) => {
  return api.put(`/tarefas/${id}`, tarefaAtualizada);
};

// Deletar uma tarefa
export const deletarTarefa = (id) => {
  return api.delete(`/tarefas/${id}`);
};
