package com.tecsup.semana12.repository;

import com.tecsup.semana12.dto.ReporteVentasDTO;
import com.tecsup.semana12.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface FacturaRepository extends JpaRepository<Factura,Long> {
    // ---
    @Query("SELECT NEW com.tecsup.semana12.dto.ReporteVentasDTO(CAST(f.fechaEmision AS DATE), SUM(f.total)) " +
            "FROM Factura f " +
            "WHERE f.fechaEmision BETWEEN :inicio AND :fin " +
            "AND f.estado = 'pagado' " +
            "GROUP BY CAST(f.fechaEmision AS DATE) " + // También cambia aquí
            "ORDER BY CAST(f.fechaEmision AS DATE) ASC") // Y aquí
    List<ReporteVentasDTO> findVentasDiariasPorFecha(
            @Param("inicio") LocalDateTime inicio,
            @Param("fin") LocalDateTime fin
    );
}
