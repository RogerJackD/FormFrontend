import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Navbar } from '../shared';
import { PaginaFormularioAprendices, PaginaHistorialAprendices } from '../features/permiso-aprendices';
import { PaginaFormularioUsuario, PaginaHistorialDocente } from '../features/permiso-usuario';
import { PaginaFormularioMateriales, PaginaHistorialMateriales } from '../features/permiso-materiales';
import { PaginaRegistroInstructor, PaginaHistorialDocentes } from '../features/registro-instructor';
import LoginPage from '../features/inicio-sesion/pages/LoginPage';

import { EditPermisoForm } from "../features/permiso-usuario";
import { EditMaterialForm } from "../features/permiso-materiales";
export const AppRouter = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/iniciosesion';

  return (
    <>
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/iniciosesion" element={<LoginPage />} />
        <Route path="/formularioaprendices" element={<PaginaFormularioAprendices />} />
        <Route path="/formulariomateriales" element={<PaginaFormularioMateriales />} />
        <Route path="/*" element={<PaginaFormularioUsuario />} />
        <Route path="/historialpermisosinstructor" element={<PaginaHistorialDocente />} />
        <Route path="/registroinstructor" element={<PaginaRegistroInstructor />} />
        <Route path="/historialMateriales" element={<PaginaHistorialMateriales />} />
        <Route path="/historialAprendices" element={<PaginaHistorialAprendices />} />
        <Route path="/editar-permiso/:id" element={<EditPermisoForm  />} />
        <Route path="/historialinstructores" element={<PaginaHistorialDocentes  />} />
        <Route path="/editar-material/:id" element={<EditMaterialForm/>} />
      </Routes>
    </>
  );
};
