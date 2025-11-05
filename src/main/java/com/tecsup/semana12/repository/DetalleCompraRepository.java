package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.DetalleCompra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleCompraRepository extends JpaRepository<DetalleCompra,Long> {

    List<DetalleCompra> findByCompraIdCompra(Long idCompra);
}
