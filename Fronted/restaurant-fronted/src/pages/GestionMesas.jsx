// src/pages/GestionMesas.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

function GestionMesas() {
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar la lista COMPLETA de mesas
    const fetchMesas = async () => {
        try {
            // ¡Llama al nuevo endpoint que lista TODAS las mesas!
            const response = await apiClient.get('/mesas');
            setMesas(response.data);
        } catch (err) {
            setError('No se pudieron cargar las mesas.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMesas();
    }, []);

    // Función para Eliminar
    const handleEliminar = async (idMesa) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta mesa?')) {
            try {
                await apiClient.delete(`/mesas/${idMesa}`);
                alert('Mesa eliminada con éxito.');
                setMesas(mesas.filter(mesa => mesa.idMesa !== idMesa));
            } catch (err) {
                setError('Error al eliminar la mesa. ¿Está ocupada?');
                console.error(err);
            }
        }
    };

    if (loading) return <p>Cargando mesas...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Gestión de Mesas (Admin)</h2>

            <Link to="/crear-mesa">
                <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'green', color: 'white' }}>
                    + Crear Mesa Nueva
                </button>
            </Link>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>ID</th>
                        <th style={{ padding: '8px' }}>Número de Mesa</th>
                        <th style={{ padding: '8px' }}>Capacidad</th>
                        <th style={{ padding: '8px' }}>Estado</th>
                        <th style={{ padding: '8px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mesas.map(mesa => (
                        <tr key={mesa.idMesa}>
                            <td style={{ padding: '8px' }}>{mesa.idMesa}</td>
                            <td style={{ padding: '8px' }}>{mesa.numero}</td>
                            <td style={{ padding: '8px' }}>{mesa.capacidad}</td>
                            <td style={{ padding: '8px' }}>{mesa.estado}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                <Link to={`/editar-mesa/${mesa.idMesa}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button
                                    onClick={() => handleEliminar(mesa.idMesa)}
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionMesas;