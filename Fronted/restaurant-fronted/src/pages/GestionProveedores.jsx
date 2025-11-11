import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/GestionProveedores.css';

function GestionProveedores() {
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProveedores = async () => {
        try {
            const response = await apiClient.get('/proveedores');
            setProveedores(response.data);
        } catch (err) {
            setError('No se pudieron cargar los proveedores.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProveedores();
    }, []);

    const handleEliminar = async (idProveedor) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            try {
                await apiClient.delete(`/proveedores/${idProveedor}`);
                alert('Proveedor eliminado con éxito.');
                setProveedores(proveedores.filter(p => p.idProveedor !== idProveedor));
            } catch (err) {
                setError('Error al eliminar el proveedor.');
                console.error(err);
            }
        }
    };

    if (loading) return <p className="gpv-loading">Cargando proveedores...</p>;

    return (
        <div className="gpv-container">
            <Link to="/dashboard" className="gpv-back">&lt; Volver al Dashboard</Link>
            <h2 className="gpv-title">Gestión de Proveedores (Admin)</h2>

            <Link to="/crear-proveedor">
                <button className="gpv-create">+ Crear Proveedor Nuevo</button>
            </Link>

            {error && <p className="gpv-error">{error}</p>}

            <div className="gpv-table-wrap">
                <table className="gpv-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>RUC</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map(prov => (
                            <tr key={prov.idProveedor}>
                                <td>{prov.idProveedor}</td>
                                <td className="gpv-name">{prov.nombre}</td>
                                <td>{prov.ruc}</td>
                                <td>{prov.telefono}</td>
                                <td>{prov.correo}</td>
                                <td>{prov.direccion}</td>
                                <td className="gpv-actions">
                                    <Link to={`/editar-proveedor/${prov.idProveedor}`}>
                                        <button className="gpv-btn gpv-edit">Editar</button>
                                    </Link>
                                    <button
                                        onClick={() => handleEliminar(prov.idProveedor)}
                                        className="gpv-btn gpv-delete"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {proveedores.length === 0 && !loading && (
                <p className="gpv-empty">No hay proveedores registrados.</p>
            )}
        </div>
    );
}

export default GestionProveedores;
