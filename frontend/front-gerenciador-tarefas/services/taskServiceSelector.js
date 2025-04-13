// Lê o valor da variável de ambiente
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// Decide qual serviço usar com base na variável
const service = USE_MOCK
  ? require("./taskService.mock")
  : require("./taskService.real");

// Exporta as funções conforme o serviço selecionado
export const buscarTarefas = service.buscarTarefas;
export const criarTarefa = service.criarTarefa;
export const atualizarTarefa = service.atualizarTarefa;
export const deletarTarefa = service.deletarTarefa;
