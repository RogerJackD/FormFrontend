import React from 'react'
import { MostrarFormularioAprendices, HistorialA } from '../components'


export const PaginaFormularioAprendices = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center'>

        <div className='w-200 bg-white rounded-2xl shadow p-5 mt-2'>
        <h1 className='text-4xl text-center my-6 font-semibold'>PaginaFormularioAprendices</h1>

          <HistorialA />
          <MostrarFormularioAprendices />

        </div>
      </div>

    </>
  )
}