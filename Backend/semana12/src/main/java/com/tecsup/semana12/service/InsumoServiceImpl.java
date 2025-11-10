package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Insumo;
import com.tecsup.semana12.repository.InsumoRepository;
import com.tecsup.semana12.repository.PlatoInsumoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsumoServiceImpl implements InsumoService {
    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private PlatoInsumoRepository platoInsumoRepository;

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

    @Override
    @Transactional
    public Insumo actualizarInsumo(Long id, Insumo insumoActualizado) {
        Insumo insumoExistente = obtenerInsumoPorId(id);

        insumoExistente.setNombre(insumoActualizado.getNombre());
        insumoExistente.setUnidadMedida(insumoActualizado.getUnidadMedida());
        insumoExistente.setStock(insumoActualizado.getStock());
        insumoExistente.setStockMinimo(insumoActualizado.getStockMinimo());
        insumoExistente.setPrecioCompra(insumoActualizado.getPrecioCompra());

        return insumoRepository.save(insumoExistente);
    }

    @Override
    @Transactional
    public void eliminarInsumo(Long id) {
        Insumo insumo = obtenerInsumoPorId(id);
        boolean enUso = platoInsumoRepository.existsByInsumo_IdInsumo(id);
        if (enUso) {
            throw new RuntimeException("No se puede eliminar el insumo. Está siendo usado en la receta de uno o más platos.");
        }
        insumoRepository.delete(insumo);
    }
}
