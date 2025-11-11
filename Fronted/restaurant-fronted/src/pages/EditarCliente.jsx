import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// Eliminamos la importación de apiClient y simulamos la lógica de la API.

function EditarCliente() {
    const { idCliente } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true); // Para la carga inicial
    const [successMessage, setSuccessMessage] = useState(null);

    // MOCK DATA DE CLIENTES para simular la carga inicial
    const mockClientes = {
        '1': { nombres: 'Ana', apellidos: 'Pérez García', dni: '12345678', telefono: '987654321', correo: 'ana.perez@ejemplo.com', estado: true },
        '2': { nombres: 'Juan', apellidos: 'López Martinez', dni: '87654321', telefono: '999888777', correo: 'juan.lopez@ejemplo.com', estado: false },
        '3': { nombres: 'Carlos', apellidos: 'Ramos Díaz', dni: '45678901', telefono: '900111222', correo: 'carlos.ramos@ejemplo.com', estado: true },
    };

    const [cliente, setCliente] = useState({
        nombres: '',
        apellidos: '',
        dni: '',
        telefono: '',
        correo: '',
        estado: true
    });

    // ===================================
    // 1. LÓGICA DE CARGA INICIAL (FETCH)
    // ===================================
    useEffect(() => {
        const fetchCliente = async () => {
            setIsFetching(true);
            setError(null);

            // Simulación de espera de red
            await new Promise(resolve => setTimeout(resolve, 800));

            const mockCliente = mockClientes[idCliente];

            if (mockCliente) {
                setCliente(mockCliente);
                setIsFetching(false);
            } else {
                setError(`Cliente con ID ${idCliente} no encontrado.`);
                setIsFetching(false);
            }
        };

        fetchCliente();
    }, [idCliente]);

    // ===================================
    // 2. LÓGICA DE MANEJO DE FORMULARIO
    // ===================================
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Maneja el checkbox de 'estado' (booleano) y otros campos (string)
        const val = type === 'checkbox' ? checked : value;

        setCliente(prevCliente => ({ ...prevCliente, [name]: val }));

        // Limpiar mensajes al cambiar input
        if (error || successMessage) {
            setError(null);
            setSuccessMessage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cliente.dni.length !== 8 || isNaN(cliente.dni)) {
            setError('El DNI debe contener exactamente 8 dígitos numéricos.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Simulación de llamada PUT a API
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Aquí se enviaría el objeto 'cliente' al backend
            console.log("Cliente actualizado (Simulado):", cliente);

            setSuccessMessage(`¡Cliente ${cliente.nombres} actualizado con éxito!`);

            // Redirigir después de un breve delay
            setTimeout(() => {
                navigate('/gestion-clientes', {
                    state: {
                        mensaje: `📝 Cliente "${cliente.nombres} ${cliente.apellidos}" actualizado correctamente.`,
                        tipo: 'success'
                    }
                });
            }, 1500);

        } catch (err) {
            setError('❌ Error al actualizar el cliente. Intenta nuevamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ===================================
    // 3. RENDERIZADO
    // ===================================

    if (isFetching) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="loading-state">Cargando datos del cliente...</div>
            </div>
        );
    }

    if (error && !cliente.nombres) {
        return (
            <div className="cliente-page-container">
                <nav className="cliente-nav">
                    <Link to="/gestion-clientes" className="back-link">
                        <span className="back-icon">←</span>
                        Volver a Gestión de Clientes
                    </Link>
                </nav>
                <div className="error-message max-w-lg mx-auto mt-10">
                    <span className="icon">⚠️</span> {error}
                </div>
            </div>
        );
    }


    return (
        <div className="cliente-page-container">
            <nav className="cliente-nav">
                <Link to="/gestion-clientes" className="back-link">
                    <span className="back-icon">←</span>
                    Volver a Gestión de Clientes
                </Link>
            </nav>

            <div className="cliente-form-card">
                <div className="card-header">
                    <h1>Editar Cliente (ID: {idCliente})</h1>
                    <p>Modifica la información de contacto y estado del cliente.</p>
                </div>

                <form onSubmit={handleSubmit} className="cliente-form">

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

                    {/* GRUPO DE INPUTS */}
                    <div className="form-grid">

                        {/* Nombres */}
                        <div className="form-group">
                            <label htmlFor="nombres">Nombres <span className="required">*</span></label>
                            <input
                                id="nombres"
                                type="text"
                                name="nombres"
                                value={cliente.nombres}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Ej: Ana María"
                            />
                        </div>

                        {/* Apellidos */}
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos <span className="required">*</span></label>
                            <input
                                id="apellidos"
                                type="text"
                                name="apellidos"
                                value={cliente.apellidos}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Ej: Pérez García"
                            />
                        </div>

                        {/* DNI */}
                        <div className="form-group">
                            <label htmlFor="dni">DNI (8 dígitos) <span className="required">*</span></label>
                            <input
                                id="dni"
                                type="text"
                                name="dni"
                                value={cliente.dni}
                                onChange={handleChange}
                                required
                                minLength="8"
                                maxLength="8"
                                className="form-input"
                                placeholder="Ej: 12345678"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                id="telefono"
                                type="tel"
                                name="telefono"
                                value={cliente.telefono}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Ej: 987 654 321"
                            />
                        </div>

                        {/* Correo */}
                        <div className="form-group form-group-full">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input
                                id="correo"
                                type="email"
                                name="correo"
                                value={cliente.correo}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Ej: ana.perez@ejemplo.com"
                            />
                        </div>
                    </div>

                    {/* Estado del Cliente (Checkbox) */}
                    <div className="form-group form-group-full checkbox-group">
                        <input
                            id="estado"
                            type="checkbox"
                            name="estado"
                            checked={cliente.estado}
                            onChange={handleChange}
                            className="checkbox-input"
                        />
                        <label htmlFor="estado" className="checkbox-label">
                            {cliente.estado ? 'Cliente Activo (Puede realizar pedidos)' : 'Cliente Inactivo (Acceso restringido)'}
                        </label>
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
                                <span>Actualizando Cliente...</span>
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">💾</span>
                                <span>Guardar Cambios</span>
                            </>
                        )}
                    </button>

                </form>
            </div>

            {/*
                ==========================================================
                ESTILOS CSS SEPARADO (Integrado en el archivo único)
                ==========================================================
            */}
            <style jsx="true">{`
                /* Variables de Color (Paleta Verde/Azul) */
                :root {
                    --primary: #059669; /* Verde esmeralda */
                    --primary-dark: #047857;
                    --secondary: #6b7280; /* Gris secundario */
                    --accent-success: #10b981; 
                    --danger: #ef4444; /* Rojo error */
                    --danger-bg: #fee2e2; 
                    --bg-main: #f9fafb; 
                    --bg-card: #ffffff;
                    --text-primary: #111827;
                    --text-secondary: #6b7280;
                    --border: #e5e7eb;
                    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                /* ========================================
                   LAYOUT GENERAL Y NAVEGACIÓN
                   ======================================== */

                .cliente-page-container {
                    min-height: 100vh;
                    background-color: var(--bg-main);
                    padding: 30px 20px;
                    font-family: 'Inter', sans-serif;
                }

                .cliente-nav {
                    margin-bottom: 25px;
                    max-width: 750px;
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
                    background-color: #ecfdf5; /* Fondo sutil al hacer hover */
                }

                /* ========================================
                   CARD Y FORMULARIO
                   ======================================== */

                .cliente-form-card {
                    max-width: 750px;
                    margin: 0 auto;
                    background: var(--bg-card);
                    border-radius: 16px;
                    box-shadow: var(--shadow-md);
                    overflow: hidden;
                }

                .card-header {
                    padding: 30px;
                    border-bottom: 1px solid var(--border);
                    background-color: #f0fdf4; /* Verde muy claro */
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

                .cliente-form {
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

                /* Estilo para todos los Inputs */
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
                    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1); 
                }

                /* Checkbox Group */
                .checkbox-group {
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
                    margin-top: 5px;
                    margin-bottom: 25px;
                }
                .checkbox-input {
                    width: 20px;
                    height: 20px;
                    accent-color: var(--primary); /* Color del checkbox al marcar */
                }
                .checkbox-label {
                    margin-bottom: 0;
                    font-weight: 500;
                    color: var(--text-secondary);
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
                    box-shadow: 0 4px 10px rgba(5, 150, 105, 0.4); 
                }

                .btn-primary:hover:not(:disabled) {
                    background: var(--primary-dark);
                    box-shadow: 0 6px 15px rgba(5, 150, 105, 0.6); 
                    transform: translateY(-1px);
                }

                .btn-primary:disabled {
                    background: #a7f3d0; /* Verde claro para deshabilitado */
                    cursor: not-allowed;
                    box-shadow: none;
                }

                /* ========================================
                   FEEDBACK Y CARGA (Loading/Error)
                   ======================================== */

                .loading-state {
                    font-size: 1.25rem;
                    color: var(--primary);
                    font-weight: 600;
                }

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

                @media (max-width: 600px) {
                    .cliente-page-container {
                        padding: 20px 10px;
                    }

                    .cliente-form-card {
                        margin: 0;
                    }

                    .card-header, .cliente-form {
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

export default EditarCliente;