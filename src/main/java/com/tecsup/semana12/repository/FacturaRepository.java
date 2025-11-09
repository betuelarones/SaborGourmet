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
    @Query("SELECT NEW com.tecsup.semana12.dto.ReporteVentasDTO(FUNC('DATE', f.fechaEmision), SUM(f.total)) " +
            "FROM Factura f " +
            "WHERE f.fechaEmision BETWEEN :inicio AND :fin " +
            "AND f.estado = 'pagado' " + // Solo contamos facturas pagadas
            "GROUP BY FUNC('DATE', f.fechaEmision) " +
            "ORDER BY FUNC('DATE', f.fechaEmision) ASC")
    List<ReporteVentasDTO> findVentasDiariasPorFecha(
            @Param("inicio") LocalDateTime inicio,
            @Param("fin") LocalDateTime fin
    );
}
