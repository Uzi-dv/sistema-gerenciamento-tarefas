"use client";

import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";

export default function CadastroForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const firstErrorRef = useRef(null);

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Nome é obrigatório";
    if (!formData.lastName.trim()) newErrors.lastName = "Sobrenome é obrigatório";
    if (!formData.email.includes("@") || !formData.email.includes("."))
      newErrors.email = "E-mail inválido";
    if (!formData.gender) newErrors.gender = "Gênero é obrigatório";
    if (formData.username.length < 4)
      newErrors.username = "Nome de usuário deve ter pelo menos 4 caracteres";
    if (!/(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(formData.password)) {
      newErrors.password = "A senha deve ter pelo menos uma letra maiúscula e um caractere especial";
    }
    if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      firstErrorRef.current = firstErrorKey;
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (validate()) {
      setSuccessMessage("Cadastro realizado com sucesso! ✅");
      console.log("Dados cadastrados:", formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        username: "",
        password: "",
      });
    } else if (firstErrorRef.current) {
      document.getElementsByName(firstErrorRef.current)[0].focus();
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <h2 className="text-center text-danger">Cadastro</h2>

        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            placeholder="Nome"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            placeholder="Sobrenome"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
          >
            <option value="">Selecione o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleChange}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          <small className="form-text text-muted">
            A senha deve ter pelo menos 6 caracteres, uma letra maiúscula e um caractere especial.
          </small>
        </div>

        <button type="submit" className="btn btn-danger w-100">
          Cadastrar
        </button>

        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => router.back()}>
          ← Voltar
        </button>
      </form>
    </div>
  );
}
