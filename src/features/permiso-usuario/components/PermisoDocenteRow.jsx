import { PDF } from "../components"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { toast } from 'sonner'
import { EditButton } from "./editarPermiso" 
import { DeleteButton } from "../components/eliminarPermiso"

export const PermisoDocenteRow = ({data, id, apellidos, dependencia, cargo, hora_salida, hora_regreso, detalle_motivo, fechaCreacion, onDeleteSuccess }) => {
  
  
  return (
    <>
      <div className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-200">
        {/* Versión Desktop (md: en adelante) */}
        <div className="hidden md:grid md:grid-cols-9 gap-4 p-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 truncate">{id}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 truncate">{apellidos}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 truncate">{dependencia}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 truncate">{cargo}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{hora_salida}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{hora_regreso}</span>
          </div>
          
          <div className="flex flex-col col-span-2">
            <span className="text-sm text-gray-700 line-clamp-2">{detalle_motivo}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{fechaCreacion}</span>
          </div>
        </div>
        
        {/* Versión Móvil (md: oculto) - Ocupa todo el ancho */}
        <div className="md:hidden p-4">
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">#{id}</span>
              <span className="text-sm font-semibold text-gray-900">{apellidos}</span>
            </div>
            <span className="text-xs text-gray-500 text-right">{fechaCreacion}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2 w-full">
            <div className="w-full">
              <span className="text-sm text-gray-700 truncate w-full">{dependencia}</span>
            </div>
            <div className="w-full">
              <span className="text-sm text-gray-700 truncate w-full">{cargo}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2 w-full">
            <div className="w-full">
              <span className="text-sm text-gray-700 w-full">{hora_salida}</span>
            </div>
            <div className="w-full">
              <span className="text-sm text-gray-700 w-full">{hora_regreso}</span>
            </div>
          </div>
          
          <div className="mt-2 w-full">
            <span className="text-sm text-gray-700 line-clamp-2 w-full">{detalle_motivo}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:col-span-11">

            <PDFDownloadLink document={ <PDF data={data}/> } fileName='FirsPDF.pdf' className=' text-white px-2 pt-0.5 rounded font-semibold bg-blue-600'>
            Guardar pdf
            </PDFDownloadLink>

            <DeleteButton data={data} onDeleteSuccess={onDeleteSuccess} />
            <EditButton data={data} />
        </div>

        </div>
    </>
  )
}