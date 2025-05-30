import { useForm } from 'react-hook-form'
import { postFormData } from '../../../shared/services';
import { Toaster, toast } from 'sonner';

import { useEffect } from "react";
import { useIdContext } from "../../../context/IdContext";

export const MostrarFormularioAprendices = () => {
  const URLAPI = 'https://formbackend-ndvy.onrender.com/api/permisos-aprendices';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = useForm();

  const { idEncargado } = useIdContext();

  useEffect(() => {
    if (idEncargado) {
      setValue('encargadoId', idEncargado);
    }
  }, [idEncargado, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const promise = postFormData(data, URLAPI);

      toast.promise(promise, {
        loading: 'Enviando permiso...',
        success: (res) => res.message || 'Permiso registrado con éxito',
        error: (err) =>
          err.response?.data?.message || err.message || 'Error al registrar'
      });

      await promise;
    } catch (error) {
      console.error('Error al registrar:', error);
      toast.error('Error inesperado al enviar el formulario');
    }
  });

  return (
    <>

      <div className="my-5">
        {/* <ProfessorSearch onProfessorSelected={handleProfessorSelected} /> */}
      </div>
      <form className='flex flex-col gap-2' onSubmit={onSubmit}>

        <label htmlFor='nombres' className='font-semibold'>Nombres</label>
        <input type="text" id='nombres' placeholder='Ingresa nombres...' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("nombres")} />

        <label htmlFor='apellidos' className='font-semibold'>Apellidos</label>
        <input type="text" id='apellidos' placeholder='Ingresa apellidos...' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("apellidos")} />

        <div className='flex gap-4'>
          <div className='flex flex-col flex-1 gap-2'>
            <label htmlFor='ocupacion' className='font-semibold'>Ocupación</label>
            <input type="text" id='ocupacion' placeholder='Ingresa ocupación...' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("ocupacion")} />
          </div>

          <div className='flex flex-col flex-1 gap-2'>
            <label htmlFor='grupo' className='font-semibold'>Grupo</label>
            <input type="text" id='grupo' placeholder='Ingresa grupo...' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("grupo")} />
          </div>
        </div>

        <label htmlFor='programa' className='font-semibold'>Programa</label>
        <input type="text" id='programa' placeholder='Ingresa programa...' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("programa")} />

        <label htmlFor='motivo' className='font-semibold'>Motivo</label>
        <input type="text" id='motivo' placeholder='Ingresa motivo...' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("motivo")} />

        <div className='flex gap-4'>
          <div className='flex flex-col flex-1 gap-2'>
            <label htmlFor='hora_salida' className='font-semibold'>Hora de salida</label>
            <input type="time" id='hora_salida' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("hora_salida")} />
          </div>

          <div className='flex flex-col flex-1 gap-2'>
            <label htmlFor='tiempo_permiso' className='font-semibold'>Tiempo de permiso</label>
            <input type="time" id='tiempo_permiso' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("tiempo_permiso")} />
          </div>
        </div>

        <label htmlFor='hora_retorno' className='font-semibold'>Hora de retorno</label>
        <input type="time" id='hora_retorno' className='border px-2 py-1 rounded bg-white border-gray-400' {...register("hora_retorno")} />

        <label htmlFor="encargadoId" className='font-semibold'>Encargado ID</label>
        <p className='border px-2 py-1 rounded bg-gray-100 border-gray-400'>
          {idEncargado || "Cargando..."}
        </p>

        <button
          type='submit'
          disabled={isSubmitting}
          className={`rounded px-3 py-2 w-40 mb-2 font-semibold shadow-lg mt-4 hover:bg-blue-700 active:bg-blue-800 ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white shadow-blue-400 hover:bg-blue-700'
            }`}
        >
          {isSubmitting ? 'Enviando...' : 'Registrar'}
        </button>
      </form>

      <Toaster />

    </>
  )
}
