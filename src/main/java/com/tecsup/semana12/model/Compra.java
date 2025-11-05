package com.tecsup.semana12.model;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompra;

    @ManyToOne
    private Proveedor proveedor;

    private LocalDateTime fechaCompra;
    private BigDecimal total;
}