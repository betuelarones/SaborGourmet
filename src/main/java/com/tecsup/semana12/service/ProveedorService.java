package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Proveedor;

import java.util.List;

public interface ProveedorService {

    // CREAR
    Proveedor registrarProveedor(Proveedor proveedor);

    // LEER (Todos)
    List<Proveedor> listarProveedores();

    // LEER (Uno)
    Proveedor obtenerProveedorPorId(Long id);

    // ACTUALIZAR
    Proveedor actualizarProveedor(Long id, Proveedor proveedorActualizado);

    // ELIMINAR
    void eliminarProveedor(Long id);
}
