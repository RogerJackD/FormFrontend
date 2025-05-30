import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useIdContext } from "../../../../context/IdContext";

export const EditMaterialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const { idEncargado } = useIdContext();

  // Obtener datos iniciales
  useEffect(() => {
    if (location.state?.materialData) {
      setInitialData(location.state.materialData);
      setFormValues(location.state.materialData);
      setIsLoading(false);
    } else {
      fetchMaterialData();
    }
  }, [id, location]);

useEffect(() => {
  if (initialData && (!initialData.encargado || idEncargado !== initialData.encargado.id)) {
    toast.error('No tienes permiso para editar este registro');
    navigate('/historialpermisosmateriales');
  }
}, [initialData, idEncargado, navigate]);

  const fetchMaterialData = async () => {
    try {
      const response = await fetch(`https://formbackend-ndvy.onrender.com/api/permisos-materiales/${id}`);
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
      nombre_aprendiz: data.nombre_aprendiz,
      accion: data.accion,
      detalle_accion: data.detalle_accion,
      nombre_señor: data.nombre_señor,
      fechaCreacion: data.fechaCreacion
    });
  };

  const onSubmit = async (formData) => {
    try {
      const loadingToast = toast.loading('Actualizando permiso de materiales...');
      
      const response = await fetch(`https://formbackend-ndvy.onrender.com/api/permisos-materiales/${id}`, {
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
        toast.success('Permiso de materiales actualizado correctamente');
        navigate('/historialpermisosmateriales');
      } else {
        throw new Error('Error al actualizar el permiso de materiales');
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
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Permiso de Materiales</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Aprendiz</label>
          <input
            {...register("nombre_aprendiz", { required: "Este campo es requerido" })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nombre_aprendiz && <p className="text-red-500 text-sm mt-1">{errors.nombre_aprendiz.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Acción</label>
          <select
            {...register("accion", { required: "Seleccione una acción" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione una acción</option>
            <option value="entrada">entrada</option>
            <option value="salida">salida</option>
          </select>
          {errors.accion && <p className="text-red-500 text-sm mt-1">{errors.accion.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Detalle de la Acción</label>
          <textarea
            {...register("detalle_accion", { required: "Este campo es requerido" })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.detalle_accion && <p className="text-red-500 text-sm mt-1">{errors.detalle_accion.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Señor</label>
          <input
            {...register("nombre_señor",)}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nombre_señor && <p className="text-red-500 text-sm mt-1">{errors.nombre_señor.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID SENATI</label>
          <input
            {...register("id_senati")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
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