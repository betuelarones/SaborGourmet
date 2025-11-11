// src/pages/ReporteVentas.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/ReporteVentas.css';

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
        <div className="reporte-container">
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2>Reporte de Ventas Diarias (RF12)</h2>

            <div className="fecha-selector">
                <div>
                    <label>Desde:</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>
                <div>
                    <label>Hasta:</label>
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

            {error && <p className="error-msg">{error}</p>}

            <table className="reporte-table">
                <thead>
                    <tr>
                        <th>Día</th>
                        <th>Total Vendido</th>
                    </tr>
                </thead>
                <tbody>
                    {reporte.map(dia => (
                        <tr key={dia.dia}>
                            <td>{dia.dia}</td>
                            <td>S/ {dia.totalVendido.toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>TOTAL</td>
                        <td>S/ {totalGeneral.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default ReporteVentas;