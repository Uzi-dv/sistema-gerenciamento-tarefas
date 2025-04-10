'use client';

import React, { useState } from 'react';
import { recuperarSenha } from '@/services/authServiceSelector'; // ✅ alteração aqui

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (!email) {
      setErro('Por favor, insira um email válido.');
      return;
    }

    try {
      setLoading(true);
      await recuperarSenha(email);
      setMensagem('Enviamos um link de recuperação de senha para o seu email.');
      setEmail('');
    } catch (error) {
      if (error.response?.status === 404) {
        setErro('E-mail não encontrado.');
      } else {
        setErro('Erro ao tentar recuperar a senha. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-center mb-4 text-danger">Recuperação de Senha</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="E-mail para recuperação de senha"
          />
        </div>
        <button type="submit" className="btn btn-danger w-100" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </button>
      </form>

      {mensagem && <div className="mt-3 text-center text-success">{mensagem}</div>}
      {erro && <div className="mt-3 text-center text-danger">{erro}</div>}

      {onBack && (
        <button
          className="btn btn-secondary w-100 mt-3"
          onClick={onBack}
          aria-label="Voltar para login"
        >
          Voltar
        </button>
      )}
    </>
  );
};

export default ForgotPassword;
