import { useIdContext } from "../../../../context/IdContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

export const EditButton = ({ data }) => {
  const { idEncargado } = useIdContext();
  const navigate = useNavigate();

  const handleEditClick = () => {
    // Verificación completa de la estructura de datos
    if (!data || !data.encargado) {
      toast.error('Error: Datos del encargado no disponibles');
      console.error('Datos recibidos en EditButton:', data);
      return;
    }

    // Verificar si el encargado coincide (ahora comparando con encargado.id)
    if (data.encargado.id === idEncargado) {
      navigate(`/editar-material/${data.id}`, { 
        state: { materialData: data } 
      });
    } else {
      toast.error(`Denegado: Registro realizado por otro encargado (ID: ${data.encargado.id}). Tu ID: ${idEncargado}`);
    }
  };

  return (
    <button 
      onClick={handleEditClick}
      className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
    >
      Editar
    </button>
  );
};