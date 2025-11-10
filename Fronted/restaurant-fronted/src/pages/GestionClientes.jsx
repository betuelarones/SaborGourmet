// src/pages/GestionClientes.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';

function GestionClientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClientes = async () => {
        try {
            const response = await apiClient.get('/clientes');
            setClientes(response.data);
        } catch (err) {
            setError('No se pudieron cargar los clientes.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleEliminar = async (idCliente) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            try {
                await apiClient.delete(`/clientes/${idCliente}`);
                alert('Cliente eliminado con éxito.');
                setClientes(clientes.filter(cliente => cliente.idCliente !== idCliente));
            } catch (err) {
                setError('Error al eliminar el cliente.');
                console.error(err);
            }
        }
    };

    if (loading) return <p>Cargando clientes...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Gestión de Clientes (Admin)</h2>

            <Link to="/crear-cliente">
                <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'green', color: 'white' }}>
                    + Crear Cliente Nuevo
                </button>
            </Link>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>ID</th>
                        <th style={{ padding: '8px' }}>Nombres</th>
                        <th style={{ padding: '8px' }}>Apellidos</th>
                        <th style={{ padding: '8px' }}>DNI</th>
                        <th style={{ padding: '8px' }}>Teléfono</th>
                        <th style={{ padding: '8px' }}>Correo</th>
                        <th style={{ padding: '8px' }}>Estado</th>
                        <th style={{ padding: '8px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.idCliente}>
                            <td style={{ padding: '8px' }}>{cliente.idCliente}</td>
                            <td style={{ padding: '8px' }}>{cliente.nombres}</td>
                            <td style={{ padding: '8px' }}>{cliente.apellidos}</td>
                            <td style={{ padding: '8px' }}>{cliente.dni}</td>
                            <td style={{ padding: '8px' }}>{cliente.telefono}</td>
                            <td style={{ padding: '8px' }}>{cliente.correo}</td>
                            <td style={{ padding: '8px' }}>{cliente.estado ? 'Activo' : 'Inactivo'}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                <Link to={`/editar-cliente/${cliente.idCliente}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button
                                    onClick={() => handleEliminar(cliente.idCliente)}
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

export default GestionClientes;