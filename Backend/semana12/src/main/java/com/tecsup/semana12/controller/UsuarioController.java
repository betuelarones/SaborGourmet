package com.tecsup.semana12.controller;

import com.tecsup.semana12.dto.RegisterRequestDTO;
import com.tecsup.semana12.dto.UsuarioUpdateDTO;
import com.tecsup.semana12.model.Usuario;
import com.tecsup.semana12.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    // Este endpoint está protegido por el SecurityConfig
    // Solo el "admin" puede listar usuarios
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario obtenerUsuario(@PathVariable Long id) {
        return usuarioService.obtenerUsuarioPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
    }

    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioUpdateDTO updateDTO) {
        return usuarioService.actualizarUsuario(id, updateDTO);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario crearUsuario(@RequestBody RegisterRequestDTO registerRequest) {
        return usuarioService.registrarUsuario(registerRequest);
    }

}
