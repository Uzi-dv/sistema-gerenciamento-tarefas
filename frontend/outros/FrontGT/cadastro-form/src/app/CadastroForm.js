"use client";

import { useState } from "react";

export default function CadastroForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    username: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Nome é obrigatório";
    if (!formData.lastName.trim()) newErrors.lastName = "Sobrenome é obrigatório";
    if (!formData.email.includes("@")) newErrors.email = "E-mail inválido";
    if (!formData.gender) newErrors.gender = "Gênero é obrigatório";
    if (formData.username.length < 4)
      newErrors.username = "Nome de usuário deve ter pelo menos 4 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Cadastro realizado com sucesso!");
      console.log(formData);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <h2 className="text-center text-danger"></h2>

        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            placeholder="Nome"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            placeholder="Sobrenome"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>

        <div className="mb-3">
          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Selecione o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
          {errors.gender && <span className="text-danger">{errors.gender}</span>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="text-danger">{errors.username}</span>}
        </div>

        <button type="submit" className="btn btn-danger w-100">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
