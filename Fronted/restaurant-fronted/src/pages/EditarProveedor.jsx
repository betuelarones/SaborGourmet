import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/EditarProveedor.css';

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
        direccion: '',
    });

    useEffect(() => {
        const fetchProveedor = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`/proveedores/${idProveedor}`);
                setProveedor(response.data);
            } catch {
                setError('No se pudo cargar el proveedor.');
            } finally {
                setLoading(false);
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
        if (!proveedor.nombre || !proveedor.ruc) {
            setError('El nombre y el RUC son obligatorios.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await apiClient.put(`/proveedores/${idProveedor}`, proveedor);
            navigate('/gestion-proveedores');
        } catch {
            setError('Error al actualizar el proveedor.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !proveedor.nombre) {
        return <p className="editar-proveedor-loading">Cargando datos del proveedor...</p>;
    }

    return (
        <div className="editar-proveedor-container">
            <Link to="/gestion-proveedores" className="editar-proveedor-back">
                &lt; Volver a Gestión de Proveedores
            </Link>

            <h2 className="editar-proveedor-title">
                Editar Proveedor (ID: {idProveedor})
            </h2>

            <form onSubmit={handleSubmit} className="editar-proveedor-form">
                <div className="editar-proveedor-group">
                    <label htmlFor="nombre" className="editar-proveedor-label">Nombre:</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={proveedor.nombre}
                        onChange={handleChange}
                        required
                        className="editar-proveedor-input"
                    />
                </div>

                <div className="editar-proveedor-group">
                    <label htmlFor="ruc" className="editar-proveedor-label">RUC:</label>
                    <input
                        id="ruc"
                        type="text"
                        name="ruc"
                        value={proveedor.ruc}
                        onChange={handleChange}
                        required
                        className="editar-proveedor-input"
                    />
                </div>

                <div className="editar-proveedor-group">
                    <label htmlFor="telefono" className="editar-proveedor-label">Teléfono:</label>
                    <input
                        id="telefono"
                        type="text"
                        name="telefono"
                        value={proveedor.telefono}
                        onChange={handleChange}
                        className="editar-proveedor-input"
                    />
                </div>

                <div className="editar-proveedor-group">
                    <label htmlFor="correo" className="editar-proveedor-label">Correo:</label>
                    <input
                        id="correo"
                        type="email"
                        name="correo"
                        value={proveedor.correo}
                        onChange={handleChange}
                        className="editar-proveedor-input"
                    />
                </div>

                <div className="editar-proveedor-group">
                    <label htmlFor="direccion" className="editar-proveedor-label">Dirección:</label>
                    <input
                        id="direccion"
                        type="text"
                        name="direccion"
                        value={proveedor.direccion}
                        onChange={handleChange}
                        className="editar-proveedor-input"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`editar-proveedor-button ${loading ? 'loading' : ''}`}
                >
                    {loading ? 'Actualizando...' : 'Actualizar Proveedor'}
                </button>

                {error && <p className="editar-proveedor-error">{error}</p>}
            </form>
        </div>
    );
}

export default EditarProveedor;
