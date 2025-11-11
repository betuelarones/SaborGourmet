import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Nota: Se ha eliminado la importación comentada de apiClient que no era utilizada.

function CrearPlato() {
    const navigate = useNavigate();

    // Estados para feedback
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    // Estado para guardar los datos del formulario
    const [plato, setPlato] = useState({
        nombre: '',
        descripcion: '',
        precio: 0.0,
        tipo: 'Fondo',
        estado: 'activo'
    });

    const tiposPlato = ['Fondo', 'Entrada', 'Bebida', 'Postre', 'Adicional'];
    const estadosPlato = [
        { value: 'activo', label: 'Activo (Disponible)' },
        { value: 'inactivo', label: 'Inactivo (No disponible)' }
    ];

    // Función que actualiza el estado cada vez que escribes
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        let newValue = value;
        if (name === 'precio' && type === 'number') {
            newValue = value;
        }

        setPlato(prevPlato => ({
            ...prevPlato,
            [name]: newValue
        }));

        if (error || successMessage) {
            setError(null);
            setSuccessMessage(null);
        }
    };

    // Función que se llama al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!plato.nombre || parseFloat(plato.precio) <= 0) {
            setError('El nombre y el precio deben ser válidos (precio > 0).');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Simulación de llamada a API (Mantiene el mismo comportamiento de espera)
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            
            const datosPlato = {
                ...plato,
                precio: parseFloat(plato.precio)
            };

            // Simulación de respuesta exitosa
            setSuccessMessage(`¡Plato "${plato.nombre}" creado con éxito!`);

            setPlato({
                nombre: '',
                descripcion: '',
                precio: 0.0,
                tipo: 'Fondo',
                estado: 'activo'
            });

            // Redirigir después de un breve delay
            setTimeout(() => {
                navigate('/gestion-platos', {
                    state: {
                        mensaje: `🎉 Plato "${datosPlato.nombre}" creado exitosamente.`,
                        tipo: 'success'
                    }
                });
            }, 1500);


        } catch (err) {
            setError('❌ Error al crear el plato. La API de simulación falló.'); 
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="plato-page-container">
            <nav className="plato-nav">
                <Link to="/gestion-platos" className="back-link">
                    <span className="back-icon">←</span>
                    Volver a Gestión de Platos
                </Link>
            </nav>

            <div className="plato-form-card">
                <div className="card-header">
                    <h1>Crear Nuevo Plato en el Menú</h1>
                    <p>Completa la información del nuevo ítem para que esté disponible para los pedidos.</p>
                </div>

                <form onSubmit={handleSubmit} className="plato-form">

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

                        {/* 1. Nombre */}
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre del Plato <span className="required">*</span></label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={plato.nombre}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Ej: Lomo Saltado Especial"
                            />
                        </div>

                        {/* 2. Precio */}
                        <div className="form-group">
                            <label htmlFor="precio">Precio (S/.) <span className="required">*</span></label>
                            <input
                                id="precio"
                                type="number"
                                name="precio"
                                step="0.01"
                                min="0.01"
                                value={plato.precio}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Ej: 35.50"
                            />
                        </div>

                        {/* 3. Tipo */}
                        <div className="form-group">
                            <label htmlFor="tipo">Categoría (Tipo)</label>
                            <select
                                id="tipo"
                                name="tipo"
                                value={plato.tipo}
                                onChange={handleChange}
                                className="form-select"
                            >
                                {tiposPlato.map(tipo => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                        </div>

                        {/* 4. Estado */}
                        <div className="form-group">
                            <label htmlFor="estado">Estado de Disponibilidad</label>
                            <select
                                id="estado"
                                name="estado"
                                value={plato.estado}
                                onChange={handleChange}
                                className="form-select"
                            >
                                {estadosPlato.map(estado => (
                                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 5. Descripción (Full Width) */}
                    <div className="form-group form-group-full">
                        <label htmlFor="descripcion">Descripción Breve</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={plato.descripcion}
                            onChange={handleChange}
                            className="form-input textarea-input"
                            rows="3"
                            placeholder="Brevemente describe los ingredientes o características del plato."
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
                                <span>Guardando Plato...</span>
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">➕</span>
                                <span>Registrar Nuevo Plato</span>
                            </>
                        )}
                    </button>

                </form>
            </div>

            {/*
                ==========================================================
                ESTILOS CSS INTEGRADOS (Para cumplir con el requisito de 
                archivo único y evitar errores de importación)
                ==========================================================
            */}
            <style jsx="true">{`
                /* Variables de Color (Paleta Naranja Cálido) */
                :root {
                    --primary: #d97706; /* Naranja cálido */
                    --primary-dark: #b45309;
                    --secondary: #1f2937; /* Gris oscuro */
                    --accent-success: #10b981; /* Verde éxito */
                    --danger: #ef4444; /* Rojo */
                    --danger-bg: #fee2e2; /* Fondo sutil para errores */
                    --bg-main: #f9fafb; /* Fondo muy claro */
                    --bg-card: #ffffff;
                    --text-primary: #111827;
                    --text-secondary: #6b7280;
                    --border: #e5e7eb;
                    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                /* ========================================
                   LAYOUT GENERAL Y NAVEGACIÓN
                   ======================================== */

                .plato-page-container {
                    min-height: 100vh;
                    background-color: var(--bg-main);
                    padding: 30px 20px;
                    font-family: 'Inter', sans-serif; /* Aplicamos la fuente aquí */
                }

                .plato-nav {
                    margin-bottom: 25px;
                    max-width: 700px;
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
                }

                /* ========================================
                   CARD Y FORMULARIO
                   ======================================== */

                .plato-form-card {
                    max-width: 700px;
                    margin: 0 auto;
                    background: var(--bg-card);
                    border-radius: 16px;
                    box-shadow: var(--shadow-md);
                    overflow: hidden;
                }

                .card-header {
                    padding: 30px;
                    border-bottom: 1px solid var(--border);
                    background-color: #fff7ed; 
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

                .plato-form {
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
                    color: var(--primary);
                    font-weight: 700;
                }

                /* Estilo para todos los Inputs y Selects */
                .form-input, .form-select {
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

                .form-input:focus, .form-select:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1); 
                }

                .textarea-input {
                    resize: vertical;
                    min-height: 100px;
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
                }

                .btn-primary {
                    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                    color: white;
                    box-shadow: 0 4px 10px rgba(217, 119, 6, 0.4); 
                }

                .btn-primary:hover:not(:disabled) {
                    background: var(--primary-dark);
                    box-shadow: 0 6px 15px rgba(217, 119, 6, 0.6); 
                    transform: translateY(-1px);
                }

                .btn-primary:disabled {
                    background: #fed7aa; 
                    cursor: not-allowed;
                    box-shadow: none;
                }

                .btn-icon {
                    font-size: 20px;
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

                @media (max-width: 600px) {
                    .plato-page-container {
                        padding: 20px 10px;
                    }

                    .plato-form-card {
                        margin: 0;
                    }

                    .card-header, .plato-form {
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

export default CrearPlato;