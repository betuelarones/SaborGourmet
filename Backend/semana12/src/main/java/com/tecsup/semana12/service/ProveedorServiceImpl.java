package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Proveedor;
import com.tecsup.semana12.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProveedorServiceImpl implements ProveedorService {

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Override
    public Proveedor registrarProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    @Override
    public List<Proveedor> listarProveedores() {
        return proveedorRepository.findAll();
    }

    @Override
    public Proveedor obtenerProveedorPorId(Long id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado: " + id));
    }

    // --- NUEVO ---
    @Override
    public Proveedor actualizarProveedor(Long id, Proveedor proveedorActualizado) {
        // 1. Buscar el proveedor existente
        Proveedor proveedorExistente = obtenerProveedorPorId(id); // Reutilizamos el método

        // 2. Actualizar los campos
        proveedorExistente.setRuc(proveedorActualizado.getRuc());
        proveedorExistente.setNombre(proveedorActualizado.getNombre());
        proveedorExistente.setTelefono(proveedorActualizado.getTelefono());
        proveedorExistente.setCorreo(proveedorActualizado.getCorreo());
        proveedorExistente.setDireccion(proveedorActualizado.getDireccion());

        // 3. Guardar los cambios
        return proveedorRepository.save(proveedorExistente);
    }

    // --- NUEVO ---
    @Override
    public void eliminarProveedor(Long id) {
        Proveedor proveedorExistente = obtenerProveedorPorId(id);
        proveedorRepository.delete(proveedorExistente);
    }
}
