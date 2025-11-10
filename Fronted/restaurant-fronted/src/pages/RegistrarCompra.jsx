// src/pages/RegistrarCompra.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';

function RegistrarCompra() {
    const navigate = useNavigate();

    // Estados para los datos de la API
    const [proveedores, setProveedores] = useState([]);
    const [insumos, setInsumos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para el formulario principal
    const [idProveedor, setIdProveedor] = useState('');
    const [carritoCompra, setCarritoCompra] = useState([]); // { idInsumo, nombre, cantidad, precioUnitario }

    // Estados para el sub-formulario (añadir al carrito)
    const [itemActual, setItemActual] = useState({
        idInsumo: '',
        cantidad: 1.0,
        precioUnitario: 0.0
    });

    // ---
    // PASO 1: Cargar Proveedores e Insumos
    // ---
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resProv, resInsumos] = await Promise.all([
                    apiClient.get('/proveedores'),
                    apiClient.get('/insumos')
                ]);
                setProveedores(resProv.data);
                setInsumos(resInsumos.data);
            } catch (err) {
                setError('No se pudieron cargar proveedores o insumos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    // ---
    // PASO 2: Lógica para el carrito de compras
    // ---
    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItemActual({
            ...itemActual,
            [name]: value
        });
    };

    const handleAddItem = () => {
        if (!itemActual.idInsumo || itemActual.cantidad <= 0 || itemActual.precioUnitario <= 0) {
            alert('Por favor, selecciona un insumo, cantidad y precio válidos.');
            return;
        }

        const insumoSeleccionado = insumos.find(i => i.idInsumo == itemActual.idInsumo);

        setCarritoCompra([...carritoCompra, {
            ...itemActual,
            nombre: insumoSeleccionado.nombre,
            // Convertimos a números
            cantidad: parseFloat(itemActual.cantidad),
            precioUnitario: parseFloat(itemActual.precioUnitario)
        }]);

        // Limpiamos el formulario de item
        setItemActual({ idInsumo: '', cantidad: 1.0, precioUnitario: 0.0 });
    };

    const calcularTotal = () => {
        return carritoCompra.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
    };

    // ---
    // PASO 3: Enviar la Compra al Backend (RF14)
    // ---
    const handleSubmitCompra = async () => {
        if (!idProveedor) {
            alert('Debes seleccionar un proveedor.');
            return;
        }
        if (carritoCompra.length === 0) {
            alert('Debes agregar al menos un insumo a la compra.');
            return;
        }

        // 1. Formateamos el DTO
        const compraRequestDTO = {
            idProveedor: parseInt(idProveedor),
            detalles: carritoCompra.map(item => ({
                idInsumo: item.idInsumo,
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario
            }))
        };

        try {
            // 2. ¡Llamamos al backend!
            await apiClient.post('/compras', compraRequestDTO);

            alert('¡Compra registrada con éxito! El stock ha sido actualizado.');
            navigate('/gestion-insumos'); // Redirigimos al inventario

        } catch (err) {
            setError('Error al registrar la compra.');
            console.error(err);
        }
    };

    // ---
    // Renderizado
    // ---
    if (loading) return <p>Cargando datos...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">{"< Volver al Dashboard"}</Link>
            <h2 style={{ marginTop: '20px' }}>Registrar Compra de Insumos (RF14)</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* --- Selección de Proveedor --- */}
            <div style={{ marginBottom: '20px' }}>
                <label><strong>1. Seleccionar Proveedor:</strong></label><br />
                <select value={idProveedor} onChange={(e) => setIdProveedor(e.target.value)} required>
                    <option value="">-- Seleccione un Proveedor --</option>
                    {proveedores.map(prov => (
                        <option key={prov.idProveedor} value={prov.idProveedor}>
                            {prov.nombre} (RUC: {prov.ruc})
                        </option>
                    ))}
                </select>
            </div>

            <hr />

            {/* --- Formulario para añadir Insumos --- */}
            <div style={{ margin: '20px 0' }}>
                <strong>2. Agregar Insumos a la Compra:</strong>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <div>
                        <label>Insumo:</label><br />
                        <select name="idInsumo" value={itemActual.idInsumo} onChange={handleItemChange}>
                            <option value="">-- Seleccione Insumo --</option>
                            {insumos.map(ins => (
                                <option key={ins.idInsumo} value={ins.idInsumo}>
                                    {ins.nombre} ({ins.unidadMedida})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Cantidad:</label><br />
                        <input type="number" step="0.1" name="cantidad" value={itemActual.cantidad} onChange={handleItemChange} style={{ width: '80px' }} />
                    </div>
                    <div>
                        <label>Precio Unitario (S/):</label><br />
                        <input type="number" step="0.01" name="precioUnitario" value={itemActual.precioUnitario} onChange={handleItemChange} style={{ width: '100px' }} />
                    </div>
                    <button onClick={handleAddItem} style={{ alignSelf: 'flex-end' }}>+ Agregar</button>
                </div>
            </div>

            <hr />

            {/* --- Resumen del Carrito de Compra --- */}
            <h3>Resumen de la Compra</h3>
            {carritoCompra.length === 0 ? (
                <p>Aún no has agregado insumos.</p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px' }}>Insumo</th>
                            <th style={{ padding: '8px' }}>Cantidad</th>
                            <th style={{ padding: '8px' }}>Precio Unit.</th>
                            <th style={{ padding: '8px' }}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carritoCompra.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px' }}>{item.nombre}</td>
                                <td style={{ padding: '8px' }}>{item.cantidad}</td>
                                <td style={{ padding: '8px' }}>S/ {item.precioUnitario.toFixed(2)}</td>
                                <td style={{ padding: '8px' }}>S/ {(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td colSpan="3" style={{ padding: '8px', textAlign: 'right' }}>TOTAL:</td>
                            <td style={{ padding: '8px' }}>S/ {calcularTotal().toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            )}

            {/* --- Botón de Enviar Compra --- */}
            <button
                onClick={handleSubmitCompra}
                disabled={!idProveedor || carritoCompra.length === 0}
                style={{ marginTop: '20px', padding: '10px', fontSize: '1.2em', backgroundColor: 'blue', color: 'white' }}
            >
                Confirmar y Registrar Compra
            </button>
        </div>
    );
}

export default RegistrarCompra;