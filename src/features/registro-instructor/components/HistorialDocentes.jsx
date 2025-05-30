import React from 'react'
import { useNavigate} from 'react-router-dom'
export const HistorialDocentes = () => {
  const navigate = useNavigate();

  const handleHistorial = () => {
    navigate("/historialInstructores")
  } 

  return (
    <>
        <button className='rounded bg-gray-800 text-white px-3 py-2 shadow-md shadow-gray-400 w-40 mb-2 font-semibold hover:bg-gray-900' onClick={handleHistorial}>Ver registros</button>
    </>
  )
}
