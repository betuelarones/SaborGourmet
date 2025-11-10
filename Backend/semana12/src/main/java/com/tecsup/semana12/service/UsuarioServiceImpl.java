package com.tecsup.semana12.service;


import com.tecsup.semana12.dto.RegisterRequestDTO;
import com.tecsup.semana12.dto.UsuarioUpdateDTO;
import com.tecsup.semana12.model.Usuario;
import com.tecsup.semana12.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Usuario registrarUsuario(RegisterRequestDTO registerRequest) {

        // (Opcional: validar que el rol sea uno de los permitidos)

        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(registerRequest.getNombreUsuario());
        usuario.setContraseña(passwordEncoder.encode(registerRequest.getContraseña()));
        usuario.setRol(registerRequest.getRol());
        usuario.setEstado("activo");

        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public Usuario actualizarUsuario(Long id, UsuarioUpdateDTO usuarioUpdateDTO) {
        Usuario usuarioExistente = obtenerUsuarioPorId(id);

        if (usuarioUpdateDTO.getRol() != null) {
            usuarioExistente.setRol(usuarioUpdateDTO.getRol());
        }
        if (usuarioUpdateDTO.getEstado() != null) {
            usuarioExistente.setEstado(usuarioUpdateDTO.getEstado());
        }

        return usuarioRepository.save(usuarioExistente);
    }
}
