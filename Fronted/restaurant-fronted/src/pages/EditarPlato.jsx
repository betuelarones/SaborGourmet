import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/EditarPlato.css';

function EditarPlato() {
    const { idPlato } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [plato, setPlato] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        tipo: 'Fondo',
        estado: 'activo',
    });

    useEffect(() => {
        const fetchPlato = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`/platos/${idPlato}`);
                setPlato(response.data);
            } catch {
                setError('No se pudo cargar el plato.');
            } finally {
                setLoading(false);
            }
        };
        fetchPlato();
    }, [idPlato]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlato({
            ...plato,
            [name]: name === 'precio' ? parseFloat(value) || '' : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!plato.nombre || !plato.precio) {
            setError('El nombre y el precio son obligatorios.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await apiClient.put(`/platos/${idPlato}`, plato);
            navigate('/gestion-platos');
        } catch {
            setError('Error al actualizar el plato.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !plato.nombre) {
        return <p className="editar-plato-loading">Cargando datos del plato...</p>;
    }

    return (
        <div className="editar-plato-container">
            <Link to="/gestion-platos" className="editar-plato-back">
                &lt; Volver a Gestión de Platos
            </Link>

            <h2 className="editar-plato-title">Editar Plato (ID: {idPlato})</h2>

            <form onSubmit={handleSubmit} className="editar-plato-form">
                <div className="editar-plato-group">
                    <label htmlFor="nombre" className="editar-plato-label">Nombre:</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={plato.nombre}
                        onChange={handleChange}
                        required
                        className="editar-plato-input"
                    />
                </div>

                <div className="editar-plato-group">
                    <label htmlFor="descripcion" className="editar-plato-label">Descripción:</label>
                    <input
                        id="descripcion"
                        type="text"
                        name="descripcion"
                        value={plato.descripcion}
                        onChange={handleChange}
                        className="editar-plato-input"
                    />
                </div>

                <div className="editar-plato-group">
                    <label htmlFor="precio" className="editar-plato-label">Precio (S/):</label>
                    <input
                        id="precio"
                        type="number"
                        name="precio"
                        step="0.01"
                        value={plato.precio}
                        onChange={handleChange}
                        required
                        className="editar-plato-input"
                    />
                </div>

                <div className="editar-plato-group">
                    <label htmlFor="tipo" className="editar-plato-label">Tipo:</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={plato.tipo}
                        onChange={handleChange}
                        className="editar-plato-select"
                    >
                        <option value="Fondo">Fondo</option>
                        <option value="Entrada">Entrada</option>
                        <option value="Bebida">Bebida</option>
                        <option value="Postre">Postre</option>
                    </select>
                </div>

                <div className="editar-plato-group">
                    <label htmlFor="estado" className="editar-plato-label">Estado:</label>
                    <select
                        id="estado"
                        name="estado"
                        value={plato.estado}
                        onChange={handleChange}
                        className="editar-plato-select"
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`editar-plato-button ${loading ? 'loading' : ''}`}
                >
                    {loading ? 'Actualizando...' : 'Actualizar Plato'}
                </button>

                {error && <p className="editar-plato-error">{error}</p>}
            </form>
        </div>
    );
}

export default EditarPlato;
