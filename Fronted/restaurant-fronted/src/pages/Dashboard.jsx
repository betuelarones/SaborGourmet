// src/pages/Dashboard.jsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

function Dashboard() {
    const navigate = useNavigate();
    const { role, isLoading } = useAuth(); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (isLoading) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Cargando Dashboard...</h2>
                <p>Verificando su sesión y permisos.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard Principal</h2>
            <p>¡Bienvenido! (Rol: <strong>{role || 'No Logueado'}</strong>)</p> 
            
            <nav>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>

                    {/* --- 1. MÓDULO DE OPERACIONES --- */}
                    
                    {/* (Mozo) Ver Mesas Disponibles. Necesario para tomar pedidos. */}
                    {(role === 'admin' || role === 'mozo') && (
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/mesas">
                                🍽️ (Mozo) Ver Mesas Disponibles
                            </Link>
                        </li>
                    )}

                    {/* (Cocina/Mozo) Ver Pedidos Pendientes. Corresponde a /pedidos/** */}
                    {(role === 'admin' || role === 'cocinero' || role === 'mozo') && ( 
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/pedidos-pendientes">
                                📝 (Pedidos) Ver Pedidos Pendientes
                            </Link>
                        </li>
                    )}

                    {/* (Cajero) Ver Cuentas por Pagar. Corresponde a /ventas/** */}
                    {(role === 'admin' || role === 'cajero') && (
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/pedidos-por-pagar">
                                💲 (Cajero) Ver Cuentas por Pagar
                            </Link>
                        </li>
                    )}
                    
                    {/* --- 2. MÓDULO DE GESTIÓN  --- */}
                    
                    {role === 'admin' && ( // Solo el Admin ve el módulo completo de gestión.
                        <li style={{ marginTop: '10px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                            <strong>⚙️ MÓDULO DE ADMINISTRACIÓN</strong>
                        </li>
                    )}
                    
                    {/* --- GESTIÓN DE PLATOS Y MENÚ:** --- */}
                    {(role === 'admin' || role === 'cocinero') && (
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/gestion-platos">
                                🍳 (Admin/Cocina) Gestión de Platos/Menú
                            </Link>
                        </li>
                    )}

                    {role === 'admin' && (
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/gestion-mesas">
                                🪑 (Admin) Gestión de Mesas
                            </Link>
                        </li>
                    )}
                    
                    {role === 'admin' && (
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/gestion-clientes">
                                🧑 (Admin) Gestión de Clientes
                            </Link>
                        </li>
                    )}
                    
                    {role === 'admin' && (
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/gestion-proveedores">
                                🚚 (Admin) Gestión de Proveedores
                            </Link>
                        </li>
                    )}

                    {/* --- INVENTARIO: /inventario/** --- */}
                    {role === 'admin' && ( 
                        <li style={{ marginTop: '10px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                            <Link to="/gestion-insumos">
                                📦 (Admin) Gestión de Inventario (Insumos)
                            </Link>
                        </li>
                    )}
                    
                    {role === 'admin' && ( // Inventario +
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/registrar-compra">
                                ➕ (Admin) Registrar Compra (Inventario +)
                            </Link>
                        </li>
                    )}
                    
                    {role === 'admin' && ( // Alertas de Stock
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/alertas-stock">
                                ⚠️ (Admin) Alertas de Stock Bajo
                            </Link>
                        </li>
                    )}

                    {/* --- REPORTES: /ventas/** --- */}
                    {(role === 'admin' || role === 'cajero') && (
                        <li style={{ marginTop: '10px' }}>
                            <Link to="/reporte-ventas">
                                📈 (Admin/Cajero) Reporte de Ventas
                            </Link>
                        </li>
                    )}

                </ul>
            </nav>

            <button onClick={handleLogout} style={{ marginTop: '20px' }}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default Dashboard;