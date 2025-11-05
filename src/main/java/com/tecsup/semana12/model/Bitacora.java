package com.tecsup.semana12.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Bitacora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBitacora;

    @ManyToOne
    private Usuario usuario;

    private String accion;
    private LocalDateTime fechaHora;
}