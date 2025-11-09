package com.tecsup.semana12.controller;

import com.tecsup.semana12.model.Cliente;
import com.tecsup.semana12.service.ClienteService;
import com.tecsup.semana12.service.ClienteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public Cliente crearCliente(@RequestBody Cliente cliente) {
        return clienteService.registrarCliente(cliente);
    }

    // ---
    // Endpoint para RF1: Consultar clientes
    // URL: GET /api/clientes
    // ---
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteService.listarTodosLosClientes();
    }

    // ---
    // Endpoint para consultar un solo cliente por ID
    // URL: GET /api/clientes/5 (ejemplo)
    // ---
    @GetMapping("/{id}")
    public Cliente obtenerCliente(@PathVariable Long id) {
        return clienteService.obtenerClientePorId(id);
    }

    // ---
    // Endpoint para actualizar un cliente
    // URL: PUT /api/clientes/5 (ejemplo)
    // ---
    @PutMapping("/{id}")
    public Cliente actualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteActualizado) {
        return clienteService.actualizarCliente(id, clienteActualizado);
    }

    // ---
    // Endpoint para eliminar un cliente
    // URL: DELETE /api/clientes/5 (ejemplo)
    // ---
    @DeleteMapping("/{id}")
    public void eliminarCliente(@PathVariable Long id) {
        clienteService.eliminarCliente(id);
    }

}