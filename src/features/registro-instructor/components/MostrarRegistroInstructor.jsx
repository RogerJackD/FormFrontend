import { useForm } from 'react-hook-form';
import { postFormData } from "../../../shared/services";
import { Toaster, toast } from 'sonner';
import { useEffect } from "react";
import { useIdContext } from "../../../context/IdContext"; // Importar el contexto

export const MostrarRegistroInstructor = () => {
  const URLAPI = "https://formbackend-ndvy.onrender.com/api/instructores";

  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting, errors },
    setValue,
    watch,
    trigger
  } = useForm();

  const { idEncargado } = useIdContext(); // Obtener el ID del encargado desde el contexto

  // Establecer el encargadoId automáticamente al cargar
  useEffect(() => {
    if (idEncargado) {
      setValue("encargadoId", idEncargado);
    }
  }, [idEncargado, setValue]);

  useEffect(() => {
    console.log("Valores actuales del formulario:", watch());
  }, [watch()]);

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) {
      Object.entries(errors).forEach(([fieldName, error]) => {
        toast.error(`${fieldName}: ${error.message}`);
      });
      return;
    }

    console.log("Datos enviados al backend:", data);

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
          return error.message || 'Error al enviar el formulario';
        }
      });

      await promise;
    } catch (error) {
      console.error("Error en el catch:", error);
      toast.error(`Error inesperado: ${error.message}`);
    }
  };

  return (
    <>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor='nombre' className='font-semibold'>Nombre:</label>
        <input 
          type="text" 
          id='nombre' 
          placeholder='Ingresa tu nombre...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("nombre", { required: "Este campo es requerido" })} 
        />
        {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}

        <label htmlFor='apellidos' className='font-semibold'>Apellidos:</label>
        <input 
          type="text" 
          id='apellidos' 
          placeholder='Ingresa tu apellido...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("apellidos", { required: "Este campo es requerido" })} 
        />
        {errors.apellidos && <span className="text-red-500 text-sm">{errors.apellidos.message}</span>}

        <label htmlFor='idSenati' className='font-semibold'>ID Senati:</label>
        <input 
          type="number" 
          id='idSenati' 
          placeholder='Ingresa tu ID de Senati...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("idSenati", { required: "Este campo es requerido" })} 
        />
        {errors.idSenati && <span className="text-red-500 text-sm">{errors.idSenati.message}</span>}

        <label htmlFor='curso' className='font-semibold'>Curso:</label>
        <input 
          type="text" 
          id='curso' 
          placeholder='Ingresa el curso que enseñas...' 
          className='border px-2 py-1 rounded bg-white border-gray-400' 
          {...register("curso", { required: "Este campo es requerido" })} 
        />
        {errors.curso && <span className="text-red-500 text-sm">{errors.curso.message}</span>}

        <label htmlFor='encargadoId' className='font-semibold'>Encargado ID:</label>
        <input 
          type="number" 
          id='encargadoId' 
          readOnly
          className='border px-2 py-1 rounded bg-gray-100 border-gray-400' 
          {...register("encargadoId", { required: "Este campo es requerido" })} 
        />
        {errors.encargadoId && <span className="text-red-500 text-sm">{errors.encargadoId.message}</span>}

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
      </form>
      <Toaster />
    </>
  );
};