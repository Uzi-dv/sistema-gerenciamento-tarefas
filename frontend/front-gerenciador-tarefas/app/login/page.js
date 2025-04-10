'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ForgotPassword from './ForgotPassword';
import { login } from '@/services/authServiceSelector'; // ✅ usando selector

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setEmail("");
    setSenha("");
    setErro("");
    setShowForgotPassword(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      const response = await login(email, senha);
      const { token } = response.data;

      // Salva o token (opcional - para futuras autenticações)
      localStorage.setItem("token", token);

      // Redireciona para a página de tarefas
      router.push('/tarefas');
    } catch (error) {
      if (error.response?.status === 401) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Erro ao tentar fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
        {!showForgotPassword ? (
          <>
            <h2 className="text-center mb-4 text-danger">Login</h2>

            {erro && <div className="alert alert-danger">{erro}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">E-mail:</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="E-mail do usuário"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="senha">Senha:</label>
                <div className="input-group">
                  <input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    aria-label="Senha do usuário"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="d-flex flex-column align-items-center mt-3">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none text-primary mb-2"
                onClick={() => setShowForgotPassword(true)}
                aria-label="Esqueci minha senha"
              >
                Esqueci minha senha
              </button>
              <Link href="/cadastro" className="text-decoration-none text-primary">
                Criar uma conta
              </Link>
            </div>
          </>
        ) : (
          <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        )}
      </div>
    </div>
  );
}
