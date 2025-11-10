package com.tecsup.semana12.service;

import com.tecsup.semana12.dto.ReporteVentasDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface ReporteService {
    List<ReporteVentasDTO> generarReporteVentasDiario(LocalDateTime inicio, LocalDateTime fin);
}
