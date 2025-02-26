"use client"; 

import CadastroForm from "./CadastroForm";

export default function Home() {
  return (
    <main className="container mt-5">
      <h1 className="text-danger text-center">Cadastro</h1>
      <CadastroForm />
    </main>
  );
}
