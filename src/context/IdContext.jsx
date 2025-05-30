import { createContext, useState, useContext, useEffect } from "react";

const IdContext = createContext();

export const useIdContext = () => useContext(IdContext);

export function IdContextProvider({ children }) {
  const [idEncargado, setIdEncargado] = useState(() => {
    const storedData = localStorage.getItem("encargado");
    return storedData ? JSON.parse(storedData).id : null;
  });

  useEffect(() => {
    if (idEncargado !== null) {
      localStorage.setItem("encargado", JSON.stringify({ id: idEncargado }));
    }
  }, [idEncargado]);

  return (
    <IdContext.Provider value={{ idEncargado, setIdEncargado }}>
      {children}
    </IdContext.Provider>
  );
}
