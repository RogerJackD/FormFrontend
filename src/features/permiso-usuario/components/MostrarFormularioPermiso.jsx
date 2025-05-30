import { useForm } from "react-hook-form";
import { postFormData } from "../../../shared/services";
import { Toaster, toast } from 'sonner';
import ProfessorSearch from "./ProfessorSearch";
import { useEffect } from "react";
import { useIdContext } from "../../../context/IdContext";


export const MostrarFormularioPermiso = () => {
  const URLAPI = "https://formbackend-ndvy.onrender.com/api/permisos-instructores";

  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting, errors },
    setValue,
    watch,
    trigger
  } = useForm();

  const handleProfessorSelected = (professor) => {
    setValue("idSenati", professor.idSenati);
    setValue("apellidos", professor.apellidos);
    setValue("cargo", professor.curso);
  };


  const onSubmit = async (data) => {
    // Validar todos los campos antes de enviar
    const isValid = await trigger();
    
    if (!isValid) {
      // Mostrar mensajes de error para campos faltantes
      Object.entries(errors).forEach(([fieldName, error]) => {
        toast.error(`${fieldName}: ${error.message}`);
      });
      return;
    }

    try {
      const promise = postFormData(data, URLAPI);
      
      toast.promise(promise, {
        loading: 'Enviando formulario...',
        success: (response) => {
          console.log(response);
          return `${response.message}`;
        },
        error: (error) => {
          console.error("Error completo:", error);
          if (error.response?.data?.message) {
            return error.response.data.message;
          }
          return error.message || 'Error al enviar el formulario';
        }
      });

      await promise;
    } catch (error) {
      console.error("Error en el catch:", error);
      toast.error(`Error inesperado: ${error.message}`);
    }
  };
  // Llamamos al IdContext para obtener el id del Encargado
  const { idEncargado } = useIdContext();
  useEffect(() => {
    if (idEncargado) {
      setValue("encargadoId", idEncargado);
    }
  }, [idEncargado, setValue]);

  return (
    <>
      <div className="my-5">
       <ProfessorSearch onProfessorSelected={handleProfessorSelected}/>
      </div>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="idSenati" className='font-semibold'>ID senati intructor</label>
        <input 
          type="number" 
          id='idSenati' 
          placeholder='ingresa id intructor...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("idSenati", { required: "Este campo es requerido" })} 
        />
        {errors.idSenati && <span className="text-red-500 text-sm">{errors.idSenati.message}</span>}

        <label htmlFor="apellidos" className='font-semibold'>Apellidos</label>
        <input 
          type="text" 
          id='apellidos' 
          placeholder='ingresa apellidos...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("apellidos", { required: "Este campo es requerido" })} 
        />
        {errors.apellidos && <span className="text-red-500 text-sm">{errors.apellidos.message}</span>}

        <label htmlFor="dependencia" className='font-semibold'>Dependencia</label>
        <input 
          type="text" 
          id='dependencia' 
          placeholder='ingresa dependencia...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("dependencia", { required: "Este campo es requerido" })} 
        />  
        {errors.dependencia && <span className="text-red-500 text-sm">{errors.dependencia.message}</span>}

        <label htmlFor="cargo" className='font-semibold'>Cargo</label>
        <input 
          type="text" 
          id='cargo' 
          placeholder='ingresa cargo...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("cargo", { required: "Este campo es requerido" })}
        />
        {errors.cargo && <span className="text-red-500 text-sm">{errors.cargo.message}</span>}

        <label htmlFor="hora_salida" className='font-semibold'>Hora salida</label>
        <input 
          type="time" 
          id='hora_salida' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("hora_salida", { required: "Este campo es requerido" })}
        />
        {errors.hora_salida && <span className="text-red-500 text-sm">{errors.hora_salida.message}</span>}

        <label htmlFor="hora_regreso" className='font-semibold'>Hora regreso</label>
        <input 
          type="time" 
          id='hora_regreso' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("hora_regreso", { required: "Este campo es requerido" })} 
        />
        {errors.hora_regreso && <span className="text-red-500 text-sm">{errors.hora_regreso.message}</span>}

        <h1 className='text-2xl my-3 font-black'>Motivo de salida</h1>

        <div className='flex flex-col'>
          <label htmlFor="motivo" className='font-semibold'>Seleccionar motivo</label>
          <select 
            id="motivo" 
            className='border px-2 py-2 rounded mb-2 bg-white'
            {...register("motivo", { required: "Este campo es requerido" })}
          >
            <option value="salud">Permiso Salud</option>
            <option value="comision servicio">Comisión servicio</option>
            <option value="asuntos personales">Asuntos personales</option>
          </select>
          {errors.motivo && <span className="text-red-500 text-sm">{errors.motivo.message}</span>}
          
          <label htmlFor="detalle_motivo" className='font-semibold mb-1'>Detalle motivo</label>
          <textarea 
            id='detalle_motivo' 
            className='border px-2 py-1 h-30 mb-2 bg-white border-gray-400 ' 
            placeholder='Describe el motivo...'
            {...register("detalle_motivo", { 
              required: "Este campo es requerido",
              minLength: {
                value: 10,
                message: "El detalle debe tener al menos 10 caracteres"
              }
            })}
          />
          {errors.detalle_motivo && (
            <span className="text-red-500 text-sm">
              {errors.detalle_motivo.message}
            </span>
          )}

          <button 
            type="submit"
            disabled={isSubmitting} 
            className={`rounded px-3 py-2 w-40 mb-2 font-semibold shadow-lg mt-4 hover:bg-blue-700 active:bg-blue-800 ${
              isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white shadow-blue-400 hover:bg-blue-700'
            }`}
          > 
            {isSubmitting ? 'Enviando...' : 'Registrar'} 
          </button>
        </div>
        <label htmlFor="encargadoId" className='font-semibold'>Encargado ID</label>
        <p className='border px-2 py-1 rounded bg-gray-100 border-gray-400'>
          {idEncargado || "Cargando..."}
        </p>
        {errors.idencargado && <span className="text-red-500 text-sm">{errors.idencargado.message}</span>}
      </form>
      <Toaster/>
    </>
  )
}