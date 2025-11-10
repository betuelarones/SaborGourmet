// src/pages/CrearPedido.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService'; // Nuestro servicio de API

function CrearPedido() {
    const { idMesa } = useParams(); // Obtiene el ID de la mesa desde la URL
    const navigate = useNavigate();

    // Estados para guardar los datos de la API
    const [platos, setPlatos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para el formulario del pedido
    const [idCliente, setIdCliente] = useState(''); // Cliente seleccionado
    const [carrito, setCarrito] = useState([]); // { idPlato: 1, nombre: 'Lomo', cantidad: 1 }

    // ---
    // PASO 1: Cargar Platos y Clientes cuando la página se monta
    // ---
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Hacemos las 2 llamadas a la API en paralelo
                const [resPlatos, resClientes] = await Promise.all([
                    apiClient.get('/platos'),
                    apiClient.get('/clientes')
                ]);

                setPlatos(resPlatos.data);
                setClientes(resClientes.data);
            } catch (err) {
                setError('No se pudieron cargar los datos (platos o clientes).');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []); // El [] vacío asegura que solo se ejecute una vez

    // ---
    // PASO 2: Lógica para manejar el "carrito"
    // ---
    const agregarPlatoAlCarrito = (plato) => {
        // Revisa si el plato ya está en el carrito
        const platoExistente = carrito.find(item => item.idPlato === plato.idPlato);

        if (platoExistente) {
            // Si existe, solo aumenta la cantidad
            setCarrito(carrito.map(item =>
                item.idPlato === plato.idPlato ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            // Si no existe, lo añade con cantidad 1
            setCarrito([...carrito, { idPlato: plato.idPlato, nombre: plato.nombre, cantidad: 1 }]);
        }
    };

    // ---
    // PASO 3: Lógica para enviar el pedido al backend (RF7)
    // ---
    const handleSubmitPedido = async () => {
        if (carrito.length === 0) {
            alert('Debes agregar al menos un plato al pedido.');
            return;
        }

        // 1. Formateamos el "carrito" a lo que el DTO del backend espera
        const detallesDTO = carrito.map(item => ({
            idPlato: item.idPlato,
            cantidad: item.cantidad
        }));

        // 2. Creamos el objeto del DTO
        const pedidoRequestDTO = {
            idMesa: parseInt(idMesa), // El ID de la URL
            idCliente: idCliente ? parseInt(idCliente) : null, // El ID del dropdown
            detalles: detallesDTO
        };

        try {
            // 3. ¡Llamamos al backend!
            await apiClient.post('/pedidos', pedidoRequestDTO);

            alert('¡Pedido registrado con éxito!');
            navigate('/mesas'); // Redirigimos a la vista de mesas

        } catch (err) {
            setError('Error al registrar el pedido.');
            console.error(err);
        }
    };

    // ---
    // Renderizado
    // ---
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/mesas">{"< Volver a Mesas"}</Link>

            <h2 style={{ marginTop: '20px' }}>Registrar Nuevo Pedido (Mesa #{idMesa})</h2>

            {/* --- Selección de Cliente --- */}
            <div>
                <label>Asignar Cliente (Opcional): </label>
                <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
                    <option value="">Consumidor Final</option>
                    {clientes.map(cliente => (
                        <option key={cliente.idCliente} value={cliente.idCliente}>
                            {cliente.nombres} {cliente.apellidos} (DNI: {cliente.dni})
                        </option>
                    ))}
                </select>
            </div>

            <hr style={{ margin: '20px 0' }} />

            {/* --- Lista de Platos (para agregar) --- */}
            <h3>Menú de Platos</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {platos.map(plato => (
                    <div key={plato.idPlato} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <strong>{plato.nombre}</strong> - S/ {plato.precio}
                        <button
                            onClick={() => agregarPlatoAlCarrito(plato)}
                            style={{ marginLeft: '10px' }}
                        >
                            + Agregar
                        </button>
                    </div>
                ))}
            </div>

            <hr style={{ margin: '20px 0' }} />

            {/* --- Resumen del Carrito --- */}
            <h3>Pedido Actual</h3>
            {carrito.length === 0 ? (
                <p>Aún no has agregado platos.</p>
            ) : (
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {carrito.map(item => (
                        <li key={item.idPlato}>
                            {item.nombre} x {item.cantidad}
                            {/* (Aquí podríamos añadir botones para +/- cantidad o eliminar) */}
                        </li>
                    ))}
                </ul>
            )}

            {/* --- Botón de Enviar Pedido --- */}
            <button
                onClick={handleSubmitPedido}
                style={{ marginTop: '20px', padding: '10px', backgroundColor: 'green', color: 'white' }}
            >
                Registrar Pedido (RF7)
            </button>

        </div>
    );
}

export default CrearPedido;