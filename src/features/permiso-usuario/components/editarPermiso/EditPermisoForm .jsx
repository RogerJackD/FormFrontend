import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { useIdContext } from "../../../../context/IdContext";


export const EditPermisoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const { idEncargado } = useIdContext();
  // Obtener datos iniciales
  useEffect(() => {
    if (location.state?.permisoData) {
      setInitialData(location.state.permisoData);
      setFormValues(location.state.permisoData);
      setIsLoading(false);
    } else {
      fetchPermisoData();
    }
  }, [id, location]);

  useEffect(() => {
  if (initialData && idEncargado !== initialData.encargado.id) {
    toast.error('No tienes permiso para editar este registro');
    navigate('/permisos');
  }
}, [initialData, idEncargado, navigate]);

  const fetchPermisoData = async () => {
    try {
      const response = await fetch(`https://formbackend-ndvy.onrender.com/api/permisos-instructores/${id}`);
      if (!response.ok) throw new Error('Error al cargar los datos');
      const data = await response.json();
      setInitialData(data);
      setFormValues(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      navigate(-1);
    }  
  };

  const setFormValues = (data) => {
    reset({
      dependencia: data.dependencia,
      hora_salida: data.hora_salida,
      hora_regreso: data.hora_regreso,
      motivo: data.motivo,
      detalle_motivo: data.detalle_motivo
    });
  };

  const onSubmit = async (formData) => {
    try {
      const loadingToast = toast.loading('Actualizando permiso...');
      
      const response = await fetch(`https://formbackend-ndvy.onrender.com/api/permisos-instructores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...initialData,
          ...formData
        })
      });

      toast.dismiss(loadingToast);
      
      if (response.ok) {
        toast.success('Permiso actualizado correctamente');
        navigate('/historialpermisosinstructor');
      } else {
        throw new Error('Error al actualizar el permiso');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Permiso</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dependencia</label>
          <input
            {...register("dependencia", { required: "Este campo es requerido" })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dependencia && <p className="text-red-500 text-sm mt-1">{errors.dependencia.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Salida</label>
            <input
              {...register("hora_salida", { required: "Este campo es requerido" })}
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.hora_salida && <p className="text-red-500 text-sm mt-1">{errors.hora_salida.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Regreso</label>
            <input
              {...register("hora_regreso", { required: "Este campo es requerido" })}
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.hora_regreso && <p className="text-red-500 text-sm mt-1">{errors.hora_regreso.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
          <select
            {...register("motivo", { required: "Seleccione un motivo" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un motivo</option>
            <option value="motivo salud">Motivo salud</option>
            <option value="asuntos personales">Asuntos personales</option>
            <option value="comision de servicio">Comisión de servicio</option>
          </select>
          {errors.motivo && <p className="text-red-500 text-sm mt-1">{errors.motivo.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Detalle del Motivo</label>
          <textarea
            {...register("detalle_motivo", { required: "Este campo es requerido" })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.detalle_motivo && <p className="text-red-500 text-sm mt-1">{errors.detalle_motivo.message}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};