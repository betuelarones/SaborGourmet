package com.tecsup.semana12.repository;

import com.tecsup.semana12.model.Bitacora;
import com.tecsup.semana12.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BitacoraRepository extends JpaRepository<Bitacora,Long> {
    List<Bitacora> findByUsuarioIdUsuario(Long IdUsuario);
}
