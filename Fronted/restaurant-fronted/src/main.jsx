// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa las páginas y el guardián
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Mesas from './pages/Mesas';
import CrearPedido from './pages/CrearPedido';
import PedidosPendientes from './pages/PedidosPendientes';
import PedidosParaPagar from './pages/PedidosParaPagar';
import GestionPlatos from './pages/GestionPlatos';
import CrearPlato from './pages/CrearPlato';
import EditarPlato from './pages/EditarPlato';
{/* Gestión de Mesas */ }
import GestionMesas from './pages/GestionMesas';
import CrearMesa from './pages/CrearMesa';
import EditarMesa from './pages/EditarMesa';

import GestionClientes from './pages/GestionClientes';
import CrearCliente from './pages/CrearCliente';
import EditarCliente from './pages/EditarCliente';

import GestionProveedores from './pages/GestionProveedores';
import CrearProveedor from './pages/CrearProveedor';
import EditarProveedor from './pages/EditarProveedor';


import GestionInsumos from './pages/GestionInsumos';
import CrearInsumo from './pages/CrearInsumo';
import EditarInsumo from './pages/EditarInsumo';
import AlertasStock from './pages/AlertasStock';
import ReporteVentas from './pages/ReporteVentas';

import RegistrarCompra from './pages/RegistrarCompra';

import GestionUsuarios from './pages/GestionUsuarios';
// Define las rutas

const router = createBrowserRouter([
  {
    path: "/", // Ruta raíz (Login)
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/mesas",
        element: <Mesas />,
      },
      {
        path: "/crear-pedido/:idMesa",
        element: <CrearPedido />,
      },
      {
        path: "/pedidos-pendientes",
        element: <PedidosPendientes />,
      },
      {
        path: "/pedidos-por-pagar",
        element: <PedidosParaPagar />,
      },
      {
        path: "/gestion-platos",
        element: <GestionPlatos />,
      },
      {
        path: "/crear-plato",
        element: <CrearPlato />,
      },
      { path: "/editar-plato/:idPlato",
        element: <EditarPlato />,
      },
      { path: "/gestion-mesas", element: <GestionMesas /> },
      { path: "/crear-mesa", element: <CrearMesa /> },
      { path: "/editar-mesa/:idMesa", element: <EditarMesa /> },


      { path: "/gestion-clientes", element: <GestionClientes /> },
      { path: "/crear-cliente", element: <CrearCliente /> },
      { path: "/editar-cliente/:idCliente", element: <EditarCliente /> },


      { path: "/gestion-proveedores", element: <GestionProveedores /> },
      { path: "/crear-proveedor", element: <CrearProveedor /> },
      { path: "/editar-proveedor/:idProveedor", element: <EditarProveedor /> },

      { path: "/gestion-insumos", element: <GestionInsumos /> },
      { path: "/crear-insumo", element: <CrearInsumo /> },
      { path: "/editar-insumo/:idInsumo", element: <EditarInsumo /> },
      { path: "/alertas-stock", element: <AlertasStock /> },
      { path: "/reporte-ventas", element: <ReporteVentas /> },

      { path: "/registrar-compra", element: <RegistrarCompra /> },
      
      { path: "/gestion-usuarios", element: <GestionUsuarios /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);