import { useIdContext } from "../../../../context/IdContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

export const EditButton = ({ data }) => {
  const { idEncargado } = useIdContext();
  const navigate = useNavigate();

  const handleEditClick = () => {
    // Verificar si el encargado coincide
    if (data.encargado.id === idEncargado) {
      navigate(`/editar-permiso/${data.id}`, { state: { permisoData: data } });
    } else {
      toast.error('Denegado: Registro realizado por otro encargado.');
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