package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Cliente;

import java.util.List;

public interface ClienteService {
    // RF1: Registrar clientes
    Cliente registrarCliente(Cliente cliente);

    // RF1: Consultar clientes (Todos)
    List<Cliente> listarTodosLosClientes();

    // (Agreguemos los métodos básicos de un CRUD)
    Cliente obtenerClientePorId(Long id);
    Cliente actualizarCliente(Long id, Cliente clienteActualizado);
    void eliminarCliente(Long id);
}
