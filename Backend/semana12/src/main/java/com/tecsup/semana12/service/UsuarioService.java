package com.tecsup.semana12.service;

import com.tecsup.semana12.dto.RegisterRequestDTO;
import com.tecsup.semana12.dto.UsuarioUpdateDTO;
import com.tecsup.semana12.model.Usuario;

import java.util.List;

public interface UsuarioService {

    // RF16: Registrar usuario (usado por el AuthController)
    Usuario registrarUsuario(RegisterRequestDTO registerRequest);

    // Métodos para que el Admin gestione usuarios
    List<Usuario> listarUsuarios();

    Usuario obtenerUsuarioPorId(Long id);

    void eliminarUsuario(Long id);

    Usuario actualizarUsuario(Long id, UsuarioUpdateDTO usuarioUpdateDTO);

}
