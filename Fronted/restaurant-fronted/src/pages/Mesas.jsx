// src/pages/Mesas.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiService'; // <-- ¡Usamos nuestro servicio!
import { Link } from 'react-router-dom';

function Mesas() {
    // Estados para guardar la lista de mesas y el estado de carga
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect se ejecuta 1 vez cuando el componente se carga
    useEffect(() => {
        const fetchMesas = async () => {
            try {
                // ¡Llamada a la API! (Ya no necesitamos poner la URL completa ni el token)
                const response = await apiClient.get('/mesas/disponibles');
                setMesas(response.data); // Guardamos la lista de mesas
            } catch (err) {
                setError('No se pudieron cargar las mesas.');
                console.error(err);
            } finally {
                setLoading(false); // Terminamos de cargar
            }
        };

        fetchMesas();
    }, []); // El [] vacío asegura que solo se ejecute una vez

    // --- Renderizado ---
    if (loading) {
        return <p>Cargando mesas...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Mesas Disponibles</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {mesas.map(mesa => (
            
                    <Link
                        key={mesa.idMesa}
                        to={`/crear-pedido/${mesa.idMesa}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <div
                            style={{ border: '1px solid green', padding: '10px', borderRadius: '5px' }}
                        >
                            <strong>Mesa #{mesa.numero}</strong>
                            <p>Capacidad: {mesa.capacidad} personas</p>
                            <p>Estado: {mesa.estado}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {mesas.length === 0 && <p>No hay mesas disponibles en este momento.</p>}
        </div>
    );
}

export default Mesas;