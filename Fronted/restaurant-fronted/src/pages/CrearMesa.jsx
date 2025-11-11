// src/pages/CrearMesa.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/CrearMesa.css'; // Importamos los estilos nuevos

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
        // Solo permitimos números y limpiamos errores si el usuario interactúa
        setMesa({
            ...mesa,
            [name]: value // Lo dejamos como string temporalmente para permitir vacíos en el input
        });
        if (error) setError(null);
    };

    const validarFormulario = () => {
        const num = parseInt(mesa.numero);
        const cap = parseInt(mesa.capacidad);

        if (isNaN(num) || num <= 0) {
            setError('El número de mesa debe ser un número entero positivo.');
            return false;
        }

        if (isNaN(cap) || cap < 1 || cap > 20) {
            setError('La capacidad debe ser un número entre 1 y 20.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        setLoading(true);
        setError(null);

        const mesaData = {
            numero: parseInt(mesa.numero),
            capacidad: parseInt(mesa.capacidad)
        };

        try {
            await apiClient.post('/mesas', mesaData);
            
            // Redirigir y pasar el estado para mostrar un mensaje de éxito en la página de gestión
            navigate('/gestion-mesas', {
                state: {
                    mensaje: `¡Mesa ${mesaData.numero} creada exitosamente!`,
                    tipo: 'success'
                }
            });
        } catch (err) {
            if (err.response?.status === 409) {
                setError('Ya existe una mesa con ese número.');
            } else {
                setError('Error al crear la mesa. Intente nuevamente.');
            }
            console.error('Error al crear mesa:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="crear-mesa-container">
            {/* NAVEGACIÓN */}
            <nav className="crear-mesa-nav">
                <Link to="/gestion-mesas" className="back-link">
                    <span className="back-icon">←</span>
                    Volver a Gestión de Mesas
                </Link>
            </nav>

            {/* FORMULARIO */}
            <div className="form-wrapper">
                {/* HEADER */}
                <div className="form-header">
                    <div className="header-content">
                        <div className="header-icon">
                            🍽️
                        </div>
                        <div className="header-text">
                            <h2>Crear Nueva Mesa</h2>
                            <p>Asigna un número y establece la capacidad de la nueva mesa.</p>
                        </div>
                    </div>
                </div>

                {/* FORMULARIO CONTENIDO */}
                <form className="mesa-form" onSubmit={handleSubmit}>
                    
                    {/* MENSAJE DE ERROR */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            <p className="error-text">{error}</p>
                        </div>
                    )}

                    {/* GRUPO DE CAMPOS */}
                    <div className="form-grid single-column">
                        {/* Número de Mesa */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="numero">
                                <span className="label-icon">#️⃣</span>
                                Número de Mesa
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">#️⃣</span>
                                <input
                                    id="numero"
                                    type="number"
                                    name="numero"
                                    className={`form-input ${error && mesa.numero === '' ? 'error' : ''}`}
                                    placeholder="Ej: 5"
                                    value={mesa.numero}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    min="1"
                                    max="999"
                                />
                            </div>
                            <span className="input-hint">Número único para la mesa (ej: 1 a 999)</span>
                        </div>

                        {/* Capacidad */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="capacidad">
                                <span className="label-icon">🧑‍🤝‍🧑</span>
                                Capacidad (personas)
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">🧑‍🤝‍🧑</span>
                                <input
                                    id="capacidad"
                                    type="number"
                                    name="capacidad"
                                    className={`form-input ${error && mesa.capacidad === '' ? 'error' : ''}`}
                                    placeholder="Ej: 4"
                                    value={mesa.capacidad}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    min="1"
                                    max="20"
                                />
                            </div>
                            <span className="input-hint">Máximo de personas que la mesa puede albergar (1-20)</span>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="form-actions single-action">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    <span>Creando...</span>
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">✨</span>
                                    <span>Crear Mesa</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearMesa;