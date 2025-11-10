// src/pages/AlertasStock.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

function AlertasStock() {
    const [insumosBajos, setInsumosBajos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlertas = async () => {
            try {
                const response = await apiClient.get('/insumos/stock-bajo');
                setInsumosBajos(response.data);
            } catch (err) {
                setError('No se pudieron cargar las alertas de stock.');
            } finally {
                setLoading(false);
            }
        };
        fetchAlertas();
    }, []);

    if (loading) return <p>Cargando alertas...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px', color: 'red' }}>Alertas de Stock Bajo (RF15)</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {insumosBajos.length === 0 && !loading && (
                <p>¡Todo bien! No hay insumos con stock bajo.</p>
            )}

            {insumosBajos.length > 0 && (
                <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px' }}>Insumo</th>
                            <th style={{ padding: '8px' }}>Stock Actual</th>
                            <th style={{ padding: '8px' }}>Stock Mínimo</th>
                            <th style={{ padding: '8px' }}>Unidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insumosBajos.map(insumo => (
                            <tr key={insumo.idInsumo} style={{ backgroundColor: '#ffcccc', fontWeight: 'bold' }}>
                                <td style={{ padding: '8px' }}>{insumo.nombre}</td>
                                <td style={{ padding: '8px' }}>{insumo.stock}</td>
                                <td style={{ padding: '8px' }}>{insumo.stockMinimo}</td>
                                <td style={{ padding: '8px' }}>{insumo.unidadMedida}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AlertasStock;