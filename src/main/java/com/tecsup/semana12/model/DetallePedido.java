package com.tecsup.semana12.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;

public class DetallePedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetallePedido;

    @ManyToOne
    private Pedido pedido;

    @ManyToOne
    private Plato plato;

    private Integer cantidad;
    private BigDecimal subtotalFactura;
}