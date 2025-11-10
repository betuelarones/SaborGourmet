package com.tecsup.semana12.dto;

import java.math.BigDecimal;

public class DetalleCompraDTO {

    private Long idInsumo;
    private Double cantidad;
    private BigDecimal precioUnitario;

    // Getters y Setters
    public Long getIdInsumo() { return idInsumo; }
    public void setIdInsumo(Long id) { this.idInsumo = id; }
    public Double getCantidad() { return cantidad; }
    public void setCantidad(Double cantidad) { this.cantidad = cantidad; }
    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precio) { this.precioUnitario = precio; }
}
