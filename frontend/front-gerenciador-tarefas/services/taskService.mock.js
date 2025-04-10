let tasks = [];

export function buscarTarefas() {
  return Promise.resolve([...tasks]);
}

export function criarTarefa(newTask) {
  const novaTarefa = { ...newTask, id: Date.now(), completed: false };
  tasks.push(novaTarefa);
  return Promise.resolve(novaTarefa);
}

export function deletarTarefa(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  return Promise.resolve();
}

export function atualizarTarefa(taskId, tarefaAtualizada) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, ...tarefaAtualizada } : task
  );
  return Promise.resolve();
}
