import React, { useEffect, useState } from "react";
import { getFormDatas } from "../../../shared";
import { PermisoMaterialesRow } from "../components";
import { Toaster } from "sonner";

export const PaginaHistorialMateriales = () => {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("nombre_aprendiz");

  const obtenerRegistros = async () => {
    try {
      let URLAPI = "https://formbackend-ndvy.onrender.com/api/permisos-materiales";
      let aplicarOrdenInverso = false;
      
      if (filtro.trim() !== "") {
        URLAPI += `?${tipoFiltro}=${encodeURIComponent(filtro)}`;
      } else {
        aplicarOrdenInverso = true;
      }

      const data = await getFormDatas(URLAPI);
      setRegistros(aplicarOrdenInverso ? [...data].reverse() : data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
      setRegistros([]);
    }
  };

  const manejarBusqueda = (e) => {
    e.preventDefault();
    obtenerRegistros();
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className="flex flex-col mx-30 text-center gap-5">
        <h1 className="text-4xl">Historial de Permisos de Materiales</h1>

        <form
          onSubmit={manejarBusqueda}
          className="flex flex-col md:flex-row gap-3 items-center justify-center"
        >
          <div className="flex gap-2">
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="nombre_aprendiz">Nombre del aprendiz</option>
              <option value="id">ID</option>
              <option value="fechaCreacion">Fecha</option>
            </select>

            <input
              type={tipoFiltro === "fechaCreacion" ? "date" : "text"}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border rounded px-2 py-1"
              placeholder={
                tipoFiltro === "nombre_aprendiz"
                  ? "Buscar por aprendiz..."
                  : tipoFiltro === "id"
                  ? "Buscar por ID..."
                  : "Buscar por fecha..."
              }
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Buscar
          </button>

          <button
            type="button"
            onClick={() => {
              setFiltro("");
              setTipoFiltro("nombre_aprendiz");
              obtenerRegistros();
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
          >
            Limpiar
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-6">
        <div className="hidden md:grid md:grid-cols-8 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-600 uppercase">
            ID
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Aprendiz
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Acción
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Detalle
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Señor
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Fecha
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Instructor
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Acciones
          </span>
        </div>

        {registros?.length > 0 ? (
          registros.slice().reverse().map((registro) => (
            <PermisoMaterialesRow
              key={registro.id}
              data={registro}
              onDeleteSuccess={() => obtenerRegistros()}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No se encontraron registros {filtro ? `para "${filtro}"` : ""}
          </div>
        )}
      </div>
    </>
  );
};

