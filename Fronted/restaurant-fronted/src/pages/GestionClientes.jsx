import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/GestionClientes.css';

function GestionClientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await apiClient.get('/clientes');
                setClientes(response.data);
            } catch (err) {
                setError('No se pudieron cargar los clientes.');
            } finally {
                setLoading(false);
            }
        };
        fetchClientes();
    }, []);

    const handleEliminar = async (idCliente) => {
        if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
            try {
                await apiClient.delete(`/clientes/${idCliente}`);
                setClientes(clientes.filter(c => c.idCliente !== idCliente));
                alert('Cliente eliminado con éxito.');
            } catch {
                setError('Error al eliminar el cliente.');
            }
        }
    };

    if (loading) return <p className="loading-text">Cargando clientes...</p>;

    return (
        <div className="clientes-container">
            <Link to="/dashboard" className="back-link">← Volver al Dashboard</Link>
            <h2 className="clientes-title">Gestión de Clientes (Admin)</h2>

            <Link to="/crear-cliente">
                <button className="btn-create">+ Crear Cliente Nuevo</button>
            </Link>

            {error && <p className="error-text">{error}</p>}

            <table className="clientes-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>DNI</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.idCliente}>
                            <td>{cliente.idCliente}</td>
                            <td>{cliente.nombres}</td>
                            <td>{cliente.apellidos}</td>
                            <td>{cliente.dni}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.estado ? 'Activo' : 'Inactivo'}</td>
                            <td className="actions">
                                <Link to={`/editar-cliente/${cliente.idCliente}`}>
                                    <button className="btn-edit">Editar</button>
                                </Link>
                                <button 
                                    onClick={() => handleEliminar(cliente.idCliente)} 
                                    className="btn-delete"
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
