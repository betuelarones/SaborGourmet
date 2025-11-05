package com.tecsup.semana12.controller;

import com.tecsup.semana12.model.Mesa;
import com.tecsup.semana12.service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mesas")
public class MesaController {
    @Autowired
    private MesaService service;

    @PostMapping("/{id}/asignar")
    public ResponseEntity<Mesa> asignar(@PathVariable Long id) {
        return ResponseEntity.ok(service.asignarMesa(id));
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Mesa>> disponibles() {
        return ResponseEntity.ok(service.mesasDisponibles());
    }
}