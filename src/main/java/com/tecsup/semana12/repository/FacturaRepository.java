package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura,Long> {
}
