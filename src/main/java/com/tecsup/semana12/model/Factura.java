package com.tecsup.semana12.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFactura;

    @OneToOne
    private Pedido pedido;

    private LocalDateTime fechaEmision;
    private BigDecimal total;
    private String metodoPago; // efectivo, tarjeta, yape
    private String estado; // pendiente, pagado
}