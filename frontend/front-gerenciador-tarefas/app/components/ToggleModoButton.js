"use client";
import { useContext } from "react";
import { ModoContext } from "../context/ModoContext";

// Verifica se o modo mock está habilitado via variável de ambiente
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export default function ToggleModoButton() {
  const { modo, toggleModo } = useContext(ModoContext);

  // Esconde o botão se mock estiver desabilitado
  if (!useMock) return null;

  return (
    <div className="position-fixed bottom-0 end-0 m-3 z-3">
      <button
        onClick={toggleModo}
        className={`btn btn-${modo ? "warning" : "success"} shadow-sm`}
      >
        {modo ? "Modo: Mock" : "Modo: Real"}
      </button>
    </div>
  );
}
