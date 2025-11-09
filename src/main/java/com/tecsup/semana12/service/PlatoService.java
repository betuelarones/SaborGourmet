package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Plato;
import com.tecsup.semana12.model.PlatoInsumo;

import java.util.List;

public interface PlatoService {
    // RF4: Registrar platos
    Plato registrarPlato(Plato plato);
    List<Plato> listarPlatos();
    Plato obtenerPlatoPorId(Long id);

    // RF5: Asociar insumos a un plato
    PlatoInsumo asociarInsumo(Long idPlato, Long idInsumo, double cantidad);

    // Método para ver la "receta" de un plato
    List<PlatoInsumo> obtenerInsumosPorPlato(Long idPlato);
}
