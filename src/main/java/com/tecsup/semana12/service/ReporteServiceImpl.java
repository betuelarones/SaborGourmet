package com.tecsup.semana12.service;

import com.tecsup.semana12.dto.ReporteVentasDTO;
import com.tecsup.semana12.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReporteServiceImpl implements ReporteService {
    @Autowired
    private FacturaRepository facturaRepository;

    @Override
    public List<ReporteVentasDTO> generarReporteVentasDiario(LocalDateTime inicio, LocalDateTime fin) {
        return facturaRepository.findVentasDiariasPorFecha(inicio, fin);
    }
}
