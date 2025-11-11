// src/pages/RegistrarCompra.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiService';
import '../css/RegistrarCompra.css';

function RegistrarCompra() {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState([]);
    const [insumos, setInsumos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idProveedor, setIdProveedor] = useState('');
    const [carritoCompra, setCarritoCompra] = useState([]);
    const [itemActual, setItemActual] = useState({ idInsumo: '', cantidad: 1.0, precioUnitario: 0.0 });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resProv, resInsumos] = await Promise.all([
                    apiClient.get('/proveedores'),
                    apiClient.get('/insumos'),
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

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItemActual({ ...itemActual, [name]: value });
    };

    const handleAddItem = () => {
        if (!itemActual.idInsumo || itemActual.cantidad <= 0 || itemActual.precioUnitario <= 0) {
            alert('Por favor, selecciona un insumo, cantidad y precio válidos.');
            return;
        }
        const insumoSeleccionado = insumos.find((i) => i.idInsumo == itemActual.idInsumo);
        setCarritoCompra([
            ...carritoCompra,
            {
                ...itemActual,
                nombre: insumoSeleccionado.nombre,
                cantidad: parseFloat(itemActual.cantidad),
                precioUnitario: parseFloat(itemActual.precioUnitario),
            },
        ]);
        setItemActual({ idInsumo: '', cantidad: 1.0, precioUnitario: 0.0 });
    };

    const calcularTotal = () =>
        carritoCompra.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);

    const handleSubmitCompra = async () => {
        if (!idProveedor) {
            alert('Debes seleccionar un proveedor.');
            return;
        }
        if (carritoCompra.length === 0) {
            alert('Debes agregar al menos un insumo.');
            return;
        }

        const compraRequestDTO = {
            idProveedor: parseInt(idProveedor),
            detalles: carritoCompra.map((item) => ({
                idInsumo: item.idInsumo,
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario,
            })),
        };

        try {
            await apiClient.post('/compras', compraRequestDTO);
            alert('¡Compra registrada con éxito!');
            navigate('/gestion-insumos');
        } catch (err) {
            setError('Error al registrar la compra.');
            console.error(err);
        }
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <div className="registrar-compra-container">
            <div className="registrar-header">
                <Link to="/dashboard">← Volver al Dashboard</Link>
                <h2 className="registrar-title">Registrar Compra de Insumos (RF14)</h2>
            </div>

            {error && <p className="error-msg">{error}</p>}

            {/* --- Selección de Proveedor --- */}
            <div className="section">
                <h3>1. Seleccionar Proveedor</h3>
                <select value={idProveedor} onChange={(e) => setIdProveedor(e.target.value)} required>
                    <option value="">-- Seleccione un Proveedor --</option>
                    {proveedores.map((prov) => (
                        <option key={prov.idProveedor} value={prov.idProveedor}>
                            {prov.nombre} (RUC: {prov.ruc})
                        </option>
                    ))}
                </select>
            </div>

            {/* --- Agregar Insumos --- */}
            <div className="section">
                <h3>2. Agregar Insumos a la Compra</h3>
                <div className="add-item-container">
                    <div>
                        <label>Insumo:</label>
                        <select name="idInsumo" value={itemActual.idInsumo} onChange={handleItemChange}>
                            <option value="">-- Seleccione Insumo --</option>
                            {insumos.map((ins) => (
                                <option key={ins.idInsumo} value={ins.idInsumo}>
                                    {ins.nombre} ({ins.unidadMedida})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input type="number" step="0.1" name="cantidad" value={itemActual.cantidad} onChange={handleItemChange} />
                    </div>
                    <div>
                        <label>Precio Unitario (S/):</label>
                        <input
                            type="number"
                            step="0.01"
                            name="precioUnitario"
                            value={itemActual.precioUnitario}
                            onChange={handleItemChange}
                        />
                    </div>
                    <button className="btn-agregar" onClick={handleAddItem}>
                        + Agregar
                    </button>
                </div>
            </div>

            {/* --- Resumen de Compra --- */}
            <div className="section">
                <h3>Resumen de la Compra</h3>
                {carritoCompra.length === 0 ? (
                    <p>Aún no has agregado insumos.</p>
                ) : (
                    <table className="compra-table">
                        <thead>
                            <tr>
                                <th>Insumo</th>
                                <th>Cantidad</th>
                                <th>Precio Unit.</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carritoCompra.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nombre}</td>
                                    <td>{item.cantidad}</td>
                                    <td>S/ {item.precioUnitario.toFixed(2)}</td>
                                    <td>S/ {(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">TOTAL:</td>
                                <td>S/ {calcularTotal().toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                )}
            </div>

            <button
                className="btn-confirmar"
                onClick={handleSubmitCompra}
                disabled={!idProveedor || carritoCompra.length === 0}
            >
                Confirmar y Registrar Compra ✅
            </button>
        </div>
    );
}

export default RegistrarCompra;
