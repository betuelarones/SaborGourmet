package com.tecsup.semana12.service;


import com.tecsup.semana12.model.Insumo;
import com.tecsup.semana12.model.Plato;
import com.tecsup.semana12.model.PlatoInsumo;
import com.tecsup.semana12.repository.InsumoRepository;
import com.tecsup.semana12.repository.PlatoInsumoRepository;
import com.tecsup.semana12.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlatoServiceImpl implements PlatoService {
    @Autowired
    private PlatoRepository platoRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private PlatoInsumoRepository platoInsumoRepository;

    // --- RF4 ---
    @Override
    public Plato registrarPlato(Plato plato) {
        return platoRepository.save(plato);
    }

    @Override
    public List<Plato> listarPlatos() {
        return platoRepository.findAll();
    }

    @Override
    public Plato obtenerPlatoPorId(Long id) {
        return platoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plato no encontrado: " + id));
    }

    // --- RF5 ---
    @Override
    public PlatoInsumo asociarInsumo(Long idPlato, Long idInsumo, double cantidad) {
        Plato plato = platoRepository.findById(idPlato)
                .orElseThrow(() -> new RuntimeException("Plato no encontrado: " + idPlato));

        Insumo insumo = insumoRepository.findById(idInsumo)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado: " + idInsumo));

        // Creamos la nueva entrada en la tabla pivote
        PlatoInsumo asociacion = new PlatoInsumo();
        asociacion.setPlato(plato);
        asociacion.setInsumo(insumo);
        asociacion.setCantidadUsada(cantidad);

        return platoInsumoRepository.save(asociacion);
    }

    @Override
    public List<PlatoInsumo> obtenerInsumosPorPlato(Long idPlato) {
        return platoInsumoRepository.findByPlatoIdPlato(idPlato);
    }

    @Override
    @Transactional
    public Plato actualizarPlato(Long id, Plato platoActualizado) {
        // 1. Busca el plato existente en la BD
        Plato platoExistente = platoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plato no encontrado con ID: " + id));

        // 2. Actualiza los campos
        platoExistente.setNombre(platoActualizado.getNombre());
        platoExistente.setDescripcion(platoActualizado.getDescripcion());
        platoExistente.setPrecio(platoActualizado.getPrecio());
        platoExistente.setTipo(platoActualizado.getTipo());
        platoExistente.setEstado(platoActualizado.getEstado());
        // (La receta de insumos se manejaría por separado, si quisiéramos)

        // 3. Guarda el plato actualizado
        return platoRepository.save(platoExistente);
    }

    @Override
    @Transactional
    public void eliminarPlato(Long id) {
        Plato plato = platoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plato no encontrado con ID: " + id));
        platoRepository.delete(plato);
    }
}
