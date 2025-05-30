import { PDF } from "../components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "sonner";
import { EditButton } from "../components/editMateriales/EditButton";

export const PermisoMaterialesRow = ({ data, onDeleteSuccess }) => {
  const renderSafeValue = (value, defaultValue = '') => {
    if (!value) return defaultValue;
    
    if (typeof value === 'object' && value.nombre) {
      return `${value.nombre} ${value.apellidos || ''}`.trim();
    }
    
    if (typeof value === 'object') {
      return value.toString();
    }
    
    return value;
  };

  const handleDelete = async () => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="font-bold text-lg mb-2">Confirmar eliminación</h3>
        <p className="text-gray-700 mb-4">
          ¿Estás seguro de eliminar el permiso de {renderSafeValue(data?.nombre_aprendiz, 'este aprendiz')}?
        </p>
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
      const loadingToast = toast.loading("Eliminando permiso...");
      const response = await fetch(
        `https://formbackend-ndvy.onrender.com/api/permisos-materiales/${data.id}`,
        {
          method: "DELETE",
        }
      );

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("Permiso eliminado correctamente");
        onDeleteSuccess();
      } else {
        throw new Error("Error al eliminar el permiso");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-200">
      {/* Vista de escritorio */}
      <div className="hidden md:grid md:grid-cols-8 gap-4 p-4">
        {/* Columna ID */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 mb-1">ID</span>
          <span className="text-sm font-medium text-gray-900 truncate">
            {renderSafeValue(data?.id)}
          </span>
        </div>
        
        {/* Columna Aprendiz */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 mb-1">Aprendiz</span>
          <span className="text-sm font-medium text-gray-900 truncate">
            {renderSafeValue(data?.nombre_aprendiz)}
          </span>
        </div>
        
        {/* Columna Acción */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 mb-1">Acción</span>
          <span className="text-sm text-gray-700 truncate">
            {renderSafeValue(data?.accion)}
          </span>
        </div>
        
        {/* Columna Detalle */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 mb-1">Detalle</span>
          <span className="text-sm text-gray-700 truncate">
            {renderSafeValue(data?.detalle_accion)}
          </span>
        </div>
        
        {/* Columna Señor */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 mb-1">Señor</span>
          <span className="text-sm text-gray-700 truncate">
            {renderSafeValue(data?.nombre_señor)}
          </span>
        </div>
        
        {/* Columna Fecha */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 mb-1">Fecha</span>
          <span className="text-sm text-gray-700">
            {renderSafeValue(data?.fechaCreacion)}
          </span>
        </div>
        
        {/* Columna Instructor */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 mb-1">Instructor</span>
          <span className="text-sm text-gray-700 line-clamp-2">
            {renderSafeValue(data?.instructor)}
          </span>
        </div>
        
        {/* Columna Acciones */}
        <div className="flex items-center gap-2">
          <PDFDownloadLink
            document={<PDF data={{
              ...data,
              instructor: renderSafeValue(data?.instructor)
            }} />}
            fileName="PermisoMaterial.pdf"
            className="rounded bg-blue-700 text-white px-3 py-1.5 text-sm shadow font-semibold w-fit"
          >
            PDF
          </PDFDownloadLink>

          <EditButton data={data} />

          <button
            onClick={handleDelete}
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded w-fit"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Vista móvil */}
      <div className="md:hidden p-4">
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">
              #{renderSafeValue(data?.id)}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {renderSafeValue(data?.nombre_aprendiz)}
            </span>
          </div>
          <span className="text-xs text-gray-500 text-right">
            {renderSafeValue(data?.fechaCreacion)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <span className="text-xs text-gray-500 block">Acción</span>
            <span className="text-sm text-gray-700 truncate">
              {renderSafeValue(data?.accion)}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Encargado</span>
            <span className="text-sm text-gray-700 truncate">
              {renderSafeValue(data?.nombre_señor)}
            </span>
          </div>
        </div>

        <div className="mt-2">
          <span className="text-xs text-gray-500 block">Detalle</span>
          <span className="text-sm text-gray-700 line-clamp-2">
            {renderSafeValue(data?.detalle_accion)}
          </span>
        </div>

        <div className="mt-2">
          <span className="text-xs text-gray-500 block">Instructor</span>
          <span className="text-sm text-gray-700">
            {renderSafeValue(data?.instructor)}
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          <PDFDownloadLink
            document={<PDF data={{
              ...data,
              instructor: renderSafeValue(data?.instructor)
            }} />}
            fileName="PermisoMaterial.pdf"
            className="rounded bg-blue-700 text-white px-3 py-2 shadow font-semibold w-fit"
          >
            GUARDAR PDF
          </PDFDownloadLink>

           <EditButton data={data} />

          <button
            onClick={handleDelete}
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded w-fit"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};