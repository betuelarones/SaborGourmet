package com.tecsup.semana12.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;

@Entity
public class Insumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInsumo;
    private String nombre;
    private String unidadMedida;
    private Double stock;
    private Double stockMinimo;
    private BigDecimal precioCompra;
    private Boolean activo;
}