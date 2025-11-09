package com.tecsup.semana12.controller;

import com.tecsup.semana12.dto.PedidoRequestDTO;
import com.tecsup.semana12.model.Pedido;
import com.tecsup.semana12.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    // ---
    // Endpoint para RF7: Registrar un nuevo pedido
    // URL: POST /api/pedidos
    // ---
    @PostMapping
    public Pedido crearPedido(@RequestBody PedidoRequestDTO pedidoDTO) {
        return pedidoService.registrarPedido(pedidoDTO);
    }

    // ---
    // Endpoint para RF9: Mostrar pedidos pendientes (para la cocina)
    // URL: GET /api/pedidos/pendientes
    // ---
    @GetMapping("/pendientes")
    public List<Pedido> getPedidosPendientes() {
        return pedidoService.listarPedidosPendientes();
    }

    // ---
    // Endpoint para RF8: Cambiar el estado de un pedido
    // URL: PUT /api/pedidos/5/estado
    // ---
    @PutMapping("/{id}/estado")
    public Pedido cambiarEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        return pedidoService.cambiarEstadoPedido(id, nuevoEstado);
    }

    // --- Endpoints de consulta básicos ---

    // URL: GET /api/pedidos
    @GetMapping
    public List<Pedido> listarTodosLosPedidos() {
        return pedidoService.listarTodosLosPedidos();
    }

    // URL: GET /api/pedidos/5
    @GetMapping("/{id}")
    public Pedido getPedidoPorId(@PathVariable Long id) {
        return pedidoService.obtenerPedidoPorId(id);
    }
}