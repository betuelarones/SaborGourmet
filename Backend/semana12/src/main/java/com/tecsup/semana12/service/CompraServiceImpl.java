package com.tecsup.semana12.service;


import com.tecsup.semana12.dto.CompraRequestDTO;
import com.tecsup.semana12.dto.DetalleCompraDTO;
import com.tecsup.semana12.model.Compra;
import com.tecsup.semana12.model.DetalleCompra;
import com.tecsup.semana12.model.Insumo;
import com.tecsup.semana12.model.Proveedor;
import com.tecsup.semana12.repository.CompraRepository;
import com.tecsup.semana12.repository.DetalleCompraRepository;
import com.tecsup.semana12.repository.InsumoRepository;
import com.tecsup.semana12.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class CompraServiceImpl implements CompraService {

    @Autowired
    private CompraRepository compraRepository;
    @Autowired private DetalleCompraRepository detalleCompraRepository;
    @Autowired private ProveedorRepository proveedorRepository;
    @Autowired private InsumoRepository insumoRepository;


    @Transactional
    public Compra registrarCompra(CompraRequestDTO compraDTO) {

        // 1. Validar y obtener el Proveedor
        Proveedor proveedor = proveedorRepository.findById(compraDTO.getIdProveedor())
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));

        // 2. Crear la Compra principal
        Compra compra = new Compra();
        compra.setProveedor(proveedor);
        compra.setFechaCompra(LocalDateTime.now());
        compra.setTotal(BigDecimal.ZERO); // Se calculará después

        Compra compraGuardada = compraRepository.save(compra);

        // 3. Preparar lista de detalles y calcular total
        List<DetalleCompra> detallesAGuardar = new ArrayList<>();
        BigDecimal totalCalculado = BigDecimal.ZERO;

        for (DetalleCompraDTO detalleDTO : compraDTO.getDetalles()) {
            Insumo insumo = insumoRepository.findById(detalleDTO.getIdInsumo())
                    .orElseThrow(() -> new RuntimeException("Insumo no encontrado: " + detalleDTO.getIdInsumo()));

            // 4. (RF14) Actualizar el stock del insumo
            double stockActual = insumo.getStock();
            insumo.setStock(stockActual + detalleDTO.getCantidad());
            insumoRepository.save(insumo);

            // 5. Crear el Detalle de Compra
            DetalleCompra detalle = new DetalleCompra();
            detalle.setCompra(compraGuardada);
            detalle.setInsumo(insumo);
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(detalleDTO.getPrecioUnitario());

            BigDecimal subtotal = detalleDTO.getPrecioUnitario().multiply(BigDecimal.valueOf(detalleDTO.getCantidad()));
            detalle.setSubtotal(subtotal);

            detallesAGuardar.add(detalle);

            // 6. Sumar al total
            totalCalculado = totalCalculado.add(subtotal);
        }

        // 7. Guardar todos los detalles
        detalleCompraRepository.saveAll(detallesAGuardar);

        // 8. Actualizar la compra con el total real y la lista
        compraGuardada.setTotal(totalCalculado);
        compraGuardada.setDetalles(detallesAGuardar);

        return compraGuardada;
    }
}
