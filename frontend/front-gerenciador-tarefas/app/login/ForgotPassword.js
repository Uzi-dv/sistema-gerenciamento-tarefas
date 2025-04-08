'use client';

import React, { useState } from 'react';

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      setMessage('Por favor, insira um email válido.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setMessage('Enviamos um link de recuperação de senha para o seu email.');
      setLoading(false);
    }, 1500);
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

      {message && <div className="mt-3 text-center text-success">{message}</div>}

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
