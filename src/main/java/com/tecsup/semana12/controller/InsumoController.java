package com.tecsup.semana12.controller;

import com.tecsup.semana12.model.Insumo;
import com.tecsup.semana12.service.InsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insumos")
public class InsumoController {
    @Autowired
    private InsumoService insumoService;

    @PostMapping
    public Insumo crearInsumo(@RequestBody Insumo insumo) {
        return insumoService.registrarInsumo(insumo);
    }

    @GetMapping
    public List<Insumo> listarInsumos() {
        return insumoService.listarInsumos();
    }

    @GetMapping("/{id}")
    public Insumo obtenerInsumo(@PathVariable Long id) {
        return insumoService.obtenerInsumoPorId(id);
    }

    // ---
    // Endpoint para RF15: Alertas de stock bajo
    // URL: GET /api/insumos/stock-bajo
    // ---
    @GetMapping("/stock-bajo")
    public List<Insumo> getInsumosConStockBajo() {
        return insumoService.listarInsumosConStockBajo();
    }
}
