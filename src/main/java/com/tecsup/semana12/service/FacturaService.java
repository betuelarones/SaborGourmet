package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Factura;

import java.util.List;

public interface FacturaService {
    // RF10 y RF11: Genera la factura para un pedido y registra el método de pago
    Factura generarFactura(Long idPedido, String metodoPago);

    // (Opcional) Métodos de consulta
    Factura obtenerFacturaPorId(Long id);
    List<Factura> listarTodasLasFacturas();
}
