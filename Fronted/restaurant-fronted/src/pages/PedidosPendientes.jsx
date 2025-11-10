// src/pages/PedidosPendientes.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

function PedidosPendientes() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ---
    // PASO 1: Cargar los pedidos pendientes (RF9)
    // ---
    const fetchPedidosPendientes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/pedidos/pendientes');
            setPedidos(response.data);
        } catch (err) {
            setError('No se pudieron cargar los pedidos pendientes.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para cargar los pedidos al inicio
    useEffect(() => {
        fetchPedidosPendientes();
    }, []);

    // ---
    // PASO 2: Marcar un pedido como "servido" (RF8)
    // ---
    const handleMarcarServido = async (idPedido) => {
        try {
            // Llamamos al backend para cambiar el estado
            await apiClient.put(`/pedidos/${idPedido}/estado`, "servido", {
                headers: { 'Content-Type': 'text/plain' } // ¡Importante para un String!
            });

            alert('Pedido marcado como "servido"');

            // Volvemos a cargar la lista para que desaparezca de "pendientes"
            fetchPedidosPendientes();

        } catch (err) {
            setError('Error al actualizar el estado del pedido.');
            console.error(err);
        }
    };

    // ---
    // Renderizado
    // ---
    if (loading) return <p>Cargando pedidos...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Pedidos Pendientes (Cocina)</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {pedidos.length === 0 && !loading && (
                    <p>No hay pedidos pendientes. ¡Buen trabajo!</p>
                )}

                {pedidos.map(pedido => (
                    <div
                        key={pedido.idPedido}
                        style={{ border: '1px solid orange', padding: '10px', borderRadius: '5px' }}
                    >
                        <strong>Pedido #{pedido.idPedido} (Mesa #{pedido.mesa.numero})</strong>
                        <p>Cliente: {pedido.cliente ? `${pedido.cliente.nombres}` : 'Consumidor Final'}</p>
                        <p>Estado: {pedido.estado}</p>
                        {/* (Aquí podríamos listar los detalles del pedido si quisiéramos) */}

                        <button
                            onClick={() => handleMarcarServido(pedido.idPedido)}
                            style={{ backgroundColor: 'orange', color: 'white', marginTop: '10px' }}
                        >
                            Marcar como Servido (RF8)
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PedidosPendientes;