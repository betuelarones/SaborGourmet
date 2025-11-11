// src/pages/GestionMesas.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/GestionMesas.css';

function GestionMesas() {
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMesas = async () => {
        try {
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

    if (loading) return <p className="loading">Cargando mesas...</p>;

    return (
        <div className="gestion-mesas-container">
            <Link to="/dashboard" className="back-link">← Volver al Dashboard</Link>
            <h2 className="titulo">Gestión de Mesas (Admin)</h2>

            <Link to="/crear-mesa">
                <button className="btn-crear">+ Crear Mesa Nueva</button>
            </Link>

            {error && <p className="error">{error}</p>}

            <div className="tabla-container">
                <table className="tabla-mesas">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Número</th>
                            <th>Capacidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mesas.map((mesa) => (
                            <tr key={mesa.idMesa}>
                                <td>{mesa.idMesa}</td>
                                <td>{mesa.numero}</td>
                                <td>{mesa.capacidad}</td>
                                <td>
                                    <span className={`estado ${mesa.estado.toLowerCase()}`}>
                                        {mesa.estado}
                                    </span>
                                </td>
                                <td className="acciones">
                                    <Link to={`/editar-mesa/${mesa.idMesa}`}>
                                        <button className="btn-editar">Editar</button>
                                    </Link>
                                    <button
                                        onClick={() => handleEliminar(mesa.idMesa)}
                                        className="btn-eliminar"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GestionMesas;
