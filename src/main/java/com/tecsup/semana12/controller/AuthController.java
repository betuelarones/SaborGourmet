package com.tecsup.semana12.controller;


import com.tecsup.semana12.dto.AuthResponseDTO;
import com.tecsup.semana12.dto.LoginRequestDTO;
import com.tecsup.semana12.dto.RegisterRequestDTO;
import com.tecsup.semana12.model.Usuario;
import com.tecsup.semana12.repository.UsuarioRepository;
import com.tecsup.semana12.security.JwtService;
import com.tecsup.semana12.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JwtService jwtService;

    // ---
    // Endpoint para RF18: Login
    // URL: POST /api/auth/login
    // ---
    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginRequestDTO request) {
        // El AuthenticationManager se encarga de validar usuario y contraseña
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getNombreUsuario(),
                        request.getContraseña()
                )
        );
        // Si la autenticación fue exitosa, buscamos al usuario
        Usuario usuario = usuarioRepository.findByNombreUsuario(request.getNombreUsuario())
                .orElseThrow(() -> new RuntimeException("Error inesperado post-autenticación"));

        // Generamos el token JWT
        String token = jwtService.generateToken(usuario);
        return new AuthResponseDTO(token);
    }

    // ---
    // Endpoint para RF16: Registrar un nuevo usuario
    // URL: POST /api/auth/register
    // ---
    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody RegisterRequestDTO request) {
        // El servicio se encarga de encriptar la contraseña
        Usuario usuario = usuarioService.registrarUsuario(request);

        // Generamos un token inmediatamente
        String token = jwtService.generateToken(usuario);
        return new AuthResponseDTO(token);
    }
}
