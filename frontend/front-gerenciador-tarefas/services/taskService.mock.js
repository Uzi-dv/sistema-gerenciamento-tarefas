let tasks = JSON.parse(localStorage.getItem("mock_tasks")) || [];

// Função para salvar as tarefas no localStorage
const salvarTarefas = () => {
  localStorage.setItem("mock_tasks", JSON.stringify(tasks));
};

export function buscarTarefas() {
  return Promise.resolve({ data: [...tasks] });
}

export function criarTarefa(newTask) {
  const novaTarefa = { ...newTask, id: Date.now(), completed: false };
  tasks.push(novaTarefa);
  salvarTarefas();
  return Promise.resolve({ data: novaTarefa });
}

export function deletarTarefa(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  salvarTarefas();
  return Promise.resolve({ data: null });
}

export function atualizarTarefa(taskId, tarefaAtualizada) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, ...tarefaAtualizada } : task
  );
  salvarTarefas();
  return Promise.resolve({ data: tarefaAtualizada });
}

export function toggleConclusaoTarefa(taskId) {
  let tarefaAtualizada = null;
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      tarefaAtualizada = { ...task, completed: !task.completed };
      return tarefaAtualizada;
    }
    return task;
  });
  salvarTarefas();
  return Promise.resolve({ data: tarefaAtualizada });
}
