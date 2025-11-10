package com.tecsup.semana12.service;

import com.tecsup.semana12.model.DetalleFactura;
import com.tecsup.semana12.model.DetallePedido;
import com.tecsup.semana12.model.Factura;
import com.tecsup.semana12.model.Pedido;
import com.tecsup.semana12.repository.DetalleFacturaRepository;
import com.tecsup.semana12.repository.DetallePedidoRepository;
import com.tecsup.semana12.repository.FacturaRepository;
import com.tecsup.semana12.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class FacturaServiceImpl implements FacturaService {

    @Autowired
    private FacturaRepository facturaRepository;
    @Autowired private DetalleFacturaRepository detalleFacturaRepository;
    @Autowired private PedidoRepository pedidoRepository;
    @Autowired private DetallePedidoRepository detallePedidoRepository;

    // Inyectamos PedidoService para reutilizar la lógica de cambiar estado
    @Autowired private PedidoService pedidoService;

    // service/impl/FacturaServiceImpl.java

    @Override
    @Transactional
    public Factura generarFactura(Long idPedido, String metodoPago) {

        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        if ("cerrado".equals(pedido.getEstado()) || "pagado".equals(pedido.getEstado())) {
            throw new RuntimeException("Este pedido ya fue facturado.");
        }

        List<DetallePedido> detallesDelPedido = detallePedidoRepository.findByPedido(pedido);

        // 2. Calcular el total (CORREGIDO)
        BigDecimal totalCalculado = detallesDelPedido.stream()
                .map(DetallePedido::getSubtotal)
                .filter(java.util.Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 3. Crear la Factura principal
        Factura factura = new Factura();
        factura.setPedido(pedido);
        factura.setFechaEmision(LocalDateTime.now());
        factura.setMetodoPago(metodoPago);
        factura.setEstado("pagado");
        factura.setTotal(totalCalculado); // Perfecto, ambos son BigDecimal

        Factura facturaGuardada = facturaRepository.save(factura);

        // 4. Crear los Detalles de la Factura
        for (DetallePedido detallePedido : detallesDelPedido) {
            DetalleFactura detalleFactura = new DetalleFactura();
            detalleFactura.setFactura(facturaGuardada);

            String concepto = detallePedido.getPlato().getNombre() +
                    " x " + detallePedido.getCantidad();
            detalleFactura.setConcepto(concepto);

            // ¡CAMBIO AQUÍ! Asignación directa
            detalleFactura.setMonto(detallePedido.getSubtotal());
            BigDecimal monto = detallePedido.getSubtotal();
            detalleFactura.setMonto( (monto == null) ? BigDecimal.ZERO : monto );
            detalleFacturaRepository.save(detalleFactura);
        }

        // 5. "Cerrar" el pedido
        pedidoService.cambiarEstadoPedido(idPedido, "cerrado");

        return facturaGuardada;
    }

    // ... (Implementar los otros métodos de consulta si los añadiste) ...
    @Override
    public Factura obtenerFacturaPorId(Long id) {
        return facturaRepository.findById(id).orElse(null);
    }

    @Override
    public List<Factura> listarTodasLasFacturas() {
        return facturaRepository.findAll();
    }
}
