import api from "./api";

// Envia dados de login
export const login = (email, senha) => {
  return api.post("/login", { email, senha });
};

// Envia solicitação de recuperação de senha
export const recuperarSenha = (email) => {
  return api.post("/recuperar-senha", { email });
};

// Envia dados de cadastro
export const cadastrar = (nome, email, senha) => {
  return api.post("/cadastro", { nome, email, senha });
};
