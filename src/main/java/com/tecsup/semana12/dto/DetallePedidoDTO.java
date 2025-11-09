package com.tecsup.semana12.dto;

import java.math.BigDecimal;

public class DetallePedidoDTO {
    private Long idPlato;
    private int cantidad;
    public Long getIdPlato() { return idPlato; }
    public void setIdPlato(Long idPlato) { this.idPlato = idPlato; }
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}
