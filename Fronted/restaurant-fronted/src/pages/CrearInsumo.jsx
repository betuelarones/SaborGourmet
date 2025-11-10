// src/pages/CrearInsumo.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';

function CrearInsumo() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [insumo, setInsumo] = useState({
        nombre: '',
        unidadMedida: 'kg',
        stock: 0.0,
        stockMinimo: 1.0,
        precioCompra: 0.0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsumo({ ...insumo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convertimos a números antes de enviar
            const datosInsumo = {
                ...insumo,
                stock: parseFloat(insumo.stock),
                stockMinimo: parseFloat(insumo.stockMinimo),
                precioCompra: parseFloat(insumo.precioCompra)
            };
            await apiClient.post('/insumos', datosInsumo);
            alert('¡Insumo creado con éxito!');
            navigate('/gestion-insumos');
        } catch (err) {
            setError('Error al crear el insumo.');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-insumos">{"< Volver a Gestión de Insumos"}</Link>
            <h2 style={{ marginTop: '20px' }}>Crear Nuevo Insumo</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre:</label><br />
                    <input type="text" name="nombre" value={insumo.nombre} onChange={handleChange} required style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Unidad de Medida (kg, lt, un):</label><br />
                    <input type="text" name="unidadMedida" value={insumo.unidadMedida} onChange={handleChange} required style={{ width: '100px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Stock Inicial:</label><br />
                    <input type="number" step="0.01" name="stock" value={insumo.stock} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Stock Mínimo (para alertas):</label><br />
                    <input type="number" step="0.01" name="stockMinimo" value={insumo.stockMinimo} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Precio de Compra (promedio):</label><br />
                    <input type="number" step="0.01" name="precioCompra" value={insumo.precioCompra} onChange={handleChange} />
                </div>

                <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>Guardar Insumo</button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default CrearInsumo;