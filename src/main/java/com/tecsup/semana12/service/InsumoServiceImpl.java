package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Insumo;
import com.tecsup.semana12.repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsumoServiceImpl implements InsumoService {
    @Autowired
    private InsumoRepository insumoRepository;

    @Override
    public Insumo registrarInsumo(Insumo insumo) {
        return insumoRepository.save(insumo);
    }

    @Override
    public List<Insumo> listarInsumos() {
        return insumoRepository.findAll();
    }

    @Override
    public Insumo obtenerInsumoPorId(Long id) {
        return insumoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado: " + id));
    }

    @Override
    public Insumo actualizarStock(Long id, double cantidadComprada) {
        Insumo insumo = obtenerInsumoPorId(id);
        insumo.setStock(insumo.getStock() + cantidadComprada);
        return insumoRepository.save(insumo);
    }

    @Override
    public List<Insumo> listarInsumosConStockBajo() {
        // Filtramos todos los insumos para encontrar los que están bajo el mínimo
        return insumoRepository.findAll().stream()
                .filter(insumo -> insumo.getStock() < insumo.getStockMinimo())
                .collect(Collectors.toList());
    }
}
