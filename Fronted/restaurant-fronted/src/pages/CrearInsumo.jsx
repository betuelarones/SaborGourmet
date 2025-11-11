// src/pages/CrearInsumo.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/CrearInsumo.css';

function CrearInsumo() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [insumo, setInsumo] = useState({
        nombre: '',
        unidadMedida: 'kg',
        stock: 0.0,
        stockMinimo: 1.0,
        precioCompra: 0.0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsumo({ ...insumo, [name]: value });
        // Limpiar error cuando el usuario empieza a escribir
        if (error) setError(null);
    };

    const validarFormulario = () => {
        // Validar que los números sean positivos
        if (parseFloat(insumo.stock) < 0) {
            setError('El stock inicial no puede ser negativo.');
            return false;
        }

        if (parseFloat(insumo.stockMinimo) <= 0) {
            setError('El stock mínimo debe ser mayor a 0.');
            return false;
        }

        if (parseFloat(insumo.precioCompra) < 0) {
            setError('El precio de compra no puede ser negativo.');
            return false;
        }

        // Validar que el nombre no esté vacío
        if (!insumo.nombre.trim()) {
            setError('El nombre del insumo es obligatorio.');
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
            // Convertimos a números antes de enviar
            const datosInsumo = {
                ...insumo,
                stock: parseFloat(insumo.stock),
                stockMinimo: parseFloat(insumo.stockMinimo),
                precioCompra: parseFloat(insumo.precioCompra)
            };

            await apiClient.post('/insumos', datosInsumo);
            
            // Mensaje de éxito y redirigir
            setTimeout(() => {
                navigate('/gestion-insumos', {
                    state: {
                        mensaje: '¡Insumo creado exitosamente!',
                        tipo: 'success'
                    }
                });
            }, 500);

        } catch (err) {
            if (err.response?.status === 409) {
                setError('Ya existe un insumo con ese nombre.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Error al crear el insumo. Por favor intenta nuevamente.');
            }
            console.error('Error al crear insumo:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setInsumo({
            nombre: '',
            unidadMedida: 'kg',
            stock: 0.0,
            stockMinimo: 1.0,
            precioCompra: 0.0
        });
        setError(null);
    };

    // Verificar si el stock inicial es menor que el mínimo
    const stockBajo = parseFloat(insumo.stock) > 0 && 
                      parseFloat(insumo.stock) < parseFloat(insumo.stockMinimo);

    return (
        <div className="crear-insumo-container">
            {/* NAVEGACIÓN */}
            <nav className="crear-insumo-nav">
                <Link to="/gestion-insumos" className="back-link">
                    <span className="back-icon">←</span>
                    Volver a Gestión de Insumos
                </Link>
            </nav>

            {/* FORMULARIO */}
            <div className="form-wrapper">
                {/* HEADER */}
                <div className="form-header">
                    <div className="header-content">
                        <div className="header-icon">
                            📦
                        </div>
                        <div className="header-text">
                            <h2>Crear Nuevo Insumo</h2>
                            <p>Registra un nuevo producto en el inventario del restaurante</p>
                        </div>
                    </div>
                </div>

                {/* FORMULARIO */}
                <form className="insumo-form" onSubmit={handleSubmit}>
                    {/* LEYENDA DE CAMPOS REQUERIDOS */}
                    <div className="required-legend">
                        <span className="required-mark">*</span>
                        Campos obligatorios
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="form-info">
                        <span className="info-icon">💡</span>
                        <div className="info-content">
                            <p className="info-title">Información importante:</p>
                            <ul className="info-list">
                                <li>El stock mínimo activa alertas cuando el inventario está bajo</li>
                                <li>El precio de compra es el costo promedio del insumo</li>
                                <li>Puedes modificar estos valores después de crear el insumo</li>
                            </ul>
                        </div>
                    </div>

                    {/* ALERTA DE STOCK BAJO */}
                    {stockBajo && (
                        <div className="stock-alert">
                            <span className="stock-alert-icon">⚠️</span>
                            <p className="stock-alert-text">
                                Atención: El stock inicial ({insumo.stock}) es menor que el stock mínimo ({insumo.stockMinimo}). 
                                El insumo aparecerá en alertas inmediatamente.
                            </p>
                        </div>
                    )}

                    {/* MENSAJE DE ERROR */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            <p className="error-text">{error}</p>
                        </div>
                    )}

                    {/* GRID DE CAMPOS */}
                    <div className="form-grid">
                        {/* Nombre del Insumo */}
                        <div className="form-group full-width">
                            <label className="form-label">
                                <span className="label-icon">📦</span>
                                Nombre del Insumo
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">📦</span>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-input"
                                    placeholder="Ej: Arroz Blanco, Aceite Vegetal, Tomate"
                                    value={insumo.nombre}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    maxLength={100}
                                    autoComplete="off"
                                />
                            </div>
                            <span className="input-hint">
                                <span className="hint-icon">ℹ️</span>
                                Nombre descriptivo del producto
                            </span>
                        </div>

                        {/* Unidad de Medida */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">⚖️</span>
                                Unidad de Medida
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">⚖️</span>
                                <select
                                    name="unidadMedida"
                                    className="form-select"
                                    value={insumo.unidadMedida}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                >
                                    <option value="kg">Kilogramos (kg)</option>
                                    <option value="g">Gramos (g)</option>
                                    <option value="lt">Litros (lt)</option>
                                    <option value="ml">Mililitros (ml)</option>
                                    <option value="un">Unidades (un)</option>
                                    <option value="caja">Cajas</option>
                                    <option value="paquete">Paquetes</option>
                                </select>
                            </div>
                            <span className="input-hint">
                                <span className="hint-icon">ℹ️</span>
                                Cómo se medirá el insumo
                            </span>
                        </div>

                        {/* Precio de Compra */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">💰</span>
                                Precio de Compra
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">💰</span>
                                <input
                                    type="number"
                                    name="precioCompra"
                                    className="form-input"
                                    placeholder="0.00"
                                    value={insumo.precioCompra}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    disabled={loading}
                                />
                            </div>
                            <span className="input-hint">
                                <span className="hint-icon">ℹ️</span>
                                Costo promedio por unidad (S/.)
                            </span>
                        </div>

                        {/* Stock Inicial */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">📊</span>
                                Stock Inicial
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-with-unit">
                                <div className="input-wrapper" style={{flex: 1}}>
                                    <span className="input-icon">📊</span>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-input"
                                        placeholder="0.00"
                                        value={insumo.stock}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <span className="unit-badge">{insumo.unidadMedida}</span>
                            </div>
                            <span className="input-hint">
                                <span className="hint-icon">ℹ️</span>
                                Cantidad actual en inventario
                            </span>
                        </div>

                        {/* Stock Mínimo */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">⚠️</span>
                                Stock Mínimo
                                <span className="required-mark">*</span>
                            </label>
                            <div className="input-with-unit">
                                <div className="input-wrapper" style={{flex: 1}}>
                                    <span className="input-icon">⚠️</span>
                                    <input
                                        type="number"
                                        name="stockMinimo"
                                        className="form-input"
                                        placeholder="1.00"
                                        value={insumo.stockMinimo}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0.01"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <span className="unit-badge">{insumo.unidadMedida}</span>
                            </div>
                            <span className="input-hint">
                                <span className="hint-icon">ℹ️</span>
                                Nivel que activa alertas de stock bajo
                            </span>
                        </div>
                    </div>

                    {/* PREVIEW DE DATOS */}
                    <div className="data-preview">
                        <div className="preview-title">
                            <span>👁️</span>
                            Vista Previa del Insumo
                        </div>
                        <div className="preview-grid">
                            <div className="preview-item">
                                <span className="preview-label">Nombre:</span>
                                <span className="preview-value">
                                    {insumo.nombre || '(Sin nombre)'}
                                </span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Unidad:</span>
                                <span className="preview-value">{insumo.unidadMedida}</span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Stock Inicial:</span>
                                <span className="preview-value">
                                    {insumo.stock} {insumo.unidadMedida}
                                </span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Stock Mínimo:</span>
                                <span className="preview-value">
                                    {insumo.stockMinimo} {insumo.unidadMedida}
                                </span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Precio:</span>
                                <span className="preview-value">
                                    S/. {parseFloat(insumo.precioCompra || 0).toFixed(2)}
                                </span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Valor Total:</span>
                                <span className="preview-value">
                                    S/. {(parseFloat(insumo.stock || 0) * parseFloat(insumo.precioCompra || 0)).toFixed(2)}
                                </span>
                            </div>
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
                                    <span>Guardar Insumo</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearInsumo;