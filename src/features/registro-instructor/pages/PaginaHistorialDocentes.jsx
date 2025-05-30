import React, { useEffect, useState } from "react";
import { getFormDatas } from "../../../shared";
import { HistorialDocentesRow } from "../components";
import { Toaster } from "sonner";

export const PaginaHistorialDocentes = () => {
  const [registros, setRegistros] = useState([]);

  const obtenerRegistros = async () => {
    try {
      const data = await getFormDatas("https://formbackend-ndvy.onrender.com/api/instructores");
      setRegistros([...data].reverse()); // Mostramos los más recientes primero
    } catch (error) {
      console.error("Error al obtener registros:", error);
      setRegistros([]);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      
      <div className="flex flex-col items-center text-center gap-5 my-5">
        <h1 className="text-4xl font-semibold">Historial de Instructores</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Cabecera Desktop */}
        <div className="hidden md:grid md:grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-600 uppercase">ID</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">NOMBRE COMPLETO</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">ID SENATI</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">CURSO</span>
          <span className="text-xs font-semibold text-gray-600 uppercase col-span-2">FECHA DE CREACIÓN</span>
        </div>

        {/* Registros */}
        {registros.length > 0 ? (
          registros.map((registro) => (
            <HistorialDocentesRow
              key={registro.id}
              {...registro}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No hay registros disponibles.
          </div>
        )}
      </div>
    </>
  );
};