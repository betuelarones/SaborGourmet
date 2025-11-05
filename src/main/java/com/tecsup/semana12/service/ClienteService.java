package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Cliente;
import com.tecsup.semana12.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repo;

    public Cliente crearCliente(Cliente cliente) {
        return repo.save(cliente);
    }

    public List<Cliente> listarClientes() {
        return repo.findAll();
    }
}
