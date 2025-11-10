// src/pages/EditarCliente.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';

function EditarCliente() {
    const { idCliente } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cliente, setCliente] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        telefono: '',
        correo: '',
        estado: true
    });

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await apiClient.get(`/clientes/${idCliente}`);
                setCliente(response.data);
            } catch (err) {
                setError('No se pudo cargar el cliente.');
            }
        };
        fetchCliente();
    }, [idCliente]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Maneja el checkbox de 'estado'
        const val = type === 'checkbox' ? checked : value;
        setCliente({ ...cliente, [name]: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await apiClient.put(`/clientes/${idCliente}`, cliente);
            alert('¡Cliente actualizado con éxito!');
            navigate('/gestion-clientes');
        } catch (err) {
            setError('Error al actualizar el cliente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-clientes">{"< Volver a Gestión de Clientes"}</Link>
            <h2 style={{ marginTop: '20px' }}>Editar Cliente (ID: {idCliente})</h2>

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
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        <input type="checkbox" name="estado" checked={cliente.estado} onChange={handleChange} />
                        Cliente Activo
                    </label>
                </div>

                <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '10px' }}>
                    {loading ? 'Actualizando...' : 'Actualizar Cliente'}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default EditarCliente;