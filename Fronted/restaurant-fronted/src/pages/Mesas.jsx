// src/pages/Mesas.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiService';
import { Link } from 'react-router-dom';
import '../css/Mesas.css';

function Mesas() {
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMesas = async () => {
            try {
                const response = await apiClient.get('/mesas/disponibles');
                setMesas(response.data);
            } catch (err) {
                setError('No se pudieron cargar las mesas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMesas();
    }, []);

    if (loading) return <p>Cargando mesas...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="mesas-container">
            <div className="mesas-header">
                <Link to="/dashboard">← Volver al Dashboard</Link>
                <h2 className="mesas-title">Mesas Disponibles</h2>
            </div>

            <div className="mesas-grid">
                {mesas.map(mesa => (
                    <Link
                        key={mesa.idMesa}
                        to={`/crear-pedido/${mesa.idMesa}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="mesa-card">
                            <strong>Mesa #{mesa.numero}</strong>
                            <p>Capacidad: {mesa.capacidad} personas</p>
                            <p
                                className={
                                    mesa.estado === 'Disponible'
                                        ? 'estado-disponible'
                                        : mesa.estado === 'Ocupada'
                                            ? 'estado-ocupada'
                                            : 'estado-reservada'
                                }
                            >
                                Estado: {mesa.estado}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {mesas.length === 0 && <p className="mesas-empty">No hay mesas disponibles en este momento.</p>}
        </div>
    );
}

export default Mesas;
