import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/EditarMesa.css';

function EditarMesa() {
    const { idMesa } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mesa, setMesa] = useState({
        numero: '',
        capacidad: '',
        estado: 'disponible',
    });

    useEffect(() => {
        const fetchMesa = async () => {
            try {
                const response = await apiClient.get(`/mesas/${idMesa}`);
                setMesa(response.data);
            } catch {
                setError('No se pudo cargar la información de la mesa.');
            }
        };
        fetchMesa();
    }, [idMesa]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMesa({
            ...mesa,
            [name]: name !== 'estado' ? parseInt(value, 10) || '' : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mesa.numero || !mesa.capacidad) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await apiClient.put(`/mesas/${idMesa}`, mesa);
            navigate('/gestion-mesas');
        } catch {
            setError('Error al actualizar la mesa.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="editar-mesa-container">
            <Link to="/gestion-mesas" className="editar-mesa-back">
                &lt; Volver a Gestión de Mesas
            </Link>

            <h2 className="editar-mesa-title">Editar Mesa (ID: {idMesa})</h2>

            <form onSubmit={handleSubmit} className="editar-mesa-form">
                <div className="editar-mesa-group">
                    <label htmlFor="numero" className="editar-mesa-label">Número de Mesa:</label>
                    <input
                        id="numero"
                        type="number"
                        name="numero"
                        value={mesa.numero}
                        onChange={handleChange}
                        required
                        className="editar-mesa-input"
                    />
                </div>

                <div className="editar-mesa-group">
                    <label htmlFor="capacidad" className="editar-mesa-label">Capacidad (personas):</label>
                    <input
                        id="capacidad"
                        type="number"
                        name="capacidad"
                        value={mesa.capacidad}
                        onChange={handleChange}
                        required
                        className="editar-mesa-input"
                    />
                </div>

                <div className="editar-mesa-group">
                    <label htmlFor="estado" className="editar-mesa-label">Estado:</label>
                    <select
                        id="estado"
                        name="estado"
                        value={mesa.estado}
                        onChange={handleChange}
                        className="editar-mesa-select"
                    >
                        <option value="disponible">Disponible</option>
                        <option value="ocupada">Ocupada</option>
                        <option value="mantenimiento">Mantenimiento</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`editar-mesa-button ${loading ? 'loading' : ''}`}
                >
                    {loading ? 'Actualizando...' : 'Actualizar Mesa'}
                </button>

                {error && <p className="editar-mesa-error">{error}</p>}
            </form>
        </div>
    );
}

export default EditarMesa;
