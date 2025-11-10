// src/pages/EditarInsumo.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';

function EditarInsumo() {
    const { idInsumo } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [insumo, setInsumo] = useState({
        nombre: '',
        unidadMedida: 'kg',
        stock: 0.0,
        stockMinimo: 1.0,
        precioCompra: 0.0
    });

    useEffect(() => {
        const fetchInsumo = async () => {
            try {
                const response = await apiClient.get(`/insumos/${idInsumo}`);
                setInsumo(response.data);
            } catch (err) {
                setError('No se pudo cargar el insumo.');
            }
        };
        fetchInsumo();
    }, [idInsumo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsumo({ ...insumo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datosInsumo = {
                ...insumo,
                stock: parseFloat(insumo.stock),
                stockMinimo: parseFloat(insumo.stockMinimo),
                precioCompra: parseFloat(insumo.precioCompra)
            };
            await apiClient.put(`/insumos/${idInsumo}`, datosInsumo);
            alert('¡Insumo actualizado con éxito!');
            navigate('/gestion-insumos');
        } catch (err) {
            setError('Error al actualizar el insumo.');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-insumos">{"< Volver a Gestión de Insumos"}</Link>
            <h2 style={{ marginTop: '20px' }}>Editar Insumo (ID: {idInsumo})</h2>

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
                    <label>Stock Actual:</label><br />
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

                <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>Actualizar Insumo</button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default EditarInsumo;