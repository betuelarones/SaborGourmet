package com.tecsup.semana12.controller;

import com.tecsup.semana12.dto.ReporteVentasDTO;
import com.tecsup.semana12.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {
    @Autowired
    private ReporteService reporteService;

    // ---
    // Endpoint para RF12: Reporte de Ventas Diarias
    // ---
    @GetMapping("/ventas-diarias")
    public List<ReporteVentasDTO> getReporteVentas(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin
    ) {
        return reporteService.generarReporteVentasDiario(inicio, fin);
    }
}
