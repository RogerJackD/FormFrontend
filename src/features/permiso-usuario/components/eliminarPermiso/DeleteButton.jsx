import { useIdContext } from "../../../../context/IdContext";
import { toast } from 'sonner';

export const DeleteButton = ({ data, onDeleteSuccess }) => {
  const { idEncargado } = useIdContext();

  const handleDelete = async () => {
    // Verificar si el encargado coincide
    if (data.encargado.id !== idEncargado) {
      toast.error('Denegado: Solo el encargado que realizó el registro puede eliminarlo.');
      return;
    }

    // Mostrar diálogo de confirmación
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="font-bold text-lg mb-2">Confirmar eliminación</h3>
        <p className="text-gray-700 mb-4">¿Estás seguro de eliminar el permiso de {data.apellidos}?</p>
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => toast.dismiss(t)}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button 
            onClick={async () => {
              toast.dismiss(t);
              await executeDelete();
            }}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    ));
  };

  const executeDelete = async () => {
    try {
      const loadingToast = toast.loading('Eliminando permiso...');
      
      const response = await fetch(`https://formbackend-ndvy.onrender.com/api/permisos-instructores/${data.id}`, {
        method: 'DELETE'
      });

      toast.dismiss(loadingToast);
      
      if (response.ok) {
        toast.success('Permiso eliminado correctamente');
        if (onDeleteSuccess) onDeleteSuccess(); // Llama a la función para actualizar 
      } else {
        throw new Error('Error al eliminar el permiso');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-sm text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
    >
      Eliminar
    </button>
  );
};