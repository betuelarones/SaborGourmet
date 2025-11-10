// src/pages/GestionPlatos.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

function GestionPlatos() {
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar la lista de platos
    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await apiClient.get('/platos');
                setPlatos(response.data);
            } catch (err) {
                setError('No se pudieron cargar los platos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlatos();
    }, []);

    const handleEliminar = async (idPlato) => {
        // 1. Pedimos confirmación
        if (window.confirm('¿Estás seguro de que deseas eliminar este plato?')) {
            try {
                // 2. Llamamos al backend
                await apiClient.delete(`/platos/${idPlato}`);

                alert('Plato eliminado con éxito.');

                // 3. Actualizamos la lista en el frontend (sin recargar la página)
                //    Simplemente, filtramos el plato eliminado del estado 'platos'
                setPlatos(platos.filter(plato => plato.idPlato !== idPlato));

            } catch (err) {
                setError('Error al eliminar el plato.');
                console.error(err);
            }
        }
    };

    if (loading) return <p>Cargando platos...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Gestión de Platos (Admin)</h2>

            <Link to="/crear-plato">
                <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'green', color: 'white' }}>
                    + Crear Plato Nuevo
                </button>
            </Link>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>ID</th>
                        <th style={{ padding: '8px' }}>Nombre</th>
                        <th style={{ padding: '8px' }}>Precio</th>
                        <th style={{ padding: '8px' }}>Tipo</th>
                        <th style={{ padding: '8px' }}>Estado</th>
                        <th style={{ padding: '8px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {platos.map(plato => (
                        <tr key={plato.idPlato}>
                            <td style={{ padding: '8px' }}>{plato.idPlato}</td>
                            <td style={{ padding: '8px' }}>{plato.nombre}</td>
                            <td style={{ padding: '8px' }}>S/ {plato.precio}</td>
                            <td style={{ padding: '8px' }}>{plato.tipo}</td>
                            <td style={{ padding: '8px' }}>{plato.estado}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                <Link to={`/editar-plato/${plato.idPlato}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleEliminar(plato.idPlato)}
                                    style={{ backgroundColor: 'red', color: 'white' }}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {platos.length === 0 && !loading && (
                <p>No hay platos registrados.</p>
            )}
        </div>
    );
}

export default GestionPlatos;