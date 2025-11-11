import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Eliminamos la importación de apiClient ya que el entorno requiere un único archivo
// y simularemos la lógica de la API.

function CrearProveedor() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const [proveedor, setProveedor] = useState({
        nombre: '',
        ruc: '',
        telefono: '',
        correo: '',
        direccion: ''
    });

    // Función para manejar los cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProveedor({ ...proveedor, [name]: value });

        // Limpiar mensajes al cambiar input
        if (error || successMessage) {
            setError(null);
            setSuccessMessage(null);
        }
    };

    // Función para manejar el envío del formulario (simulando la API)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!proveedor.nombre || !proveedor.ruc) {
            setError('El Nombre y el RUC son campos obligatorios.');
            return;
        }

        // Validación simple de RUC (11 dígitos, típico en Perú)
        if (proveedor.ruc.length !== 11 || isNaN(proveedor.ruc)) {
            setError('El RUC debe contener exactamente 11 dígitos numéricos.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Simulación de llamada a API: espera 1 segundo
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulación de respuesta exitosa
            setSuccessMessage(`¡Proveedor "${proveedor.nombre}" registrado con éxito!`);

            // Limpiar formulario
            setProveedor({
                nombre: '',
                ruc: '',
                telefono: '',
                correo: '',
                direccion: ''
            });

            // Redirigir después de un breve delay y pasar el mensaje
            setTimeout(() => {
                navigate('/gestion-proveedores', {
                    state: {
                        mensaje: `🎉 Proveedor "${proveedor.nombre}" registrado exitosamente.`,
                        tipo: 'success'
                    }
                });
            }, 1500);

        } catch (err) {
            // En un caso real, esto capturaría el error de la red
            setError('❌ Error al registrar el proveedor. Intenta nuevamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="proveedor-page-container">
            <nav className="proveedor-nav">
                <Link to="/gestion-proveedores" className="back-link">
                    <span className="back-icon">←</span>
                    Volver a Gestión de Proveedores
                </Link>
            </nav>

            <div className="proveedor-form-card">
                <div className="card-header">
                    <h1>Registrar Nuevo Proveedor</h1>
                    <p>Ingresa la información fiscal y de contacto para el nuevo proveedor.</p>
                </div>

                <form onSubmit={handleSubmit} className="proveedor-form">

                    {/* FEEDBACK DE ESTADO */}
                    {error && (
                        <div className="message error-message">
                            <span className="icon">⚠️</span> {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="message success-message">
                            <span className="icon">✅</span> {successMessage}
                        </div>
                    )}

                    {/* GRUPO DE INPUTS: Nombre y RUC */}
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre / Razón Social <span className="required">*</span></label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={proveedor.nombre}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Ej: Distribuidora de Carnes S.A."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ruc">RUC (11 dígitos) <span className="required">*</span></label>
                            <input
                                id="ruc"
                                type="text"
                                name="ruc"
                                value={proveedor.ruc}
                                onChange={handleChange}
                                required
                                minLength="11"
                                maxLength="11"
                                className="form-input"
                                placeholder="Ej: 20569874100"
                            />
                        </div>
                    </div>

                    {/* GRUPO DE INPUTS: Contacto */}
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono de Contacto</label>
                            <input
                                id="telefono"
                                type="tel"
                                name="telefono"
                                value={proveedor.telefono}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Ej: 987 654 321"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input
                                id="correo"
                                type="email"
                                name="correo"
                                value={proveedor.correo}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Ej: contacto@proveedor.com"
                            />
                        </div>
                    </div>

                    {/* Dirección (Full Width) */}
                    <div className="form-group form-group-full">
                        <label htmlFor="direccion">Dirección Fiscal</label>
                        <textarea
                            id="direccion"
                            name="direccion"
                            value={proveedor.direccion}
                            onChange={handleChange}
                            className="form-input textarea-input"
                            rows="2"
                            placeholder="Dirección completa del proveedor."
                        />
                    </div>

                    {/* BOTÓN DE ENVÍO */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                <span>Guardando Proveedor...</span>
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">💾</span>
                                <span>Registrar Proveedor</span>
                            </>
                        )}
                    </button>

                </form>
            </div>

            {/*
                ==========================================================
                ESTILOS CSS INTEGRADOS
                ==========================================================
            */}
            <style jsx="true">{`
                /* Variables de Color (Paleta Azul/Naranja - Estilos Profesionales) */
                :root {
                    --primary: #1d4ed8; /* Azul primario */
                    --primary-dark: #1e40af;
                    --secondary: #6b7280; /* Gris secundario */
                    --accent-success: #10b981; /* Verde éxito */
                    --danger: #ef4444; /* Rojo error */
                    --danger-bg: #fee2e2; 
                    --bg-main: #f3f4f6; /* Fondo claro */
                    --bg-card: #ffffff;
                    --text-primary: #1f2937;
                    --text-secondary: #6b7280;
                    --border: #e5e7eb;
                    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                /* ========================================
                   LAYOUT GENERAL Y NAVEGACIÓN
                   ======================================== */

                .proveedor-page-container {
                    min-height: 100vh;
                    background-color: var(--bg-main);
                    padding: 30px 20px;
                    font-family: 'Inter', sans-serif;
                }

                .proveedor-nav {
                    margin-bottom: 25px;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                    padding: 8px 15px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .back-link:hover {
                    color: var(--primary);
                    background-color: #eef2ff;
                }

                /* ========================================
                   CARD Y FORMULARIO
                   ======================================== */

                .proveedor-form-card {
                    max-width: 800px;
                    margin: 0 auto;
                    background: var(--bg-card);
                    border-radius: 16px;
                    box-shadow: var(--shadow-md);
                    overflow: hidden;
                }

                .card-header {
                    padding: 30px;
                    border-bottom: 1px solid var(--border);
                    background-color: #eff6ff; /* Azul muy claro */
                }

                .card-header h1 {
                    font-size: 26px;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0 0 5px 0;
                }

                .card-header p {
                    font-size: 15px;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .proveedor-form {
                    padding: 30px;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group-full {
                    grid-column: 1 / -1; 
                }

                label {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 6px;
                    display: block;
                }

                .required {
                    color: var(--danger);
                    font-weight: 700;
                }

                /* Estilo para todos los Inputs y Textareas */
                .form-input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    background: white;
                    font-size: 16px;
                    color: var(--text-primary);
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                    box-sizing: border-box;
                }

                .form-input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1); 
                }

                .textarea-input {
                    resize: vertical;
                    min-height: 80px;
                }

                /* ========================================
                   BOTONES
                   ======================================== */

                .btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    padding: 14px 20px;
                    font-size: 17px;
                    font-weight: 700;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    margin-top: 10px; 
                }

                .btn-primary {
                    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                    color: white;
                    box-shadow: 0 4px 10px rgba(29, 78, 216, 0.4); 
                }

                .btn-primary:hover:not(:disabled) {
                    background: var(--primary-dark);
                    box-shadow: 0 6px 15px rgba(29, 78, 216, 0.6); 
                    transform: translateY(-1px);
                }

                .btn-primary:disabled {
                    background: #93c5fd; /* Azul claro para deshabilitado */
                    cursor: not-allowed;
                    box-shadow: none;
                }

                /* ========================================
                   FEEDBACK Y CARGA (Loading/Error)
                   ======================================== */

                .message {
                    padding: 12px 18px;
                    margin-bottom: 20px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    font-size: 15px;
                    font-weight: 600;
                    gap: 10px;
                }

                .error-message {
                    background: var(--danger-bg);
                    border: 1px solid var(--danger);
                    color: var(--danger);
                }

                .success-message {
                    background: #d1fae5;
                    border: 1px solid var(--accent-success);
                    color: #065f46;
                }

                /* Spinner (para el estado de carga) */
                .spinner {
                    width: 18px;
                    height: 18px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin-right: 5px;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* ========================================
                   RESPONSIVE
                   ======================================== */

                @media (max-width: 700px) {
                    .proveedor-page-container {
                        padding: 20px 10px;
                    }

                    .proveedor-form-card {
                        margin: 0;
                    }

                    .card-header, .proveedor-form {
                        padding: 20px;
                    }

                    .card-header h1 {
                        font-size: 22px;
                    }

                    .form-grid {
                        grid-template-columns: 1fr; 
                    }
                }
            `}</style>
        </div>
    );
}

export default CrearProveedor;