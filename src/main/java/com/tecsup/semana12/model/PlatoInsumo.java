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

    public Long getIdPlatoInsumo() {
        return idPlatoInsumo;
    }

    public void setIdPlatoInsumo(Long idPlatoInsumo) {
        this.idPlatoInsumo = idPlatoInsumo;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
    }

    public Insumo getInsumo() {
        return insumo;
    }

    public void setInsumo(Insumo insumo) {
        this.insumo = insumo;
    }

    public Double getCantidadUsada() {
        return cantidadUsada;
    }

    public void setCantidadUsada(Double cantidadUsada) {
        this.cantidadUsada = cantidadUsada;
    }

    @Override
    public String toString() {
        return "PlatoInsumo{" +
                "idPlatoInsumo=" + idPlatoInsumo +
                ", plato=" + plato +
                ", insumo=" + insumo +
                ", cantidadUsada=" + cantidadUsada +
                '}';
    }
}
