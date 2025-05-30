import React, { useEffect, useState } from 'react'
import { getFormDatas } from "../../../shared"
import { PermisoDocenteRow } from "../components"
import { Toaster } from 'sonner';

export const PaginaHistorialDocente = () => {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('apellidos'); // Valor por defecto

  const obtenerRegistros = async(filtroParams = '') => {
    try {
      let URLAPI = "https://formbackend-ndvy.onrender.com/api/permisos-instructores";
      let aplicarOrdenInverso = false;
      
      // Si hay filtro, agregamos parámetros a la URL
      if (filtro.trim() !== '') {
        URLAPI += `?${tipoFiltro}=${encodeURIComponent(filtro)}`;
        
        // Caso especial para fecha que necesita formato específico
        if (tipoFiltro === 'fecha') {
          // Validar formato de fecha (simple)
          if (!/^\d{4}-\d{2}-\d{2}$/.test(filtro)) {
            alert('Por favor ingrese una fecha en formato YYYY-MM-DD');
            return;
          }
        }
      } else {
        // Si no hay filtro, marcamos para aplicar orden inverso
        aplicarOrdenInverso = true;
      }
      
      const data = await getFormDatas(URLAPI);
      
      // Aplicar orden inverso solo si no hay filtro activo
      setRegistros(aplicarOrdenInverso ? [...data].reverse() : data);
    } catch (error) {
      console.error('Error al obtener registros:', error);
      setRegistros([]);
    }
  }

  const manejarBusqueda = (e) => {
    e.preventDefault();
    obtenerRegistros();
  }

  useEffect(() => {
    obtenerRegistros();
  }, [])

  return (
    <>
      <Toaster position="top-right" richColors />
    
      <div className='flex flex-col mx-30 text-center gap-5 my-5'>
        <h1 className='text-4xl font-semibold mb-2'>PaginaHistorialDocente</h1>

        <form onSubmit={manejarBusqueda} className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <div className="flex gap-2">
            <select 
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="apellidos">Apellidos</option>
              <option value="id_senati">ID SENATI</option>
              <option value="fecha">Fecha (YYYY-MM-DD)</option>
            </select>
            
            <input 
              type={tipoFiltro === 'fecha' ? 'date' : 'text'} 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border rounded w-90 px-1 py-2 bg-white border-gray-400" 
              placeholder={
                tipoFiltro === 'apellidos' ? 'Buscar por apellidos...' : 
                tipoFiltro === 'id_senati' ? 'Buscar por ID SENATI...' : 
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
              setTipoFiltro('apellidos');
              obtenerRegistros();
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
          >
            Limpiar
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="hidden md:grid md:grid-cols-9 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-600 uppercase">ID</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">APELLIDOS</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">DEPENDENCIA</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">CARGOS</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">SALIDA</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">REGRESO</span>
          <span className="text-xs font-semibold text-gray-600 uppercase col-span-2">MOTIVO</span>
          <span className="text-xs font-semibold text-gray-600 uppercase">FECHA</span>
        </div>
        {
          registros?.length > 0 ? (
            registros.slice().reverse().map((registro) => 
              <PermisoDocenteRow 
                  key={registro.id} 
                  data={registro} 
                  {...registro}
                  onDeleteSuccess={() => obtenerRegistros()} 
                />
                          )
          ) : (
            <div className="p-4 text-center text-gray-500">
                                        
            </div>
          )
        }
      </div>
    </>
  )
}