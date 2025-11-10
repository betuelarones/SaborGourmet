package com.tecsup.semana12.dto;

import java.util.List;

public class PedidoRequestDTO {
    private Long idCliente;
    private Long idMesa;
    private List<DetallePedidoDTO> detalles; // Lista de platos y cantidades

    public Long getIdCliente() { return idCliente; }
    public void setIdCliente(Long idCliente) { this.idCliente = idCliente; }
    public Long getIdMesa() { return idMesa; }
    public void setIdMesa(Long idMesa) { this.idMesa = idMesa; }
    public List<DetallePedidoDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedidoDTO> detalles) { this.detalles = detalles; }
}
