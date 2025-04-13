"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const ModoContext = createContext(); // 👈 exportar o ModoContext também

export function ModoProvider({ children }) {
  const [modo, setModo] = useState(true); // true = usar mock, false = usar real

  useEffect(() => {
    const modoSalvo = localStorage.getItem("modo");
    if (modoSalvo !== null) {
      setModo(modoSalvo === "true");
    }
  }, []);

  const toggleModo = () => {
    const novoModo = !modo;
    setModo(novoModo);
    localStorage.setItem("modo", novoModo.toString());
  };

  return (
    <ModoContext.Provider value={{ modo, toggleModo }}>
      {children}
    </ModoContext.Provider>
  );
}
