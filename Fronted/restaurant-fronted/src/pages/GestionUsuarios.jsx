// src/pages/GestionUsuarios.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/GestionUsuarios.css';

// Roles definidos en mayúsculas para consistencia con enums de Spring Boot
const ROLES = ['admin', 'mozo', 'cocinero', 'cajero'];

function GestionUsuarios() {
    const [formData, setFormData] = useState({
        nombreUsuario: '',
        contraseña: '',
        rol: ROLES[0],
    });

    const [mensaje, setMensaje] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);

        try {
            const response = await apiClient.post('/usuarios', {
                nombreUsuario: formData.nombreUsuario,
                contraseña: formData.contraseña,
                rol: formData.rol,
            });

            if (response.status === 201) {
                setMensaje({
                    type: 'success',
                    text: `✅ Usuario ${formData.nombreUsuario} creado exitosamente con rol ${formData.rol}.`,
                });
                setFormData({ nombreUsuario: '', contraseña: '', rol: ROLES[0] });
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);

            if (error.response) {
                const { status, data } = error.response;

                if (status === 403) {
                    setMensaje({
                        type: 'error',
                        text: '🚫 Error de autorización (403): No tiene permisos de administrador.',
                    });
                } else if (data?.message) {
                    setMensaje({
                        type: 'error',
                        text: `⚠️ Error ${status}: ${data.message}`,
                    });
                } else {
                    setMensaje({
                        type: 'error',
                        text: `⚠️ Error de servidor (${status}).`,
                    });
                }
            } else if (error.request) {
                setMensaje({
                    type: 'error',
                    text: '🌐 Error de red: No se pudo conectar con el servidor de Spring Boot.',
                });
            } else {
                setMensaje({
                    type: 'error',
                    text: '❗ Ocurrió un error inesperado.',
                });
            }
        }
    };

    return (
        <div className="gestion-usuarios-container">
            <Link to="/dashboard" className="gpv-back">
                &lt; Volver al Dashboard
            </Link>

            <h2>🔐 Gestión de Usuarios (ADMIN)</h2>
            <p>Utilice este formulario para crear nuevos usuarios y asignarles un rol.</p>

            {mensaje && (
                <div
                    className={`mensaje ${mensaje.type}`}
                    style={{
                        padding: '10px',
                        marginBottom: '15px',
                        backgroundColor:
                            mensaje.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: mensaje.type === 'success' ? '#155724' : '#721c24',
                        border: `1px solid ${mensaje.type === 'success' ? '#c3e6cb' : '#f5c6cb'
                            }`,
                        borderRadius: '5px',
                    }}
                >
                    {mensaje.text}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
                <div>
                    <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
                    <input
                        type="text"
                        name="nombreUsuario"
                        value={formData.nombreUsuario}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input
                        type="password"
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="rol">Rol:</label>
                    <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                        }}
                    >
                        {ROLES.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                    }}
                >
                    Crear Usuario
                </button>
            </form>
        </div>
    );
}

export default GestionUsuarios;
