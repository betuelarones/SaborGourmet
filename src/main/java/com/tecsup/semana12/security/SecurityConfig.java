package com.tecsup.semana12.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;
    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Deshabilitar CSRF para APIs stateless
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/mesas/**", "/api/pedidos/**").hasAnyAuthority("admin", "cajero", "mozo")

                        // GESTIÓN DE COCINA (Cocinero, Admin)
                        .requestMatchers("/api/platos/**", "/api/insumos/**").hasAnyAuthority("admin", "cocinero")

                        // GESTIÓN DE CLIENTES Y FACTURACIÓN (Cajero, Admin)
                        .requestMatchers("/api/clientes/**", "/api/facturas/**").hasAnyAuthority("admin", "cajero")

                        // GESTIÓN COMPLETA (Solo Admin)
                        .requestMatchers("/api/compras/**", "/api/proveedores/**", "/api/reportes/**", "/api/usuarios/**").hasAuthority("admin")

                        // Todo el resto de peticiones deben estar autenticadas
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Añadir nuestro filtro

        return http.build();
    }
}
