package com.tecsup.semana12.dto;

import java.math.BigDecimal;
import java.util.Date;

public class ReporteVentasDTO {
    private Date dia;
    private BigDecimal totalVendido;

    // Constructor que usará la consulta de JPQL
    public ReporteVentasDTO(Date dia, BigDecimal totalVendido) {
        this.dia = dia;
        this.totalVendido = totalVendido;
    }

    // Getters y Setters
    public Date getDia() { return dia; }
    public void setDia(Date dia) { this.dia = dia; }
    public BigDecimal getTotalVendido() { return totalVendido; }
    public void setTotalVendido(BigDecimal totalVendido) { this.totalVendido = totalVendido; }
}

