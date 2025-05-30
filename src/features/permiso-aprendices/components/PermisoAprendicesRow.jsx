import React from 'react';
import { toast } from 'sonner';

export const PermisoAprendicesRow = ({ data, id, nombres, apellidos, ocupacion, grupo, programa, motivo, hora_salida, hora_retorno, tiempo_permiso, fechaCreacion, anulado, onDeleteSuccess }) => {

  const handleToggleAnulado = async () => {
    try {
      const ruta = anulado
        ? `https://formbackend-ndvy.onrender.com/api/permisos-aprendices/desanular/${id}`
        : `https://formbackend-ndvy.onrender.com/api/permisos-aprendices/anular/${id}`;

      const respuesta = await fetch(ruta, { method: 'PATCH' });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el estado del formulario');
      }

      toast.success(`Formulario ${anulado ? 'desanulado' : 'anulado'} correctamente`);
      onDeleteSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = () => {
    toast.info('Funcionalidad de edición aún no implementada');
  };

  return (
    <div className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-200">

      {/* Vista Desktop */}
      <div className="hidden md:grid md:grid-cols-11 gap-4 p-4">
        <div className="flex flex-col"><span className="text-sm text-gray-900 font-medium">{id}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-900">{nombres}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-900">{apellidos}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700">{ocupacion}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700">{grupo}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700">{programa}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700 line-clamp-2">{motivo}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700">{hora_salida}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700">{hora_retorno}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700">{tiempo_permiso}</span></div>
        <div className="flex flex-col"><span className="text-sm text-gray-700">{fechaCreacion}</span></div>

        
      </div>

      {/* Vista Móvil */}
      <div className="md:hidden p-4">
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">#{id}</span>
            <span className="text-sm font-semibold text-gray-900">{nombres} {apellidos}</span>
          </div>
          <span className="text-xs text-gray-500 text-right">{fechaCreacion}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <span className="text-sm text-gray-700">{ocupacion}</span>
          <span className="text-sm text-gray-700">{grupo}</span>
          <span className="text-sm text-gray-700">{programa}</span>
          <span className="text-sm text-gray-700">{hora_salida} - {hora_retorno}</span>
          <span className="text-sm text-gray-700">{tiempo_permiso}</span>
          <span className="text-sm text-gray-700 col-span-2">{motivo}</span>
        </div>
      </div>

      {/* Botones de acción en todas las vistas */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <button
          onClick={handleToggleAnulado}
          className={`text-sm text-white px-3 py-1 rounded font-semibold ${
            anulado ? 'bg-orange-500 hover:bg-yellow-600' : 'bg-orange-500 hover:bg-yellow-600'
          }`}
        >
          {anulado ? 'Desanular' : 'Anular'}
        </button>

        <button
          onClick={() => toast.info('Funcionalidad de PDF aún no implementada')}
          className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
        >
          Guardar PDF
        </button>

        <button
          onClick={handleEdit}
          className="text-sm text-white bg-yellow-500 hover:bg-orange-600 px-3 py-1 rounded"
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default PermisoAprendicesRow;
