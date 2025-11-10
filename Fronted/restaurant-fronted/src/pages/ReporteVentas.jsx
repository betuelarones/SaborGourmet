// src/pages/ReporteVentas.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

// Función para obtener la fecha de hoy en formato YYYY-MM-DD
const getToday = () => {
    return new Date().toISOString().split('T')[0];
};

function ReporteVentas() {
    const [reporte, setReporte] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados para las fechas
    const [fechaInicio, setFechaInicio] = useState(getToday());
    const [fechaFin, setFechaFin] = useState(getToday());

    const handleGenerarReporte = async () => {
        setLoading(true);
        setError(null);
        setReporte([]);

        try {
            // Convertimos las fechas (YYYY-MM-DD) a formato ISO (con hora)
            const inicioISO = `${fechaInicio}T00:00:00`;
            const finISO = `${fechaFin}T23:59:59`;

            const response = await apiClient.get('/reportes/ventas-diarias', {
                params: {
                    inicio: inicioISO,
                    fin: finISO
                }
            });
            setReporte(response.data);
        } catch (err) {
            setError('Error al generar el reporte.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Calcular el total
    const totalGeneral = reporte.reduce((sum, dia) => sum + dia.totalVendido, 0);

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Reporte de Ventas Diarias (RF12)</h2>

            {/* --- Selector de Fechas --- */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div>
                    <label>Desde: </label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>
                <div>
                    <label>Hasta: </label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                </div>
                <button onClick={handleGenerarReporte} disabled={loading}>
                    {loading ? 'Generando...' : 'Generar Reporte'}
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* --- Tabla de Resultados --- */}
            <table border="1" style={{ width: '50%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>Día</th>
                        <th style={{ padding: '8px' }}>Total Vendido</th>
                    </tr>
                </thead>
                <tbody>
                    {reporte.map(dia => (
                        <tr key={dia.dia}>
                            <td style={{ padding: '8px' }}>{dia.dia}</td>
                            <td style={{ padding: '8px' }}>S/ {dia.totalVendido.toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Fila de Total */}
                    <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                        <td style={{ padding: '8px' }}>TOTAL</td>
                        <td style={{ padding: '8px' }}>S/ {totalGeneral.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ReporteVentas;