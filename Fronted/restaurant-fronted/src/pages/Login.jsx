// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const API_URL = "http://localhost:8080/api/auth/login";

function Login() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(API_URL, {
                nombreUsuario: nombreUsuario,
                contraseña: contraseña
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            // Pequeño delay para mostrar el estado de éxito
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);

        } catch (err) {
            setIsLoading(false);
            if (err.response) {
                // Error del servidor
                setError(err.response.data.message || 'Usuario o contraseña incorrectos.');
            } else if (err.request) {
                // Error de red
                setError('No se pudo conectar con el servidor. Verifica tu conexión.');
            } else {
                // Otro error
                setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
            }
            console.error('Error de login:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* HEADER */}
                <div className="login-header">
                    <div className="login-logo">
                        🍽️
                    </div>
                    <h2 className="login-title">Bienvenido</h2>
                    <p className="login-subtitle">
                        Ingresa tus credenciales para acceder al sistema
                    </p>
                </div>

                {/* FORMULARIO */}
                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Usuario */}
                    <div className="form-group">
                        <label className="form-label">
                            <span className="label-icon">👤</span>
                            Usuario
                        </label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Ingresa tu usuario"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="form-group">
                        <label className="form-label">
                            <span className="label-icon">🔒</span>
                            Contraseña
                        </label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Ingresa tu contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {/* Mensaje de Error */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            <p className="error-text">{error}</p>
                        </div>
                    )}

                    {/* Botón de Login */}
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                <span>Verificando...</span>
                            </>
                        ) : (
                            <>
                                <span className="button-icon">🚀</span>
                                <span>Iniciar Sesión</span>
                            </>
                        )}
                    </button>
                </form>

                {/* FOOTER */}
                <div className="login-footer">
                    <p className="footer-text">
                        Sistema de Gestión de Restaurante
                    </p>
                    <div className="footer-brand">
                        <span>🍽️</span>
                        <span>Mi Restaurante</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;