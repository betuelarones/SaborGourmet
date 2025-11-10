package com.tecsup.semana12.controller;

import com.tecsup.semana12.model.Cliente;
import com.tecsup.semana12.service.ClienteService;
import com.tecsup.semana12.service.ClienteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // ---
    // Endpoint para RF1: Registrar clientes
    // URL: POST /api/clientes
    // ---
    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public Cliente crearCliente(@RequestBody Cliente cliente) {
        return clienteService.registrarCliente(cliente);
    }

    // ---
    // Endpoint para RF1: Consultar clientes
    // URL: GET /api/clientes
    // ---
    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin', 'mozo')")
    public List<Cliente> listarClientes() {
        return clienteService.listarTodosLosClientes();
    }

    // ---
    // Endpoint para consultar un solo cliente por ID
    // URL: GET /api/clientes/5 (ejemplo)
    // ---
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public Cliente obtenerCliente(@PathVariable Long id) {
        return clienteService.obtenerClientePorId(id);
    }

    // ---
    // Endpoint para actualizar un cliente
    // URL: PUT /api/clientes/5 (ejemplo)
    // ---
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public Cliente actualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteActualizado) {
        return clienteService.actualizarCliente(id, clienteActualizado);
    }

    // ---
    // Endpoint para eliminar un cliente
    // URL: DELETE /api/clientes/5 (ejemplo)
    // ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public void eliminarCliente(@PathVariable Long id) {
        clienteService.eliminarCliente(id);
    }

}