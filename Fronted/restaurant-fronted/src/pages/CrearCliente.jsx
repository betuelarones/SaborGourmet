// src/pages/CrearCliente.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/CrearCliente.css';

function CrearCliente() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cliente, setCliente] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        telefono: '',
        correo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
        // Limpiar error cuando el usuario empieza a escribir
        if (error) setError(null);
    };

    const validarFormulario = () => {
        // Validar DNI (8 dígitos)
        if (cliente.dni && !/^\d{8}$/.test(cliente.dni)) {
            setError('El DNI debe tener exactamente 8 dígitos numéricos.');
            return false;
        }

        // Validar teléfono (9 dígitos, opcional)
        if (cliente.telefono && !/^\d{9}$/.test(cliente.telefono)) {
            setError('El teléfono debe tener exactamente 9 dígitos numéricos.');
            return false;
        }

        // Validar correo (opcional pero debe ser válido si se proporciona)
        if (cliente.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.correo)) {
            setError('Por favor ingresa un correo electrónico válido.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar antes de enviar
        if (!validarFormulario()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await apiClient.post('/clientes', cliente);
            
            // Mostrar mensaje de éxito y redirigir
            setTimeout(() => {
                navigate('/gestion-clientes', { 
                    state: { 
                        mensaje: '¡Cliente creado exitosamente!',
                        tipo: 'success' 
                    }
                });
            }, 500);
            
        } catch (err) {
            if (err.response?.status === 409) {
                setError('Ya existe un cliente con ese DNI.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Error al crear el cliente. Por favor intenta nuevamente.');
            }
            console.error('Error al crear cliente:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCliente({
            nombres: '',
            apellidos: '',
            dni: '',
            telefono: '',
            correo: ''
        });
        setError(null);
    };

    return (
        <div className="crear-cliente-container">
            {/* NAVEGACIÓN */}
            <nav className="crear-cliente-nav">
                <Link to="/gestion-clientes" className="back-link">
                    <span className="back-icon">←</span>
                    Volver a Gestión de Clientes
                </Link>
            </nav>

            {/* FORMULARIO */}
            <div className="form-wrapper">
                {/* HEADER */}
                <div className="form-header">
                    <div className="header-content">
                        <div className="header-icon">
                            👤
                        </div>
                        <div className="header-text">
                            <h2>Crear Nuevo Cliente</h2>
                            <p>Completa los datos del cliente para registrarlo en el sistema</p>
                        </div>
                    </div>
                </div>

                {/* FORMULARIO */}
                <form className="cliente-form" onSubmit={handleSubmit}>
                    {/* INFO DE CAMPOS REQUERIDOS */}
                    <div className="required-legend">
                        <span className="required-mark">*</span>
                        Campos obligatorios
                    </div>

                    {/* INFORMACIÓN ADICIONAL */}
                    <div className="form-info">
                        <span className="info-icon">💡</span>
                        <div className="info-content">
                            <p className="info-title">Información importante:</p>
                            <ul className="info-list">
                                <li>El DNI debe ser único y tener 8 dígitos</li>
                                <li>El teléfono debe tener 9 dígitos</li>
                                <li>Los campos de teléfono y correo son opcionales</li>
                            </ul>
                        </div>
                    </div>

                    {/* MENSAJE DE ERROR */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            <p className="error-text">{error}</p>
                        </div>
                    )}

                    {/* GRID DE CAMPOS */}
                    <div className="form-grid">
                        {/* Nombres */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">👤</span>
                                Nombres
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    name="nombres"
                                    className="form-input"
                                    placeholder="Ej: Juan Carlos"
                                    value={cliente.nombres}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    maxLength={100}
                                    autoComplete="given-name"
                                />
                            </div>
                        </div>

                        {/* Apellidos */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">👤</span>
                                Apellidos
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    name="apellidos"
                                    className="form-input"
                                    placeholder="Ej: Pérez García"
                                    value={cliente.apellidos}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    maxLength={100}
                                    autoComplete="family-name"
                                />
                            </div>
                        </div>

                        {/* DNI */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">🪪</span>
                                DNI
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">🪪</span>
                                <input
                                    type="text"
                                    name="dni"
                                    className="form-input"
                                    placeholder="Ej: 12345678"
                                    value={cliente.dni}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    maxLength={8}
                                    pattern="\d{8}"
                                    autoComplete="off"
                                />
                            </div>
                            <span className="input-hint">Debe contener exactamente 8 dígitos</span>
                        </div>

                        {/* Teléfono */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">📱</span>
                                Teléfono
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">📱</span>
                                <input
                                    type="tel"
                                    name="telefono"
                                    className="form-input"
                                    placeholder="Ej: 987654321"
                                    value={cliente.telefono}
                                    onChange={handleChange}
                                    disabled={loading}
                                    maxLength={9}
                                    pattern="\d{9}"
                                    autoComplete="tel"
                                />
                            </div>
                            <span className="input-hint">Opcional - 9 dígitos</span>
                        </div>

                        {/* Correo */}
                        <div className="form-group full-width">
                            <label className="form-label">
                                <span className="label-icon">📧</span>
                                Correo Electrónico
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">📧</span>
                                <input
                                    type="email"
                                    name="correo"
                                    className="form-input"
                                    placeholder="Ej: cliente@ejemplo.com"
                                    value={cliente.correo}
                                    onChange={handleChange}
                                    disabled={loading}
                                    maxLength={100}
                                    autoComplete="email"
                                />
                            </div>
                            <span className="input-hint">Opcional</span>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={handleReset}
                            disabled={loading}
                        >
                            <span className="btn-icon">🔄</span>
                            Limpiar Formulario
                        </button>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    <span>Guardando...</span>
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">💾</span>
                                    <span>Guardar Cliente</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearCliente;