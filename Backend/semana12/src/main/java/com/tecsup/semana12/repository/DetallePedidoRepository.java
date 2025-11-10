package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.DetallePedido;
import com.tecsup.semana12.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido,Long> {
    List<DetallePedido> findByPedido(Pedido pedido);
}
