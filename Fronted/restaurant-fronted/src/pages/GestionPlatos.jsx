import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/GestionPlatos.css';

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
        if (window.confirm('¿Estás seguro de que deseas eliminar este plato?')) {
            try {
                await apiClient.delete(`/platos/${idPlato}`);
                alert('Plato eliminado con éxito.');
                setPlatos(platos.filter(plato => plato.idPlato !== idPlato));
            } catch (err) {
                setError('Error al eliminar el plato.');
                console.error(err);
            }
        }
    };

    if (loading) return <p className="gp-loading">Cargando platos...</p>;

    return (
        <div className="gp-container">
            <Link to="/dashboard" className="gp-back">&lt; Volver al Dashboard</Link>
            <h2 className="gp-title">Gestión de Platos (Admin)</h2>

            <Link to="/crear-plato">
                <button className="gp-create">+ Crear Plato Nuevo</button>
            </Link>

            {error && <p className="gp-error">{error}</p>}

            <div className="gp-table-wrap">
                <table className="gp-table" role="table" aria-label="Lista de platos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {platos.map(plato => (
                            <tr key={plato.idPlato}>
                                <td>{plato.idPlato}</td>
                                <td className="gp-name">{plato.nombre}</td>
                                <td>S/ {plato.precio}</td>
                                <td>{plato.tipo}</td>
                                <td>
                                    <span className={`gp-status ${String(plato.estado).toLowerCase()}`}>
                                        {plato.estado}
                                    </span>
                                </td>
                                <td className="gp-actions">
                                    <Link to={`/editar-plato/${plato.idPlato}`}>
                                        <button className="gp-btn gp-edit">Editar</button>
                                    </Link>
                                    <button
                                        onClick={() => handleEliminar(plato.idPlato)}
                                        className="gp-btn gp-delete"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {platos.length === 0 && !loading && (
                <p className="gp-empty">No hay platos registrados.</p>
            )}
        </div>
    );
}

export default GestionPlatos;
