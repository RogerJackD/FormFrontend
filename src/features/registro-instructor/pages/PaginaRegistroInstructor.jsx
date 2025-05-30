import React from 'react'
import {MostrarRegistroInstructor, HistorialDocentes} from '../components'


export const PaginaRegistroInstructor = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
        <div className='w-200 bg-white rounded-2xl shadow p-5 mt-2'>
          <div className='text-3xl text-center my-6 font-bold'>Pagina registro Instructor</div>
            <HistorialDocentes/>
            <MostrarRegistroInstructor/>

        </div>

    </div>

          

    </>
  )
}