package com.tecsup.semana12.aop;

import com.tecsup.semana12.model.Bitacora;
import com.tecsup.semana12.model.Usuario;
import com.tecsup.semana12.repository.UsuarioRepository;
import com.tecsup.semana12.service.BitacoraService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class BitacoraAspect {
    @Autowired
    private BitacoraService bitacoraService;

    @Autowired
    private UsuarioRepository usuarioRepository; // Para buscar al usuario por su nombre

    // 1. Definir el "Pointcut": Dónde se va a ejecutar este código.
    // Queremos que se ejecute en todos los métodos de nuestras clases *ServiceImpl
    // que NO sean los de BitacoraServiceImpl (para evitar un bucle infinito).
    @Pointcut("execution(* com.tecsup.semana12.service.*ServiceImpl.*(..)) && " +
            "!execution(* com.tecsup.semana12.service.BitacoraServiceImpl.*(..))")
    public void metodosDeServicio() {}

    // 2. Definir el "Advice": Qué código se va a ejecutar.
    // @AfterReturning: Se ejecuta DESPUÉS de que el método termine exitosamente.
    @AfterReturning(pointcut = "metodosDeServicio()")
    public void registrarEnBitacora(JoinPoint joinPoint) {

        // ---
        // ESTA PARTE ES LA QUE DEPENDE DE SPRING SECURITY (RF18)
        // ---
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nombreUsuario = "SISTEMA"; // Valor por defecto
        Usuario usuario = null;

        if (authentication != null && !"anonymousUser".equals(authentication.getName())) {
            nombreUsuario = authentication.getName(); // Obtiene el "username" del usuario logueado
            // (Necesitarás un método findByNombreUsuario en tu UsuarioRepository)
            usuario = usuarioRepository.findByNombreUsuario(nombreUsuario).orElse(null);
        }
        // ---
        // FIN DE LA PARTE DEPENDIENTE
        // ---

        // 3. Obtener los datos para la bitácora
        String nombreMetodo = joinPoint.getSignature().getName(); // Ej: "registrarCliente"
        String nombreClase = joinPoint.getTarget().getClass().getSimpleName(); // Ej: "ClienteServiceImpl"
        String accion = nombreClase + "." + nombreMetodo;

        // 4. Crear y guardar el registro
        Bitacora registro = new Bitacora();
        registro.setUsuario(usuario); // Será 'null' hasta que tengamos Security
        registro.setAccion(accion);
        registro.setFechaHora(LocalDateTime.now());

        bitacoraService.registrarAccion(registro);
    }
}
