package com.tecsup.semana12.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class DetalleCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalleCompra;

    @ManyToOne
    private Compra compra;

    @ManyToOne
    private Insumo insumo;

    private Double cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;

    public Long getIdDetalleCompra() { return idDetalleCompra; }
    public void setIdDetalleCompra(Long id) { this.idDetalleCompra = id; }
    public Compra getCompra() { return compra; }
    public void setCompra(Compra compra) { this.compra = compra; }
    public Insumo getInsumo() { return insumo; }
    public void setInsumo(Insumo insumo) { this.insumo = insumo; }
    public Double getCantidad() { return cantidad; }
    public void setCantidad(Double cantidad) { this.cantidad = cantidad; }
    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precio) { this.precioUnitario = precio; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
}