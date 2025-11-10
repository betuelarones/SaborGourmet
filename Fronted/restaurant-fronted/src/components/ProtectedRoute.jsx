// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Este componente es nuestro "Guardián"
const ProtectedRoute = () => {

  // 1. Revisa si el token existe en el localStorage
  const token = localStorage.getItem('token');

  // 2. Si hay token, muestra la página que está intentando visitar
  // (El "Outlet" es la página real, como /dashboard)
  if (token) {
    return <Outlet />;
  }

  // 3. Si NO hay token, lo patea de regreso al Login
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;