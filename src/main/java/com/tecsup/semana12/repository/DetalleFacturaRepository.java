package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.DetalleFactura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleFacturaRepository extends JpaRepository<DetalleFactura,Long> {
    List<DetalleFactura> findByFacturaIdFactura(Long idFactura);
}
