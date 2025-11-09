package com.tecsup.semana12.controller;


import com.tecsup.semana12.model.Factura;
import com.tecsup.semana12.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    // Endpoint para consultar todas las facturas
    @GetMapping
    public List<Factura> listarFacturas() {
        return facturaService.listarTodasLasFacturas();
    }

    // Endpoint para consultar una factura específica
    @GetMapping("/{id}")
    public Factura obtenerFactura(@PathVariable Long id) {
        return facturaService.obtenerFacturaPorId(id);
    }
}
