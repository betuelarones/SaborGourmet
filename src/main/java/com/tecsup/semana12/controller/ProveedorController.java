package com.tecsup.semana12.controller;

import com.tecsup.semana12.model.Proveedor;
import com.tecsup.semana12.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {

    @Autowired
    private ProveedorService proveedorService;

    // POST (Crear)
    @PostMapping
    public Proveedor crearProveedor(@RequestBody Proveedor proveedor) {
        return proveedorService.registrarProveedor(proveedor);
    }

    // GET (Listar todos)
    @GetMapping
    public List<Proveedor> listarProveedores() {
        return proveedorService.listarProveedores();
    }

    // GET (Obtener uno por ID)
    @GetMapping("/{id}")
    public Proveedor obtenerProveedor(@PathVariable Long id) {
        return proveedorService.obtenerProveedorPorId(id);
    }

    // --- NUEVO ---
    // PUT (Actualizar)
    // URL: PUT /api/proveedores/1
    @PutMapping("/{id}")
    public Proveedor actualizarProveedor(@PathVariable Long id, @RequestBody Proveedor proveedorActualizado) {
        return proveedorService.actualizarProveedor(id, proveedorActualizado);
    }

    // --- NUEVO ---
    // DELETE (Eliminar)
    // URL: DELETE /api/proveedores/1
    @DeleteMapping("/{id}")
    public void eliminarProveedor(@PathVariable Long id) {
        proveedorService.eliminarProveedor(id);
    }
}
