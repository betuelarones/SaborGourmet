package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.Plato;
import com.tecsup.semana12.model.PlatoInsumo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlatoInsumoRepository extends JpaRepository<PlatoInsumo, Long> {
    List<PlatoInsumo> findByPlatoIdPlato(Long idPlato);

    List<PlatoInsumo> findByPlato(Plato plato);
}
