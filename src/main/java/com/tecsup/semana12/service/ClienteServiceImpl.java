package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Cliente;
import com.tecsup.semana12.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public Cliente registrarCliente(Cliente cliente) {
        // Aquí podrías añadir validaciones (ej. DNI único)
        return clienteRepository.save(cliente);
    }

    @Override
    public List<Cliente> listarTodosLosClientes() {
        return clienteRepository.findAll();
    }

    @Override
    public Cliente obtenerClientePorId(Long id) {
        // .orElseThrow() es útil para manejar si no se encuentra
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + id));
    }

    @Override
    public Cliente actualizarCliente(Long id, Cliente clienteActualizado) {
        Cliente clienteExistente = obtenerClientePorId(id); // Reusa el método de buscar

        // Actualiza los campos que vienen del modelo
        clienteExistente.setNombres(clienteActualizado.getNombres());
        clienteExistente.setApellidos(clienteActualizado.getApellidos());
        clienteExistente.setDni(clienteActualizado.getDni());
        clienteExistente.setTelefono(clienteActualizado.getTelefono());
        clienteExistente.setCorreo(clienteActualizado.getCorreo());
        clienteExistente.setEstado(clienteActualizado.getEstado());

        return clienteRepository.save(clienteExistente);
    }

    @Override
    public void eliminarCliente(Long id) {
        Cliente clienteExistente = obtenerClientePorId(id);
        // Opcional: Podrías hacer un "borrado lógico"
        // clienteExistente.setEstado("inactivo");
        // clienteRepository.save(clienteExistente);

        // Borrado físico:
        clienteRepository.delete(clienteExistente);
    }
}
