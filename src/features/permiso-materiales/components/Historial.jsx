import React from "react";
import {useNavigate} from "react-router-dom"
export const Historial = () => {
    const navigate = useNavigate();

    const handleHistorial = () => {
    navigate("/historialMateriales")
}
return (
    <>
        <button className='rounded bg-gray-800 text-white px-3 py-2 shadow shadow-gray-400 w-40 mb-2 font-semibold' onClick={handleHistorial}>VER HISTORIAL</button>
    </>
  )
}