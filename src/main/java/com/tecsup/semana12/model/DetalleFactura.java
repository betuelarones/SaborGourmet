package com.tecsup.semana12.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class DetalleFactura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalleFactura;

    @ManyToOne
    private Factura factura;

    private String concepto;
    private BigDecimal monto;

    public Long getIdDetalleFactura() {
        return idDetalleFactura;
    }

    public void setIdDetalleFactura(Long idDetalleFactura) {
        this.idDetalleFactura = idDetalleFactura;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    @Override
    public String toString() {
        return "DetalleFactura{" +
                "idDetalleFactura=" + idDetalleFactura +
                ", factura=" + factura +
                ", concepto='" + concepto + '\'' +
                ", monto=" + monto +
                '}';
    }
}