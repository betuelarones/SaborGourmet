// src/pages/EditarPlato.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiService';

function EditarPlato() {
    const { idPlato } = useParams(); // <-- Obtiene el ID del plato de la URL
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estado para guardar los datos del formulario
    const [plato, setPlato] = useState({
        nombre: '',
        descripcion: '',
        precio: 0.0,
        tipo: 'Fondo',
        estado: 'activo'
    });

    // ---
    // ¡¡NUEVO!! - Cargar los datos del plato al iniciar
    // ---
    useEffect(() => {
        const fetchPlato = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`/platos/${idPlato}`);
                setPlato(response.data); // Rellena el estado con los datos del plato
            } catch (err) {
                setError('No se pudo cargar el plato.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlato();
    }, [idPlato]); // Se ejecuta cada vez que el idPlato de la URL cambie

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
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const datosPlato = {
                ...plato,
                precio: parseFloat(plato.precio)
            };

            // ---
            // ¡¡CAMBIO!! - Usamos PUT en lugar de POST
            // ---
            await apiClient.put(`/platos/${idPlato}`, datosPlato);

            alert('¡Plato actualizado con éxito!');
            navigate('/gestion-platos'); // Redirigimos a la lista

        } catch (err) {
            setError('Error al actualizar el plato.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !plato.nombre) {
        return <p>Cargando datos del plato...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/gestion-platos">{"< Volver a Gestión de Platos"}</Link>
            <h2 style={{ marginTop: '20px' }}>Editar Plato (ID: {idPlato})</h2>

            <form onSubmit={handleSubmit}>
                {/* ... (El resto del formulario es IDÉNTICO al de CrearPlato.jsx) ... */}
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
                    {loading ? 'Actualizando...' : 'Actualizar Plato'}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}

export default EditarPlato;