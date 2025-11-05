package com.tecsup.semana12.model;

import jakarta.persistence.*;

@Entity
public class PlatoInsumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlatoInsumo;

    @ManyToOne
    private Plato plato;

    @ManyToOne
    private Insumo insumo;

    private Double cantidadUsada;
}
