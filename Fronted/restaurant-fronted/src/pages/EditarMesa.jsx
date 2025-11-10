// src/pages/EditarMesa.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';

function EditarMesa() {
    const { idMesa } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mesa, setMesa] = useState({
        numero: '',
        capacidad: '',
        estado: 'disponible' // El admin puede cambiar el estado
    });

    // Cargar datos de la mesa
    useEffect(() => {
        const fetchMesa = async () => {
            try {
                const response = await apiClient.get(`/mesas/${idMesa}`);
                setMesa(response.data);
            } catch (err) {
                setError('No se pudo cargar la mesa.');
            }
        };
        fetchMesa();
    }, [idMesa]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMesa({
            ...mesa,
            // Si el name no es 'estado', conviértelo a número
            [name]: (name !== 'estado') ? parseInt(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await apiClient.put(`/mesas/${idMesa}`, mesa);
            alert('¡Mesa actualizada con éxito!');
            navigate('/gestion-mesas');
        } catch (err) {
            setError('Error al actualizar la mesa.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-mesas">{"< Volver a Gestión de Mesas"}</Link>
            <h2 style={{ marginTop: '20px' }}>Editar Mesa (ID: {idMesa})</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Número de Mesa:</label><br />
                    <input
                        type="number"
                        name="numero"
                        value={mesa.numero}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Capacidad (personas):</label><br />
                    <input
                        type="number"
                        name="capacidad"
                        value={mesa.capacidad}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Estado:</label><br />
                    <select name="estado" value={mesa.estado} onChange={handleChange}>
                        <option value="disponible">Disponible</option>
                        <option value="ocupada">Ocupada</option>
                        <option value="mantenimiento">Mantenimiento</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '10px' }}>
                    {loading ? 'Actualizando...' : 'Actualizar Mesa'}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default EditarMesa;