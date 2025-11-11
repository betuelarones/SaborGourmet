// src/pages/PedidosPendientes.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/PedidosPendientes.css';

function PedidosPendientes() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingIds, setProcessingIds] = useState(new Set());

    // Cargar pedidos pendientes
    const fetchPedidosPendientes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/pedidos/pendientes');
            setPedidos(response.data);
        } catch (err) {
            setError('No se pudieron cargar los pedidos pendientes.');
            console.error('Error al cargar pedidos:', err);
        } finally {
            setLoading(false);
        }
    };

    // Cargar al inicio
    useEffect(() => {
        fetchPedidosPendientes();
        
        // Auto-refresh cada 30 segundos
        const interval = setInterval(() => {
            fetchPedidosPendientes();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    // Marcar pedido como servido
    const handleMarcarServido = async (idPedido) => {
        // Evitar clics múltiples
        if (processingIds.has(idPedido)) return;

        setProcessingIds(prev => new Set(prev).add(idPedido));

        try {
            await apiClient.put(`/pedidos/${idPedido}/estado`, "servido", {
                headers: { 'Content-Type': 'text/plain' }
            });

            // Recargar lista
            await fetchPedidosPendientes();

            // Mostrar feedback visual
            setTimeout(() => {
                setProcessingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(idPedido);
                    return newSet;
                });
            }, 500);

        } catch (err) {
            setError('Error al actualizar el estado del pedido.');
            console.error('Error al marcar servido:', err);
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(idPedido);
                return newSet;
            });
        }
    };

    // Obtener inicial del nombre del cliente
    const getClienteInicial = (cliente) => {
        if (!cliente) return '?';
        return cliente.nombres?.charAt(0).toUpperCase() || '?';
    };

    // Formatear hora del pedido (si existe)
    const formatearHora = (fecha) => {
        if (!fecha) return '';
        const date = new Date(fecha);
        return date.toLocaleTimeString('es-PE', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    // Estado de carga
    if (loading && pedidos.length === 0) {
        return (
            <div className="pedidos-container">
                <nav className="pedidos-nav">
                    <Link to="/dashboard" className="back-link">
                        <span className="back-icon">←</span>
                        Volver al Dashboard
                    </Link>
                </nav>
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Cargando pedidos pendientes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pedidos-container">
            {/* NAVEGACIÓN */}
            <nav className="pedidos-nav">
                <Link to="/dashboard" className="back-link">
                    <span className="back-icon">←</span>
                    Volver al Dashboard
                </Link>
            </nav>

            {/* HEADER */}
            <div className="pedidos-header">
                <div className="header-content">
                    <span className="header-icon">🍳</span>
                    <div className="header-text">
                        <h2>Pedidos Pendientes - Cocina</h2>
                        <p>Gestiona y marca los pedidos como servidos</p>
                    </div>
                </div>
            </div>

            {/* MENSAJE DE ERROR */}
            {error && (
                <div className="error-state">
                    <div className="error-icon">❌</div>
                    <p className="error-text">{error}</p>
                </div>
            )}

            {/* SIN PEDIDOS */}
            {!error && pedidos.length === 0 && !loading && (
                <div className="empty-state">
                    <div className="empty-icon">✅</div>
                    <p className="empty-text">
                        ¡Excelente! No hay pedidos pendientes
                    </p>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
                        Todos los pedidos han sido servidos
                    </p>
                </div>
            )}

            {/* CONTENIDO CON PEDIDOS */}
            {!error && pedidos.length > 0 && (
                <>
                    {/* RESUMEN */}
                    <div className="pedidos-summary">
                        <div className="summary-card">
                            <div className="summary-header">
                                <div className="summary-icon">📋</div>
                                <span className="summary-label">Total Pendientes</span>
                            </div>
                            <div className="summary-value">{pedidos.length}</div>
                        </div>

                        <div className="summary-card" style={{borderLeftColor: '#10b981'}}>
                            <div className="summary-header">
                                <div className="summary-icon" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                                    🍽️
                                </div>
                                <span className="summary-label">Mesas Activas</span>
                            </div>
                            <div className="summary-value">
                                {new Set(pedidos.map(p => p.mesa?.numero)).size}
                            </div>
                        </div>

                        <div className="summary-card" style={{borderLeftColor: '#3b82f6'}}>
                            <div className="summary-header">
                                <div className="summary-icon" style={{background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
                                    👥
                                </div>
                                <span className="summary-label">Clientes</span>
                            </div>
                            <div className="summary-value">
                                {pedidos.filter(p => p.cliente).length}
                            </div>
                        </div>
                    </div>

                    {/* CONTROLES */}
                    <div className="pedidos-controls">
                        <button 
                            className="refresh-button"
                            onClick={fetchPedidosPendientes}
                            disabled={loading}
                        >
                            <span className="refresh-icon">🔄</span>
                            Actualizar Lista
                        </button>
                    </div>

                    {/* GRID DE PEDIDOS */}
                    <div className="pedidos-grid">
                        {pedidos.map(pedido => (
                            <div key={pedido.idPedido} className="pedido-card">
                                {/* HEADER DEL PEDIDO */}
                                <div className="pedido-header">
                                    <div className="pedido-numero">
                                        <span className="pedido-numero-icon">📝</span>
                                        <span className="pedido-numero-text">
                                            Pedido #{pedido.idPedido}
                                        </span>
                                    </div>
                                    <div className="mesa-badge">
                                        <span>🍽️</span>
                                        Mesa {pedido.mesa?.numero || 'N/A'}
                                    </div>
                                </div>

                                {/* CUERPO DEL PEDIDO */}
                                <div className="pedido-body">
                                    {/* INFO DEL CLIENTE */}
                                    <div className="cliente-info">
                                        <div className="cliente-avatar">
                                            {getClienteInicial(pedido.cliente)}
                                        </div>
                                        <div className="cliente-details">
                                            <div className="cliente-label">Cliente</div>
                                            <div className="cliente-nombre">
                                                {pedido.cliente 
                                                    ? `${pedido.cliente.nombres} ${pedido.cliente.apellidos || ''}`
                                                    : 'Consumidor Final'
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* ESTADO */}
                                    <div className="pedido-estado">
                                        <span className="estado-icon">⏳</span>
                                        <span className="estado-text">{pedido.estado}</span>
                                    </div>

                                    {/* DETALLES ADICIONALES */}
                                    <div className="pedido-detalles">
                                        {pedido.fecha && (
                                            <div className="detalle-item">
                                                <span className="detalle-label">🕐 Hora</span>
                                                <span className="detalle-value">
                                                    {formatearHora(pedido.fecha)}
                                                </span>
                                            </div>
                                        )}
                                        {pedido.total && (
                                            <div className="detalle-item">
                                                <span className="detalle-label">💰 Total</span>
                                                <span className="detalle-value">
                                                    S/. {parseFloat(pedido.total).toFixed(2)}
                                                </span>
                                            </div>
                                        )}
                                        {pedido.detalles && pedido.detalles.length > 0 && (
                                            <div className="detalle-item">
                                                <span className="detalle-label">📦 Platos</span>
                                                <span className="detalle-value">
                                                    {pedido.detalles.length} items
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* LISTA DE PLATOS (si existe) */}
                                    {pedido.detalles && pedido.detalles.length > 0 && (
                                        <div style={{
                                            marginTop: '12px',
                                            padding: '12px',
                                            background: '#f9fafb',
                                            borderRadius: '8px',
                                            fontSize: '13px'
                                        }}>
                                            <strong style={{color: '#6b7280', display: 'block', marginBottom: '8px'}}>
                                                Platos:
                                            </strong>
                                            {pedido.detalles.map((detalle, index) => (
                                                <div key={index} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '4px 0',
                                                    color: '#111827'
                                                }}>
                                                    <span>• {detalle.plato?.nombre || 'Plato'}</span>
                                                    <span style={{fontWeight: 600}}>
                                                        x{detalle.cantidad}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* FOOTER - BOTÓN DE ACCIÓN */}
                                    <div className="pedido-footer">
                                        <button
                                            className="action-button"
                                            onClick={() => handleMarcarServido(pedido.idPedido)}
                                            disabled={processingIds.has(pedido.idPedido)}
                                        >
                                            {processingIds.has(pedido.idPedido) ? (
                                                <>
                                                    <span className="button-spinner"></span>
                                                    <span>Procesando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="button-icon">✓</span>
                                                    <span>Marcar como Servido</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default PedidosPendientes;