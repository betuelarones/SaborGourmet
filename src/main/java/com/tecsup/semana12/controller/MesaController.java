package com.tecsup.semana12.controller;

import com.tecsup.semana12.model.Mesa;
import com.tecsup.semana12.service.MesaService;
import com.tecsup.semana12.service.MesaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mesas")
public class MesaController {
    @Autowired
    private MesaService mesaService;

    // --- Endpoint para RF3: Mostrar mesas disponibles ---
    // URL: GET /api/mesas/disponibles
    @GetMapping("/disponibles")
    public List<Mesa> getMesasDisponibles() {
        return mesaService.listarMesasDisponibles();
    }

    // --- Endpoint para RF2: Asignar mesa ---
    // URL: PUT /api/mesas/5/asignar
    @PutMapping("/{id}/asignar")
    public Mesa asignarMesa(@PathVariable Long id) {
        return mesaService.asignarMesa(id);
    }

    // --- Endpoint para RF2: Liberar mesa ---
    // URL: PUT /api/mesas/5/liberar
    @PutMapping("/{id}/liberar")
    public Mesa liberarMesa(@PathVariable Long id) {
        return mesaService.liberarMesa(id);
    }

    // --- Endpoints CRUD Básicos ---

    // URL: POST /api/mesas (Para crear una nueva mesa)
    @PostMapping
    public Mesa crearMesa(@RequestBody Mesa mesa) {
        return mesaService.crearMesa(mesa);
    }

    // URL: GET /api/mesas (Para listar todas las mesas)
    @GetMapping
    public List<Mesa> getAllMesas() {
        return mesaService.listarTodasLasMesas();
    }

    // URL: GET /api/mesas/5
    @GetMapping("/{id}")
    public Mesa getMesaById(@PathVariable Long id) {
        return mesaService.obtenerMesaPorId(id);
    }
}