package com.tecsup.semana12.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Mesa mesa;

    private LocalDateTime fechaHora;
    private String estado; // pendiente, en preparación, servido, cerrado
}
