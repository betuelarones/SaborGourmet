// src/pages/AlertasStock.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/AlertasStock.css';

function AlertasStock() {
    const [insumosBajos, setInsumosBajos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlertas = async () => {
            try {
                const response = await apiClient.get('/insumos/stock-bajo');
                setInsumosBajos(response.data);
            } catch (err) {
                setError('No se pudieron cargar las alertas de stock.');
                console.error('Error al cargar alertas:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAlertas();
    }, []);

    // Calcular porcentaje de stock
    const calcularPorcentaje = (actual, minimo) => {
        if (minimo === 0) return 0;
        return Math.min((actual / minimo) * 100, 100);
    };

    // Determinar si el stock es crítico (menos del 50% del mínimo)
    const esCritico = (actual, minimo) => {
        return actual < (minimo * 0.5);
    };

    // Estado de carga
    if (loading) {
        return (
            <div className="alertas-container">
                <nav className="alertas-nav">
                    <Link to="/dashboard" className="back-link">
                        <span className="back-icon">←</span>
                        Volver al Dashboard
                    </Link>
                </nav>
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Cargando alertas de stock...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="alertas-container">
            {/* NAVEGACIÓN */}
            <nav className="alertas-nav">
                <Link to="/dashboard" className="back-link">
                    <span className="back-icon">←</span>
                    Volver al Dashboard
                </Link>
            </nav>

            {/* HEADER */}
            <div className="alertas-header">
                <div className="header-content">
                    <span className="header-icon">⚠️</span>
                    <div className="header-text">
                        <h2>Alertas de Stock Bajo</h2>
                        <p>Insumos que requieren atención inmediata</p>
                    </div>
                </div>
            </div>

            {/* ERROR STATE */}
            {error && (
                <div className="error-state">
                    <div className="error-icon">❌</div>
                    <p className="error-text">{error}</p>
                </div>
            )}

            {/* EMPTY STATE - Sin alertas */}
            {!error && insumosBajos.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">✅</div>
                    <p className="empty-text">
                        ¡Excelente! No hay insumos con stock bajo
                    </p>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
                        Todos los insumos están por encima del nivel mínimo
                    </p>
                </div>
            )}

            {/* CONTENIDO CON ALERTAS */}
            {!error && insumosBajos.length > 0 && (
                <>
                    {/* RESUMEN */}
                    <div className="alertas-summary">
                        <div className="summary-content">
                            <div className="summary-item">
                                <div className="summary-icon">📦</div>
                                <div className="summary-info">
                                    <h3>Insumos en Alerta</h3>
                                    <p>{insumosBajos.length}</p>
                                </div>
                            </div>
                            <div className="summary-item">
                                <div className="summary-icon" style={{background: 'linear-gradient(135deg, #dc2626, #991b1b)'}}>
                                    🚨
                                </div>
                                <div className="summary-info">
                                    <h3>Críticos (Stock &lt; 50%)</h3>
                                    <p>
                                        {insumosBajos.filter(i => esCritico(i.stock, i.stockMinimo)).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TABLA DE ALERTAS */}
                    <div className="alertas-table-container">
                        <table className="alertas-table">
                            <thead>
                                <tr>
                                    <th>Insumo</th>
                                    <th>Stock Actual</th>
                                    <th>Stock Mínimo</th>
                                    <th>Unidad</th>
                                    <th>Nivel de Stock</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {insumosBajos.map((insumo, index) => {
                                    const porcentaje = calcularPorcentaje(insumo.stock, insumo.stockMinimo);
                                    const critico = esCritico(insumo.stock, insumo.stockMinimo);
                                    
                                    return (
                                        <tr key={insumo.idInsumo}>
                                            <td>
                                                <strong>{insumo.nombre}</strong>
                                            </td>
                                            <td>
                                                <span className={`stock-badge ${critico ? 'critical' : ''}`}>
                                                    <span className="stock-icon">📊</span>
                                                    {insumo.stock}
                                                </span>
                                            </td>
                                            <td>{insumo.stockMinimo}</td>
                                            <td>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    background: '#f3f4f6',
                                                    borderRadius: '6px',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    color: '#6b7280'
                                                }}>
                                                    {insumo.unidadMedida}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="stock-level">
                                                    <div className="stock-bar">
                                                        <div 
                                                            className="stock-fill" 
                                                            style={{ width: `${porcentaje}%` }}
                                                        ></div>
                                                    </div>
                                                    <span style={{
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        color: critico ? '#dc2626' : '#f59e0b',
                                                        minWidth: '45px'
                                                    }}>
                                                        {porcentaje.toFixed(0)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                {critico ? (
                                                    <span style={{
                                                        padding: '6px 12px',
                                                        background: '#dc2626',
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        fontSize: '12px',
                                                        fontWeight: '700',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        🚨 Crítico
                                                    </span>
                                                ) : (
                                                    <span style={{
                                                        padding: '6px 12px',
                                                        background: '#f59e0b',
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        fontSize: '12px',
                                                        fontWeight: '700',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        ⚠️ Bajo
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* ACCIONES */}
                    <div className="alertas-actions">
                        <Link to="/registrar-compra" className="action-button primary">
                            <span>➕</span>
                            Registrar Compra de Insumos
                        </Link>
                        <Link to="/gestion-insumos" className="action-button secondary">
                            <span>📦</span>
                            Ver Todos los Insumos
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default AlertasStock;