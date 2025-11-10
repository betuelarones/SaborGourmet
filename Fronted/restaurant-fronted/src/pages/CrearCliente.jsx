// src/pages/CrearCliente.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';

function CrearCliente() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cliente, setCliente] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        telefono: '',
        correo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await apiClient.post('/clientes', cliente);
            alert('¡Cliente creado con éxito!');
            navigate('/gestion-clientes');
        } catch (err) {
            setError('Error al crear el cliente. Verifica el DNI.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-clientes">{"< Volver a Gestión de Clientes"}</Link>
            <h2 style={{ marginTop: '20px' }}>Crear Nuevo Cliente</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombres:</label><br />
                    <input type="text" name="nombres" value={cliente.nombres} onChange={handleChange} required style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Apellidos:</label><br />
                    <input type="text" name="apellidos" value={cliente.apellidos} onChange={handleChange} required style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>DNI:</label><br />
                    <input type="text" name="dni" value={cliente.dni} onChange={handleChange} required style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Teléfono:</label><br />
                    <input type="text" name="telefono" value={cliente.telefono} onChange={handleChange} style={{ width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Correo:</label><br />
                    <input type="email" name="correo" value={cliente.correo} onChange={handleChange} style={{ width: '300px' }} />
                </div>

                <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '10px' }}>
                    {loading ? 'Guardando...' : 'Guardar Cliente'}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default CrearCliente;