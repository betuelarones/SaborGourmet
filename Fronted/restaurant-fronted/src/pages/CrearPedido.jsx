// src/pages/CrearPedido.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/CrearPedido.css'; // Importamos los estilos nuevos

function CrearPedido() {
    const { idMesa } = useParams();
    const navigate = useNavigate();

    // Estados de datos
    const [platos, setPlatos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados del Pedido
    const [idCliente, setIdCliente] = useState('');
    const [carrito, setCarrito] = useState([]); // { idPlato, nombre, precio, cantidad }

    // --- PASO 1: Cargar Datos Iniciales (Platos y Clientes) ---
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resPlatos, resClientes] = await Promise.all([
                    apiClient.get('/platos'),
                    apiClient.get('/clientes')
                ]);
                // Aseguramos que los platos tengan el formato correcto, incluyendo el precio
                setPlatos(resPlatos.data); 
                setClientes(resClientes.data);
            } catch (err) {
                setError('No se pudieron cargar los datos (platos o clientes). Por favor, revisa la conexión.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    // --- PASO 2: Lógica del Carrito ---
    
    // Función central para manejar la cantidad de un plato
    const updatePlatoCantidad = (platoAñadir, delta) => {
        setError(null); // Limpiar errores al interactuar

        setCarrito(prevCarrito => {
            const platoExistenteIndex = prevCarrito.findIndex(item => item.idPlato === platoAñadir.idPlato);
            
            if (platoExistenteIndex >= 0) {
                // Plato existe: modificar cantidad
                const newCantidad = prevCarrito[platoExistenteIndex].cantidad + delta;
                
                if (newCantidad <= 0) {
                    // Si la cantidad llega a 0 o menos, eliminar del carrito
                    return prevCarrito.filter(item => item.idPlato !== platoAñadir.idPlato);
                } else {
                    // Aumentar/disminuir la cantidad
                    return prevCarrito.map((item, index) => 
                        index === platoExistenteIndex ? { ...item, cantidad: newCantidad } : item
                    );
                }
            } else if (delta > 0) {
                // Plato no existe y se está agregando
                return [...prevCarrito, { 
                    idPlato: platoAñadir.idPlato, 
                    nombre: platoAñadir.nombre, 
                    precio: platoAñadir.precio, // Incluir precio para cálculo
                    cantidad: 1 
                }];
            }
            return prevCarrito; // No hacer nada si se intenta decrementar un plato que no existe
        });
    };

    const totalPedido = useMemo(() => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }, [carrito]);


    // --- PASO 3: Enviar Pedido ---
    const handleSubmitPedido = async () => {
        if (carrito.length === 0) {
            setError('⚠️ Debes agregar al menos un plato al pedido antes de registrarlo.');
            return;
        }

        setLoading(true);

        // 1. Formatear el carrito a DTO (solo idPlato y cantidad)
        const detallesDTO = carrito.map(item => ({
            idPlato: item.idPlato,
            cantidad: item.cantidad
        }));

        // 2. Crear el DTO
        const pedidoRequestDTO = {
            idMesa: parseInt(idMesa),
            idCliente: idCliente ? parseInt(idCliente) : null,
            detalles: detallesDTO
        };

        try {
            // 3. Llamada al backend
            await apiClient.post('/pedidos', pedidoRequestDTO);

            // Redirigir y mostrar mensaje de éxito
            navigate('/mesas', {
                state: {
                    mensaje: `🎉 ¡Pedido registrado exitosamente para la Mesa #${idMesa}!`,
                    tipo: 'success'
                }
            });

        } catch (err) {
            setError('❌ Error al registrar el pedido. Por favor, verifica el servidor o los datos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ---
    // Renderizado
    // ---

    if (loading) {
        return (
            <div className="loading-state">
                <span className="spinner-large"></span>
                <p>Cargando menú y clientes...</p>
            </div>
        );
    }

    if (error && loading === false) {
        return (
            <div className="error-state">
                <p className="error-text">{error}</p>
                <Link to="/mesas" className="btn btn-secondary">Volver a Mesas</Link>
            </div>
        );
    }

    return (
        <div className="crear-pedido-container">
            {/* NAVEGACIÓN */}
            <nav className="crear-pedido-nav">
                <Link to="/mesas" className="back-link">
                    <span className="back-icon">←</span>
                    Volver a Gestión de Mesas
                </Link>
            </nav>

            {/* HEADER */}
            <header className="page-header">
                <h1>🍽️ Nuevo Pedido - Mesa <span className="table-id">#{idMesa}</span></h1>
                <p>Selecciona los platos y asigna un cliente (opcional) para registrar la orden.</p>
            </header>

            {/* MENSAJE DE ERROR GLOBAL */}
            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <p className="error-text">{error}</p>
                </div>
            )}

            {/* CONTENIDO PRINCIPAL - LAYOUT DE 2 COLUMNAS */}
            <div className="pedido-content-grid">
                
                {/* COLUMNA IZQUIERDA: MENÚ DE PLATOS */}
                <div className="menu-list-card">
                    <div className="card-header">
                        <h3>Menú de Platos Disponibles</h3>
                    </div>
                    
                    <div className="menu-items-list">
                        {platos.map(plato => (
                            <PlatoCard 
                                key={plato.idPlato} 
                                plato={plato} 
                                onAdd={() => updatePlatoCantidad(plato, 1)}
                            />
                        ))}
                    </div>
                    {platos.length === 0 && <p className="no-data-msg">No hay platos disponibles en el menú.</p>}
                </div>

                {/* COLUMNA DERECHA: RESUMEN DEL PEDIDO/CARRITO */}
                <div className="resumen-card">
                    <div className="card-header">
                        <h3>Resumen del Pedido</h3>
                    </div>
                    
                    {/* ASIGNACIÓN DE CLIENTE */}
                    <div className="form-group cliente-select-group">
                        <label className="form-label">
                            <span className="label-icon">👤</span>
                            Cliente Asignado
                        </label>
                        <select 
                            value={idCliente} 
                            onChange={(e) => setIdCliente(e.target.value)}
                            className="form-select"
                            disabled={loading}
                        >
                            <option value="">Consumidor Final (Opcional)</option>
                            {clientes.map(cliente => (
                                <option key={cliente.idCliente} value={cliente.idCliente}>
                                    {cliente.nombres} {cliente.apellidos} (DNI: {cliente.dni})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="carrito-list">
                        <h4>Ítems ({carrito.length})</h4>
                        {carrito.length === 0 ? (
                            <p className="empty-cart-msg">Aún no se han agregado platos al pedido.</p>
                        ) : (
                            <ul className="cart-ul">
                                {carrito.map(item => (
                                    <CartItem 
                                        key={item.idPlato} 
                                        item={item} 
                                        onIncrease={() => updatePlatoCantidad(item, 1)}
                                        onDecrease={() => updatePlatoCantidad(item, -1)}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {/* TOTAL Y ACCIÓN */}
                    <div className="pedido-footer">
                        <div className="total-display">
                            <strong>TOTAL ESTIMADO:</strong> 
                            <span className="total-price">S/ {totalPedido.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleSubmitPedido}
                            className="btn btn-primary full-width"
                            disabled={carrito.length === 0 || loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    <span>Registrando...</span>
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">✅</span>
                                    <span>Registrar Pedido</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Componentes Reutilizables (Separados para limpieza de código) ---

const PlatoCard = ({ plato, onAdd }) => (
    <div className="plato-card">
        <div className="plato-info">
            <span className="plato-icon">🥘</span>
            <div className="plato-details">
                <p className="plato-name">{plato.nombre}</p>
                <p className="plato-price">S/ {plato.precio.toFixed(2)}</p>
            </div>
        </div>
        <button className="btn btn-add" onClick={onAdd} title={`Añadir ${plato.nombre}`}>
            <span className="btn-icon">+</span>
        </button>
    </div>
);

const CartItem = ({ item, onIncrease, onDecrease }) => (
    <li className="cart-item">
        <div className="item-name-price">
            <span className="item-qty">{item.cantidad}x</span>
            <span className="item-name">{item.nombre}</span>
            <span className="item-subtotal">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
        <div className="item-actions">
            <button className="btn-action-sm" onClick={onDecrease} title="Quitar uno">-</button>
            <button className="btn-action-sm" onClick={onIncrease} title="Añadir uno">+</button>
        </div>
    </li>
);

export default CrearPedido;