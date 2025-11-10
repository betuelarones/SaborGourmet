// src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- ¡¡IMPORTA ESTO!!

const API_URL = "http://localhost:8080/api/auth/login";

function Login() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // <-- ¡¡AÑADE ESTA LÍNEA!!

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(API_URL, {
                nombreUsuario: nombreUsuario,
                contraseña: contraseña
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            // ---
            // ¡¡ESTE ES EL CAMBIO!!
            // ---
            // alert('¡Login exitoso!'); // Ya no necesitamos la alerta
            navigate('/dashboard'); // Redirige al Dashboard
            // ---

        } catch (err) {
            setError('Usuario o contraseña incorrectos.');
            console.error(err);
        }
    };

    // ... (El resto de tu 'return' no cambia)
    return (
        <div style={{ padding: '20px' }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                {/* ... (Tu formulario) ... */}
                <div>
                    <label>Usuario: </label>
                    <input
                        type="text"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label>Contraseña: </label>
                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" style={{ marginTop: '20px' }}>
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;