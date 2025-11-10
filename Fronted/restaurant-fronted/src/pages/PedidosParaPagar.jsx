// src/pages/PedidosParaPagar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

function PedidosParaPagar() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ---
    // PASO 1: Cargar los pedidos "servidos" (¡El endpoint que acabamos de crear!)
    // ---
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

    // ---
    // PASO 2: Pagar el pedido (RF10 y RF11)
    // ---
    const handlePagarPedido = async (idPedido) => {
        try {
            // 1. Preguntamos el método de pago (simple por ahora)
            const metodoPago = prompt("Método de pago (efectivo, tarjeta):", "efectivo");
            if (!metodoPago) return; // Si el usuario cancela

            // 2. Creamos el DTO que espera el backend
            const pagoDTO = { metodoPago: metodoPago };

            // 3. Llamamos al endpoint de "pagar"
            await apiClient.post(`/pedidos/${idPedido}/pagar`, pagoDTO);

            alert('¡Pedido Pagado y Facturado! La mesa ha sido liberada.');

            // 4. Volvemos a cargar la lista (el pedido desaparecerá)
            fetchPedidosServidos();

        } catch (err) {
            setError('Error al registrar el pago.');
            console.error(err);
        }
    };

    // ---
    // Renderizado
    // ---
    if (loading) return <p>Cargando cuentas...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Cuentas por Pagar (Caja)</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {pedidos.length === 0 && !loading && (
                    <p>No hay cuentas pendientes de pago.</p>
                )}

                {pedidos.map(pedido => (
                    <div
                        key={pedido.idPedido}
                        style={{ border: '1px solid blue', padding: '10px', borderRadius: '5px' }}
                    >
                        <strong>Pedido #{pedido.idPedido} (Mesa #{pedido.mesa.numero})</strong>
                        <p>Cliente: {pedido.cliente ? `${pedido.cliente.nombres}` : 'Consumidor Final'}</p>
                        <p>Estado: {pedido.estado}</p>
                        {/* (Aquí podríamos mostrar el TOTAL a pagar si lo tuviéramos) */}

                        <button
                            onClick={() => handlePagarPedido(pedido.idPedido)}
                            style={{ backgroundColor: 'blue', color: 'white', marginTop: '10px' }}
                        >
                            Registrar Pago (RF10)
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PedidosParaPagar;