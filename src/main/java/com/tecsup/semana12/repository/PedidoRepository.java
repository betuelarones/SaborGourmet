package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido,Long> {
    List<Pedido> findByEstado(String estado);
}
