package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MesaRepository extends JpaRepository<Mesa, Long> {
    List<Mesa> findByEstado(String estado); // Para mesas disponibles
}