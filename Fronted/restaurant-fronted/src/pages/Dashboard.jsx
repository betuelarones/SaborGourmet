// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const { role, isLoading } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Estado de carga
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Cargando Dashboard...</p>
            </div>
        );
    }

    // Obtener inicial del rol para avatar
    const getRoleInitial = () => {
        if (!role) return '?';
        return role.charAt(0).toUpperCase();
    };

    return (
        <div className="dashboard-container">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        🍽️ Mi Restaurante
                    </div>
                    <div className="sidebar-role">
                        Rol: <strong>{role || 'Invitado'}</strong>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {/* MÓDULO DE OPERACIONES */}
                    {(role === 'admin' || role === 'mozo' || role === 'cocinero' || role === 'cajero') && (
                        <div className="nav-section">
                            <div className="nav-section-title">
                                ⚡ OPERACIONES
                            </div>
                            <ul className="nav-list">
                                {(role === 'admin' || role === 'mozo') && (
                                    <li className="nav-item">
                                        <Link to="/mesas" className="nav-link">
                                            <span className="nav-icon">🍽️</span>
                                            <span>Ver Mesas</span>
                                        </Link>
                                    </li>
                                )}
                                
                                {(role === 'admin' || role === 'cocinero' || role === 'mozo') && (
                                    <li className="nav-item">
                                        <Link to="/pedidos-pendientes" className="nav-link">
                                            <span className="nav-icon">📝</span>
                                            <span>Pedidos Pendientes</span>
                                        </Link>
                                    </li>
                                )}
                                
                                {(role === 'admin' || role === 'cajero') && (
                                    <li className="nav-item">
                                        <Link to="/pedidos-por-pagar" className="nav-link">
                                            <span className="nav-icon">💲</span>
                                            <span>Cuentas por Pagar</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* MÓDULO DE GESTIÓN (Solo Admin) */}
                    {role === 'admin' && (
                        <div className="nav-section">
                            <div className="nav-section-title">
                                ⚙️ GESTIÓN
                            </div>
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <Link to="/gestion-platos" className="nav-link">
                                        <span className="nav-icon">🍳</span>
                                        <span>Platos y Menú</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/gestion-mesas" className="nav-link">
                                        <span className="nav-icon">🪑</span>
                                        <span>Mesas</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/gestion-clientes" className="nav-link">
                                        <span className="nav-icon">🧑</span>
                                        <span>Clientes</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/gestion-proveedores" className="nav-link">
                                        <span className="nav-icon">🚚</span>
                                        <span>Proveedores</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* MÓDULO DE INVENTARIO (Solo Admin) */}
                    {role === 'admin' && (
                        <div className="nav-section">
                            <div className="nav-section-title">
                                📦 INVENTARIO
                            </div>
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <Link to="/gestion-insumos" className="nav-link">
                                        <span className="nav-icon">📦</span>
                                        <span>Insumos</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registrar-compra" className="nav-link">
                                        <span className="nav-icon">➕</span>
                                        <span>Registrar Compra</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/alertas-stock" className="nav-link">
                                        <span className="nav-icon">⚠️</span>
                                        <span>Alertas de Stock</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* MÓDULO DE REPORTES */}
                    {(role === 'admin' || role === 'cajero') && (
                        <div className="nav-section">
                            <div className="nav-section-title">
                                📈 REPORTES
                            </div>
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <Link to="/reporte-ventas" className="nav-link">
                                        <span className="nav-icon">📊</span>
                                        <span>Reporte de Ventas</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Gestión de Platos para Cocinero */}
                    {role === 'cocinero' && (
                        <div className="nav-section">
                            <div className="nav-section-title">
                                🍳 COCINA
                            </div>
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <Link to="/gestion-platos" className="nav-link">
                                        <span className="nav-icon">🍽️</span>
                                        <span>Gestión de Platos</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="main-content">
                {/* HEADER */}
                <header className="dashboard-header">
                    <div className="header-title">
                        <h2>Dashboard Principal</h2>
                        <span className="header-subtitle">
                            Bienvenido a tu panel de control
                        </span>
                    </div>
                    <div className="header-actions">
                        <div className="user-info">
                            <div className="user-avatar">{getRoleInitial()}</div>
                            <div className="user-details">
                                <span className="user-name">Usuario</span>
                                <span className="user-role">{role || 'Invitado'}</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            🚪 Cerrar Sesión
                        </button>
                    </div>
                </header>

                {/* CONTENIDO */}
                <div className="dashboard-content">
                    {/* SECCIÓN: OPERACIONES */}
                    {(role === 'admin' || role === 'mozo' || role === 'cocinero' || role === 'cajero') && (
                        <section className="content-section">
                            <div className="section-header">
                                <span className="section-icon">⚡</span>
                                <h3 className="section-title">Operaciones Diarias</h3>
                            </div>
                            <div className="cards-grid">
                                {(role === 'admin' || role === 'mozo') && (
                                    <Link to="/mesas" className="dashboard-card">
                                        <div className="card-header">
                                            <div className="card-icon">🍽️</div>
                                            <div className="card-content">
                                                <h3>Mesas Disponibles</h3>
                                                <p className="card-description">
                                                    Ver estado de mesas y tomar pedidos
                                                </p>
                                            </div>
                                        </div>
                                        <span className="card-badge">Mozo</span>
                                    </Link>
                                )}

                                {(role === 'admin' || role === 'cocinero' || role === 'mozo') && (
                                    <Link to="/pedidos-pendientes" className="dashboard-card">
                                        <div className="card-header">
                                            <div className="card-icon success">📝</div>
                                            <div className="card-content">
                                                <h3>Pedidos Pendientes</h3>
                                                <p className="card-description">
                                                    Gestionar pedidos en proceso
                                                </p>
                                            </div>
                                        </div>
                                        <span className="card-badge">Cocina/Mozo</span>
                                    </Link>
                                )}

                                {(role === 'admin' || role === 'cajero') && (
                                    <Link to="/pedidos-por-pagar" className="dashboard-card">
                                        <div className="card-header">
                                            <div className="card-icon info">💲</div>
                                            <div className="card-content">
                                                <h3>Cuentas por Pagar</h3>
                                                <p className="card-description">
                                                    Procesar pagos y cerrar cuentas
                                                </p>
                                            </div>
                                        </div>
                                        <span className="card-badge">Cajero</span>
                                    </Link>
                                )}
                            </div>
                        </section>
                    )}

                    {/* SECCIÓN: GESTIÓN (Solo Admin y Cocinero para platos) */}
                    {(role === 'admin' || role === 'cocinero') && (
                        <section className="content-section">
                            <div className="section-header">
                                <span className="section-icon">⚙️</span>
                                <h3 className="section-title">Gestión y Administración</h3>
                            </div>
                            <div className="cards-grid">
                                <Link to="/gestion-platos" className="dashboard-card">
                                    <div className="card-header">
                                        <div className="card-icon">🍳</div>
                                        <div className="card-content">
                                            <h3>Platos y Menú</h3>
                                            <p className="card-description">
                                                Administrar carta y platos disponibles
                                            </p>
                                        </div>
                                    </div>
                                    <span className="card-badge">{role === 'cocinero' ? 'Cocina' : 'Admin'}</span>
                                </Link>

                                {role === 'admin' && (
                                    <>
                                        <Link to="/gestion-mesas" className="dashboard-card">
                                            <div className="card-header">
                                                <div className="card-icon success">🪑</div>
                                                <div className="card-content">
                                                    <h3>Gestión de Mesas</h3>
                                                    <p className="card-description">
                                                        Configurar y organizar mesas del restaurante
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="card-badge">Admin</span>
                                        </Link>

                                        <Link to="/gestion-clientes" className="dashboard-card">
                                            <div className="card-header">
                                                <div className="card-icon info">🧑</div>
                                                <div className="card-content">
                                                    <h3>Gestión de Clientes</h3>
                                                    <p className="card-description">
                                                        Administrar base de datos de clientes
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="card-badge">Admin</span>
                                        </Link>

                                        <Link to="/gestion-proveedores" className="dashboard-card">
                                            <div className="card-header">
                                                <div className="card-icon warning">🚚</div>
                                                <div className="card-content">
                                                    <h3>Proveedores</h3>
                                                    <p className="card-description">
                                                        Gestionar proveedores e insumos
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="card-badge">Admin</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </section>
                    )}

                    {/* SECCIÓN: INVENTARIO (Solo Admin) */}
                    {role === 'admin' && (
                        <section className="content-section">
                            <div className="section-header">
                                <span className="section-icon">📦</span>
                                <h3 className="section-title">Control de Inventario</h3>
                            </div>
                            <div className="cards-grid">
                                <Link to="/gestion-insumos" className="dashboard-card">
                                    <div className="card-header">
                                        <div className="card-icon">📦</div>
                                        <div className="card-content">
                                            <h3>Insumos</h3>
                                            <p className="card-description">
                                                Ver y gestionar inventario de insumos
                                            </p>
                                        </div>
                                    </div>
                                    <span className="card-badge">Admin</span>
                                </Link>

                                <Link to="/registrar-compra" className="dashboard-card">
                                    <div className="card-header">
                                        <div className="card-icon success">➕</div>
                                        <div className="card-content">
                                            <h3>Registrar Compra</h3>
                                            <p className="card-description">
                                                Añadir nuevas compras al inventario
                                            </p>
                                        </div>
                                    </div>
                                    <span className="card-badge">Admin</span>
                                </Link>

                                <Link to="/alertas-stock" className="dashboard-card">
                                    <div className="card-header">
                                        <div className="card-icon warning">⚠️</div>
                                        <div className="card-content">
                                            <h3>Alertas de Stock</h3>
                                            <p className="card-description">
                                                Productos con stock bajo o crítico
                                            </p>
                                        </div>
                                    </div>
                                    <span className="card-badge">Admin</span>
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* SECCIÓN: REPORTES */}
                    {(role === 'admin' || role === 'cajero') && (
                        <section className="content-section">
                            <div className="section-header">
                                <span className="section-icon">📈</span>
                                <h3 className="section-title">Reportes y Análisis</h3>
                            </div>
                            <div className="cards-grid">
                                <Link to="/reporte-ventas" className="dashboard-card">
                                    <div className="card-header">
                                        <div className="card-icon info">📊</div>
                                        <div className="card-content">
                                            <h3>Reporte de Ventas</h3>
                                            <p className="card-description">
                                                Estadísticas y análisis de ventas
                                            </p>
                                        </div>
                                    </div>
                                    <span className="card-badge">Admin/Cajero</span>
                                </Link>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;