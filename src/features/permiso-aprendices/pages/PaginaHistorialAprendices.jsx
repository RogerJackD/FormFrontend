import React, { useEffect, useState } from 'react';
import { getFormDatas } from '../../../shared';
import { PermisoAprendicesRow } from '../components/';
import { Toaster } from 'sonner';

export const PaginaHistorialAprendices = () => {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('nombre');

  const obtenerRegistros = async () => {
    try {
      let URLAPI = "https://formbackend-ndvy.onrender.com/api/permisos-aprendices";

      if (tipoFiltro === 'anulado') {
        URLAPI += `?anulado=true`;
      } else if (filtro.trim() !== '') {
        if (tipoFiltro === 'fecha' && !/^\d{4}-\d{2}-\d{2}$/.test(filtro)) {
          alert('Por favor ingrese una fecha en formato YYYY-MM-DD');
          return;
        }
        URLAPI += `?${tipoFiltro}=${encodeURIComponent(filtro)}`;
      }

      const data = await getFormDatas(URLAPI);
      setRegistros(data);
    } catch (error) {
      console.error('Error al obtener registros:', error);
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

  useEffect(() => {
    if (tipoFiltro === 'anulado') {
      obtenerRegistros();
    }
  }, [tipoFiltro]);

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className='flex flex-col mx-30 text-center gap-5 my-5'>
        <h1 className='text-4xl font-semibold mb-2'>PaginaHistorialAprendices</h1>

        <form onSubmit={manejarBusqueda} className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <div className="flex gap-2">
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="nombre">Nombre</option>
              <option value="grupo">Grupo</option>
              <option value="fecha">Fecha (YYYY-MM-DD)</option>
              <option value="anulado">Formularios anulados</option>
            </select>

            <input
              type={tipoFiltro === 'fecha' ? 'date' : 'text'}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              disabled={tipoFiltro === 'anulado'}
              className={`border rounded w-90 px-1 py-2 bg-white border-gray-400 ${tipoFiltro === 'anulado' ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
              placeholder={
                tipoFiltro === 'nombre' ? 'Buscar por nombre...' :
                tipoFiltro === 'grupo' ? 'Buscar por grupo...' :
                tipoFiltro === 'anulado' ? 'Buscar formularios anulados...' :
                'Seleccione una fecha'
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
              setFiltro('');
              setTipoFiltro('nombre');
              obtenerRegistros();
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
          >
            Limpiar
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="hidden md:grid md:grid-cols-11 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-600 uppercase">ID</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Nombres</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Apellidos</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Ocupación</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Grupo</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Programa</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Motivo</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Salida</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Retorno</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Tiempo</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">Fecha</span>
        </div>

        {
          registros?.length > 0 ? (
            registros.map((registro) => (
              <PermisoAprendicesRow
                key={registro.id}
                {...registro}
                onDeleteSuccess={obtenerRegistros}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se encontraron registros {filtro ? `para "${filtro}"` : ''}
            </div>
          )
        }
      </div>
    </>
  );
};