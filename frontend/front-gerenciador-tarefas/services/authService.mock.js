const usuarios = [
    {
      id: 1,
      nome: "Usuário Teste",
      email: "usuario@email.com",
      senha: "123456",
    },
  ];
  
  export function login(email, senha) {
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );
  
    if (usuario) {
      return Promise.resolve({ data: { mensagem: "Login bem-sucedido" } });
    } else {
      return Promise.reject({
        response: { data: { mensagem: "Credenciais inválidas" } },
      });
    }
  }
  
  export function cadastrar(nome, email, senha) {
    const jaExiste = usuarios.some((u) => u.email === email);
  
    if (jaExiste) {
      return Promise.reject({
        response: { data: { mensagem: "E-mail já cadastrado" } },
      });
    }
  
    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      senha,
    };
  
    usuarios.push(novoUsuario);
  
    return Promise.resolve({ data: { mensagem: "Usuário cadastrado com sucesso" } });
  }
  
  export function recuperarSenha(email) {
    const usuario = usuarios.find((u) => u.email === email);
  
    if (usuario) {
      return Promise.resolve({ data: { mensagem: "E-mail de recuperação enviado" } });
    } else {
      return Promise.reject({
        response: { data: { mensagem: "E-mail não encontrado" } },
      });
    }
  }
  