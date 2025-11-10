// src/pages/GestionProveedores.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

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

    if (loading) return <p>Cargando proveedores...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Gestión de Proveedores (Admin)</h2>

            <Link to="/crear-proveedor">
                <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'green', color: 'white' }}>
                    + Crear Proveedor Nuevo
                </button>
            </Link>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>ID</th>
                        <th style={{ padding: '8px' }}>Nombre</th>
                        <th style={{ padding: '8px' }}>RUC</th>
                        <th style={{ padding: '8px' }}>Teléfono</th>
                        <th style={{ padding: '8px' }}>Correo</th>
                        <th style={{ padding: '8px' }}>Dirección</th>
                        <th style={{ padding: '8px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(prov => (
                        <tr key={prov.idProveedor}>
                            <td style={{ padding: '8px' }}>{prov.idProveedor}</td>
                            <td style={{ padding: '8px' }}>{prov.nombre}</td>
                            <td style={{ padding: '8px' }}>{prov.ruc}</td>
                            <td style={{ padding: '8px' }}>{prov.telefono}</td>
                            <td style={{ padding: '8px' }}>{prov.correo}</td>
                            <td style={{ padding: '8px' }}>{prov.direccion}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                <Link to={`/editar-proveedor/${prov.idProveedor}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button
                                    onClick={() => handleEliminar(prov.idProveedor)}
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

export default GestionProveedores;