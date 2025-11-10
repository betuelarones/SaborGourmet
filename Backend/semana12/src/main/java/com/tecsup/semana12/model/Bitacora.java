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

    public Long getIdBitacora() {
        return idBitacora;
    }

    public void setIdBitacora(Long idBitacora) {
        this.idBitacora = idBitacora;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    @Override
    public String toString() {
        return "Bitacora{" +
                "idBitacora=" + idBitacora +
                ", usuario=" + usuario +
                ", accion='" + accion + '\'' +
                ", fechaHora=" + fechaHora +
                '}';
    }
}