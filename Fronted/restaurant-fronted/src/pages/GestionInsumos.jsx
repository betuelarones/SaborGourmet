import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/GestionInsumos.css';

function GestionInsumos() {
    const [insumos, setInsumos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInsumos = async () => {
            try {
                const response = await apiClient.get('/insumos');
                setInsumos(response.data);
            } catch {
                setError('No se pudieron cargar los insumos.');
            } finally {
                setLoading(false);
            }
        };
        fetchInsumos();
    }, []);

    const handleEliminar = async (idInsumo) => {
        if (window.confirm('¿Estás seguro de eliminar este insumo?')) {
            try {
                await apiClient.delete(`/insumos/${idInsumo}`);
                alert('Insumo eliminado con éxito.');
                setInsumos(insumos.filter(i => i.idInsumo !== idInsumo));
            } catch (err) {
                setError(err.response?.data?.message || 'Error al eliminar el insumo.');
            }
        }
    };

    if (loading) return <p className="loading-text">Cargando insumos...</p>;

    return (
        <div className="insumos-container">
            <Link to="/dashboard" className="back-link">← Volver al Dashboard</Link>
            <h2 className="insumos-title">Gestión de Inventario (Insumos)</h2>

            <Link to="/crear-insumo">
                <button className="btn-create">+ Crear Insumo Nuevo</button>
            </Link>

            {error && <p className="error-text">{error}</p>}

            <table className="insumos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock Actual</th>
                        <th>Stock Mínimo</th>
                        <th>Unidad</th>
                        <th>Precio Compra (Prom.)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {insumos.map(insumo => (
                        <tr
                            key={insumo.idInsumo}
                            className={insumo.stock < insumo.stockMinimo ? 'low-stock' : ''}
                        >
                            <td>{insumo.idInsumo}</td>
                            <td>{insumo.nombre}</td>
                            <td className="stock-value">{insumo.stock}</td>
                            <td>{insumo.stockMinimo}</td>
                            <td>{insumo.unidadMedida}</td>
                            <td>S/ {insumo.precioCompra}</td>
                            <td className="actions">
                                <Link to={`/editar-insumo/${insumo.idInsumo}`}>
                                    <button className="btn-edit">Editar</button>
                                </Link>
                                <button
                                    onClick={() => handleEliminar(insumo.idInsumo)}
                                    className="btn-delete"
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

export default GestionInsumos;
