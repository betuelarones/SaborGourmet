// src/pages/GestionInsumos.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

function GestionInsumos() {
    const [insumos, setInsumos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInsumos = async () => {
        try {
            const response = await apiClient.get('/insumos');
            setInsumos(response.data);
        } catch (err) {
            setError('No se pudieron cargar los insumos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsumos();
    }, []);

    const handleEliminar = async (idInsumo) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este insumo?')) {
            try {
                await apiClient.delete(`/insumos/${idInsumo}`);
                alert('Insumo eliminado con éxito.');
                setInsumos(insumos.filter(i => i.idInsumo !== idInsumo));
            } catch (err) {
                // ¡Aquí capturamos tu validación del backend!
                setError(err.response?.data?.message || 'Error al eliminar el insumo.');
            }
        }
    };

    if (loading) return <p>Cargando insumos...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Gestión de Inventario (Insumos)</h2>

            <Link to="/crear-insumo">
                <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'green', color: 'white' }}>
                    + Crear Insumo Nuevo
                </button>
            </Link>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>ID</th>
                        <th style={{ padding: '8px' }}>Nombre</th>
                        <th style={{ padding: '8px' }}>Stock Actual</th>
                        <th style={{ padding: '8px' }}>Stock Mínimo</th>
                        <th style={{ padding: '8px' }}>Unidad</th>
                        <th style={{ padding: '8px' }}>Precio Compra (prom.)</th>
                        <th style={{ padding: '8px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {insumos.map(insumo => (
                        <tr key={insumo.idInsumo} style={{ backgroundColor: insumo.stock < insumo.stockMinimo ? '#ffcccc' : 'transparent' }}>
                            <td style={{ padding: '8px' }}>{insumo.idInsumo}</td>
                            <td style={{ padding: '8px' }}>{insumo.nombre}</td>
                            <td style={{ padding: '8px', fontWeight: 'bold' }}>{insumo.stock}</td>
                            <td style={{ padding: '8px' }}>{insumo.stockMinimo}</td>
                            <td style={{ padding: '8px' }}>{insumo.unidadMedida}</td>
                            <td style={{ padding: '8px' }}>S/ {insumo.precioCompra}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                <Link to={`/editar-insumo/${insumo.idInsumo}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button
                                    onClick={() => handleEliminar(insumo.idInsumo)}
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

export default GestionInsumos;