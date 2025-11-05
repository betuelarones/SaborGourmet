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
}