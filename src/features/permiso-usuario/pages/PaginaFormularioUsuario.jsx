import React from 'react'
import {MostrarFormularioPermiso, BotonHistorial} from '../components'


export const PaginaFormularioUsuario = () => {
  return (
    <>

      <div className='flex flex-col items-center justify-center'>

        <div className='w-200 bg-white rounded-2xl shadow p-5 mt-2'>
          <h1 className='text-4xl text-center my-6 font-semibold'>Formulario Permiso Docentes</h1>

          <BotonHistorial/>
          <MostrarFormularioPermiso/>
        </div>
      </div>
        
    </>
  )
}
