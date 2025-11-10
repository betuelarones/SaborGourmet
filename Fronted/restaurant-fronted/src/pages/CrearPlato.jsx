// src/pages/CrearPlato.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';

function CrearPlato() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estado para guardar los datos del formulario
    const [plato, setPlato] = useState({
        nombre: '',
        descripcion: '',
        precio: 0.0,
        tipo: 'Fondo', // Valor por defecto
        estado: 'activo' // Valor por defecto
    });

    // Función que actualiza el estado cada vez que escribes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlato({
            ...plato,
            [name]: value
        });
    };

    // Función que se llama al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setLoading(true);
        setError(null);

        try {
            // 1. Preparamos los datos (aseguramos que el precio sea un número)
            const datosPlato = {
                ...plato,
                precio: parseFloat(plato.precio)
            };

            // 2. ¡Llamamos al backend para crear el plato!
            await apiClient.post('/platos', datosPlato);

            alert('¡Plato creado con éxito!');
            navigate('/gestion-platos'); // Redirigimos a la lista de platos

        } catch (err) {
            setError('Error al crear el plato. Verifica los datos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-platos">{"< Volver a Gestión de Platos"}</Link>
            <h2 style={{ marginTop: '20px' }}>Crear Nuevo Plato</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre:</label><br />
                    <input
                        type="text"
                        name="nombre"
                        value={plato.nombre}
                        onChange={handleChange}
                        required
                        style={{ width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Descripción:</label><br />
                    <input
                        type="text"
                        name="descripcion"
                        value={plato.descripcion}
                        onChange={handleChange}
                        style={{ width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Precio (S/):</label><br />
                    <input
                        type="number"
                        name="precio"
                        step="0.01"
                        value={plato.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Tipo:</label><br />
                    <select name="tipo" value={plato.tipo} onChange={handleChange}>
                        <option value="Fondo">Fondo</option>
                        <option value="Entrada">Entrada</option>
                        <option value="Bebida">Bebida</option>
                        <option value="Postre">Postre</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Estado:</label><br />
                    <select name="estado" value={plato.estado} onChange={handleChange}>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '10px' }}>
                    {loading ? 'Guardando...' : 'Guardar Plato'}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default CrearPlato;