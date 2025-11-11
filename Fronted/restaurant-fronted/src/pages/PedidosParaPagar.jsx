// src/pages/PedidosParaPagar.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import apiClient from '../services/apiService';
import '../css/PedidosParaPagar.css';

function PedidosParaPagar() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    const fetchPedidosServidos = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/pedidos/servidos');
            setPedidos(response.data);
        } catch (err) {
            setError('No se pudieron cargar los pedidos por pagar.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidosServidos();
    }, []);

    const handlePagarPedido = async (idPedido) => {
        const confirmacion = window.confirm(
            '¿Deseas registrar el pago y facturar este pedido?'
        );
        if (!confirmacion) return;

        const metodoPago = window.prompt('Ingrese método de pago (efectivo/tarjeta):', 'efectivo');
        if (!metodoPago) return;

        setProcessingId(idPedido);
        try {
            await apiClient.post(`/pedidos/${idPedido}/pagar`, { metodoPago });
            alert('✅ Pedido pagado correctamente. La mesa ha sido liberada.');
            fetchPedidosServidos();
        } catch (err) {
            console.error(err);
            setError('❌ Ocurrió un error al registrar el pago.');
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="pedidos-container">
            <div className="pedidos-header">
                <Link to="/dashboard" className="back-link">
                    ← Volver al Dashboard
                </Link>
                <h2 className="pedidos-title">💰 Cuentas por Pagar</h2>
            </div>

            {loading && <p className="loading-msg">Cargando cuentas...</p>}
            {error && <p className="error-msg">{error}</p>}

            {!loading && pedidos.length === 0 && (
                <p className="empty-msg">No hay cuentas pendientes de pago.</p>
            )}

            <div className="pedidos-list">
                {pedidos.map((pedido) => (
                    <div key={pedido.idPedido} className="pedido-card">
                        <h3>Pedido #{pedido.idPedido}</h3>
                        <p><strong>Mesa:</strong> {pedido.mesa.numero}</p>
                        <p><strong>Cliente:</strong> {pedido.cliente?.nombres || 'Consumidor Final'}</p>
                        <p className="estado"><strong>Estado:</strong> {pedido.estado}</p>

                        <button
                            className="btn-pagar"
                            disabled={processingId === pedido.idPedido}
                            onClick={() => handlePagarPedido(pedido.idPedido)}
                        >
                            {processingId === pedido.idPedido ? 'Procesando...' : 'Registrar Pago 💵'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PedidosParaPagar;
