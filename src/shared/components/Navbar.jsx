import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const cerrarSesion = () => {
    localStorage.removeItem("encargado");
    navigate("/iniciosesion");
  };
  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-gray-900 text-white w-full drop-shadow-xl'>
        <div>
            <button className='bg-sky-900 px-4 py-2 rounded-2xl font-semibold'>
                <Link to="/formularioaprendices">Aprendices</Link>
            </button>
        </div>

        <div>
            <button className='bg-green-900 px-4 py-2 rounded-2xl  font-semibold'>
                <Link to="/formulariomateriales">Materiales</Link>
            </button>
        </div>

        <div>
            <button className='text-gray-white px-4 py-2 rounded-2xl font-black shadow' style={{ background: '#598392' }}>
                <Link to="/usuarios">Instructor</Link>
            </button>
        </div>

        <div>
            <button className='bg-blue-900 rounded-2xl px-4 py-2 font-black shadow'>
                <Link to="/registroinstructor">Registro Instructor</Link>
            </button>
        </div>
        <div>
            <button onClick={cerrarSesion} className='bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-3xl font-black shadow'>
                Cerrar Sesión
            </button>
        </div>
    </nav>
  )
}