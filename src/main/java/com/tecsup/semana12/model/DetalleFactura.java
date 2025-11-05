package com.tecsup.semana12.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class DetalleFactura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalleFactura;

    @ManyToOne
    private Factura factura;

    private String concepto;
    private BigDecimal monto;
}