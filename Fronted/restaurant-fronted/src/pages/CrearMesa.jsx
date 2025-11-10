// src/pages/CrearMesa.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';

function CrearMesa() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mesa, setMesa] = useState({
        numero: '',
        capacidad: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMesa({
            ...mesa,
            [name]: parseInt(value) // Los números de mesa y capacidad son enteros
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await apiClient.post('/mesas', mesa);
            alert('¡Mesa creada con éxito!');
            navigate('/gestion-mesas');
        } catch (err) {
            setError('Error al crear la mesa.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-mesas">{"< Volver a Gestión de Mesas"}</Link>
            <h2 style={{ marginTop: '20px' }}>Crear Nueva Mesa</h2>

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

                <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '10px' }}>
                    {loading ? 'Guardando...' : 'Guardar Mesa'}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default CrearMesa;