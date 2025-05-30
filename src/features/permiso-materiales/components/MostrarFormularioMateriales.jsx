import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postFormData } from "../../../shared/services";
import { Toaster, toast } from "sonner";
import { useIdContext } from "../../../context/IdContext";
import { Historial } from "../components/Historial"
export const MostrarFormularioMateriales = () => {
  const URLAPI = "https://formbackend-ndvy.onrender.com/api/permisos-materiales";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) {
      Object.entries(errors).forEach(([fieldName, error]) => {
        toast.error(`${fieldName}: ${error.message}`);
      });
      return;
    }

    try {
      const promise = await postFormData(data, URLAPI);
      toast.promise(promise, {
        loading: "Enviando formulario...",
        success: (response) => response.message || "Formulario enviado exitosamente",
        error: (error) =>
          error.response?.data?.message ||
          error.message ||
          "Error al enviar el formulario",
      });
      await promise;
    } catch (error) {
      console.error("Error en el catch:", error);
      toast.error(`Error inesperado: ${error.message}`);
    }
  };

  const { idEncargado } = useIdContext();

  useEffect(() => {
    if (idEncargado) {
      setValue("encargadoId", idEncargado);
    }
  }, [idEncargado, setValue]);

  return (
    <>
      <form
        className="max-w-2xl w-full mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-md rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold mb-4 text-center text-3xl">Autorización de Materiales</h1>

      <Historial/>

        <div className="flex flex-col space-y-4">
          {/* Seleccionar acción (entrada/salida) */}
          <div>
            <label htmlFor="accion" className="font-semibold block mb-1">
              Acción
            </label>
            <select
              id="accion"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              {...register("accion", { required: "Este campo es requerido" })}
            >
              <option value="">Seleccione una opción</option>
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
            {errors.accion && (
              <span className="text-red-500 text-sm">{errors.accion.message}</span>
            )}
          </div>

          {/* Detalle de la acción */}
          <div>
            <label htmlFor="detalle_accion" className="font-semibold block mb-1">
              Detalle del material
            </label>
            <input
              type="text"
              id="detalle_accion"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Ej: laptop, herramientas, etc."
              {...register("detalle_accion", { required: "Este campo es requerido" })}
            />
            {errors.detalle_accion && (
              <span className="text-red-500 text-sm">{errors.detalle_accion.message}</span>
            )}
          </div>

          {/* ID SENATI */}
          <div>
            <label htmlFor="id_senati" className="font-semibold block mb-1">
              ID SENATI
            </label>
            <input
              type="text"
              id="id_senati"
              placeholder="Ingrese el ID SENATI"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              {...register("id_senati")}
            />
            
          </div>

          {/* Nombre del aprendiz */}
          <div>
            <label htmlFor="nombre_aprendiz" className="font-semibold block mb-1">
              Nombre del Aprendiz
            </label>
            <input
              type="text"
              id="nombre_aprendiz"
              placeholder="Ingrese nombre del aprendiz"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              {...register("nombre_aprendiz", )}
            />
            
          </div>

          {/* Nombre del señor (opcional) */}
          <div>
            <label htmlFor="nombre_señor" className="font-semibold block mb-1">
              Nombre del Señor 
            </label>
            <input
              type="text"
              id="nombre_señor"
              placeholder="Ingrese nombre del señor si aplica"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              {...register("nombre_señor")}
            />
          </div>

          {/* Campo oculto encargado */}
          <input type="hidden" {...register("encargadoId")} />
          <div>
            <label htmlFor="encargadoId" className="font-semibold block mb-1">
              Encargado ID
            </label>
            <p className="border px-3 py-2 rounded bg-gray-100 border-gray-300 text-sm">
              {idEncargado || "Cargando..."}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold shadow-md w-full sm:w-auto"
            >
              {isSubmitting ? "Enviando..." : "Registrar"}
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
};
