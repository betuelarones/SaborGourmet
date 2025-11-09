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

    public Long getIdDetallePedido() {
        return idDetallePedido;
    }

    public void setIdDetallePedido(Long idDetallePedido) {
        this.idDetallePedido = idDetallePedido;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getSubtotalFactura() {
        return subtotalFactura;
    }

    public void setSubtotalFactura(BigDecimal subtotalFactura) {
        this.subtotalFactura = subtotalFactura;
    }

    @Override
    public String toString() {
        return "DetallePedido{" +
                "idDetallePedido=" + idDetallePedido +
                ", pedido=" + pedido +
                ", plato=" + plato +
                ", cantidad=" + cantidad +
                ", subtotalFactura=" + subtotalFactura +
                '}';
    }
}