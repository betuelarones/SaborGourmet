// src/pages/PedidosParaPagar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/PedidosParaPagar.css';

function PedidosParaPagar() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPedidosServidos = async () => {
        setLoading(true);
        setError(null);
        try {
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
        try {
            const metodoPago = prompt('Método de pago (efectivo, tarjeta):', 'efectivo');
            if (!metodoPago) return;

            const pagoDTO = { metodoPago };
            await apiClient.post(`/pedidos/${idPedido}/pagar`, pagoDTO);

            alert('¡Pedido pagado y facturado! La mesa ha sido liberada.');
            fetchPedidosServidos();
        } catch (err) {
            setError('Error al registrar el pago.');
            console.error(err);
        }
    };

    if (loading) return <p>Cargando cuentas...</p>;

    return (
        <div className="pedidos-container">
            <div className="pedidos-header">
                <Link to="/dashboard">← Volver al Dashboard</Link>
                <h2 className="pedidos-title">Cuentas por Pagar (Caja)</h2>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <div className="pedidos-list">
                {pedidos.length === 0 && !loading && (
                    <p className="empty-msg">No hay cuentas pendientes de pago.</p>
                )}

                {pedidos.map((pedido) => (
                    <div key={pedido.idPedido} className="pedido-card">
                        <strong>Pedido #{pedido.idPedido} (Mesa #{pedido.mesa.numero})</strong>
                        <p>Cliente: {pedido.cliente ? pedido.cliente.nombres : 'Consumidor Final'}</p>
                        <p className="estado">Estado: {pedido.estado}</p>

                        <button
                            className="btn-pagar"
                            onClick={() => handlePagarPedido(pedido.idPedido)}
                        >
                            Registrar Pago 💵
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PedidosParaPagar;
