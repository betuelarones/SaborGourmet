package com.tecsup.semana12.dto;

import java.util.List;

public class CompraRequestDTO {

    private Long idProveedor;
    private List<DetalleCompraDTO> detalles;

    // Getters y Setters
    public Long getIdProveedor() { return idProveedor; }
    public void setIdProveedor(Long id) { this.idProveedor = id; }
    public List<DetalleCompraDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleCompraDTO> detalles) { this.detalles = detalles; }
}
