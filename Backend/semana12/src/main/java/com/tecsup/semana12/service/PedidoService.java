package com.tecsup.semana12.service;

import com.tecsup.semana12.dto.PedidoRequestDTO;
import com.tecsup.semana12.model.Pedido;

import java.util.List;

public interface PedidoService {
    // RF7: Registrar pedidos
    Pedido registrarPedido(PedidoRequestDTO pedidoDTO);

    // RF8: Cambiar estado del pedido
    Pedido cambiarEstadoPedido(Long idPedido, String nuevoEstado);

    // RF9: Mostrar pedidos pendientes
    List<Pedido> listarPedidosPendientes();

    // Métodos de consulta básicos
    List<Pedido> listarTodosLosPedidos();
    Pedido obtenerPedidoPorId(Long id);

    List<Pedido> listarPedidosServidos();
}
