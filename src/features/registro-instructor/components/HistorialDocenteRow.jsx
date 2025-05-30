export const HistorialDocentesRow = ({
  id,
  nombre,
  apellidos,
  idSenati,
  curso,
  fechaCreacion
}) => {
  return (
    <div className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-200">
      {/* Versión Desktop */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 p-4">
        <div className="text-sm font-medium text-gray-900 truncate">{id}</div>
        <div className="text-sm font-medium text-gray-900 truncate">{nombre} {apellidos}</div>
        <div className="text-sm text-gray-700 truncate">{idSenati}</div>
        <div className="text-sm text-gray-700 truncate">{curso}</div>
        <div className="text-sm text-gray-700 col-span-2">{fechaCreacion}</div>
      </div>

      {/* Versión Móvil */}
      <div className="md:hidden p-4">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">#{id} - {nombre} {apellidos}</span>
            <span className="text-sm text-gray-700">{curso}</span>
          </div>
          <span className="text-xs text-gray-500">{fechaCreacion}</span>
        </div>

        <div className="mt-2">
          <span className="text-sm text-gray-700">ID Senati: {idSenati}</span>
        </div>
      </div>
    </div>
  );
};