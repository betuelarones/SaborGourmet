package com.tecsup.semana12.service;


import com.tecsup.semana12.dto.DetallePedidoDTO;
import com.tecsup.semana12.dto.PedidoRequestDTO;
import com.tecsup.semana12.model.*;
import com.tecsup.semana12.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class PedidoServiceImpl implements PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired private DetallePedidoRepository detallePedidoRepository;
    @Autowired private PlatoRepository platoRepository;
    @Autowired private MesaRepository mesaRepository;
    @Autowired private ClienteRepository clienteRepository;
    @Autowired private PlatoInsumoRepository platoInsumoRepository;
    @Autowired private InsumoRepository insumoRepository;
    @Autowired private MesaService mesaService;

    // ---
    // RF7: Registrar Pedido
    // ---
    @Override
    @Transactional // Asegura que o todo se guarda, o nada se guarda
    public Pedido registrarPedido(PedidoRequestDTO pedidoDTO) {

        Mesa mesa = mesaRepository.findById(pedidoDTO.getIdMesa())
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));

        // 1. Crear el Pedido
        Pedido nuevoPedido = new Pedido();
        nuevoPedido.setMesa(mesa);
        nuevoPedido.setFechaHora(LocalDateTime.now());
        nuevoPedido.setEstado("pendiente"); // Estado inicial

        // Asignar cliente si existe
        if (pedidoDTO.getIdCliente() != null) {
            Cliente cliente = clienteRepository.findById(pedidoDTO.getIdCliente())
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
            nuevoPedido.setCliente(cliente);
        }

        Pedido pedidoGuardado = pedidoRepository.save(nuevoPedido);

        // 2. Crear los Detalles del Pedido
        for (DetallePedidoDTO detalleDTO : pedidoDTO.getDetalles()) {
            Plato plato = platoRepository.findById(detalleDTO.getIdPlato())
                    .orElseThrow(() -> new RuntimeException("Plato no encontrado"));

            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedidoGuardado);
            detalle.setPlato(plato);
            detalle.setCantidad(detalleDTO.getCantidad());
            Double precioPlato = plato.getPrecio();
            Integer cantidad = detalleDTO.getCantidad();

            BigDecimal subtotal = BigDecimal.ZERO;

            if (precioPlato != null && cantidad != null) {
                BigDecimal precioBD = BigDecimal.valueOf(precioPlato);
                BigDecimal cantidadBD = BigDecimal.valueOf(cantidad);
                subtotal = precioBD.multiply(cantidadBD);
            }
            detallePedidoRepository.save(detalle);
        }

        // 3. (RF2) Ocupar la mesa
        mesaService.asignarMesa(mesa.getIdMesa());

        return pedidoGuardado;
    }

    // ---
    // RF8: Cambiar Estado
    // ---
    @Override
    @Transactional
    public Pedido cambiarEstadoPedido(Long idPedido, String nuevoEstado) {
        Pedido pedido = obtenerPedidoPorId(idPedido);
        pedido.setEstado(nuevoEstado);

        // ---
        // ¡¡AQUÍ SE CUMPLE EL RF6: Actualizar stock!!
        // ---
        // Descontamos stock cuando la cocina lo marca "servido"
        if ("servido".equals(nuevoEstado)) {
            descontarStockDePedido(pedido);
        }
        if ("cerrado".equals(nuevoEstado)) {
            mesaService.liberarMesa(pedido.getMesa().getIdMesa());
        }

        return pedidoRepository.save(pedido);
    }

    // ---
    // RF9: Listar Pedidos Pendientes
    // ---
    @Override
    public List<Pedido> listarPedidosPendientes() {
        // Buscamos pedidos "pendientes" y "en preparación"
        List<String> estados = Arrays.asList("pendiente", "en preparación");
        return pedidoRepository.findByEstadoIn(estados);
    }

    // --- Métodos privados de Lógica de Negocio ---

    // ---
    // RF6: Lógica para descontar stock
    // ---
    private void descontarStockDePedido(Pedido pedido) {
        List<DetallePedido> detalles = detallePedidoRepository.findByPedido(pedido);

        for (DetallePedido detalle : detalles) {
            Plato plato = detalle.getPlato();
            int cantidadPedida = detalle.getCantidad();

            List<PlatoInsumo> receta = platoInsumoRepository.findByPlato(plato);

            for (PlatoInsumo ingrediente : receta) {
                Insumo insumo = ingrediente.getInsumo();
                double cantidadUsadaPorPlato = ingrediente.getCantidadUsada();

                double totalADescontar = cantidadUsadaPorPlato * cantidadPedida;

                Insumo insumoBD = insumoRepository.findById(insumo.getIdInsumo())
                        .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

                double stockActual = insumoBD.getStock();
                insumoBD.setStock(stockActual - totalADescontar);
                insumoRepository.save(insumoBD);
            }
        }
    }

    // --- Métodos de consulta básicos ---
    @Override
    public List<Pedido> listarTodosLosPedidos() {
        return pedidoRepository.findAll();
    }

    @Override
    public Pedido obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado: " + id));
    }
}
