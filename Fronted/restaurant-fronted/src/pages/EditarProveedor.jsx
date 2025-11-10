// src/pages/EditarProveedor.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';

function EditarProveedor() {
    const { idProveedor } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [proveedor, setProveedor] = useState({
        nombre: '',
        ruc: '',
        telefono: '',
        correo: '',
        direccion: ''
    });

    useEffect(() => {
        const fetchProveedor = async () => {
            try {
                const response = await apiClient.get(`/proveedores/${idProveedor}`);
                setProveedor(response.data);
            } catch (err) {
                setError('No se pudo cargar el proveedor.');
            }
        };
        fetchProveedor();
    }, [idProveedor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProveedor({ ...proveedor, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await apiClient.put(`/proveedores/${idProveedor}`, proveedor);
            alert('¡Proveedor actualizado con éxito!');
            navigate('/gestion-proveedores');
        } catch (err) {
            setError('Error al actualizar el proveedor.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-proveedores">{"< Volver a Gestión de Proveedores"}</Link>
            <h2 style={{ marginTop: '20px' }}>Editar Proveedor (ID: {idProveedor})</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre:</label><br />
                    <input type="text" name="nombre" value={proveedor.nombre} onChange={handleChange} required style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>RUC:</label><br />
                    <input type="text" name="ruc" value={proveedor.ruc} onChange={handleChange} required style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Teléfono:</label><br />
                    <input type="text" name="telefono" value={proveedor.telefono} onChange={handleChange} style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Correo:</label><br />
                    <input type="email" name="correo" value={proveedor.correo} onChange={handleChange} style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Dirección:</label><br />
                    <input type="text" name="direccion" value={proveedor.direccion} onChange={handleChange} style={{ width: '300px' }} />
                </div>

                <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '10px' }}>
                    {loading ? 'Actualizando...' : 'Actualizar Proveedor'}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default EditarProveedor;