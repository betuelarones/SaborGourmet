package com.tecsup.semana12.controller;

import com.tecsup.semana12.dto.AsociacionDTO;
import com.tecsup.semana12.model.Plato;
import com.tecsup.semana12.model.PlatoInsumo;
import com.tecsup.semana12.service.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/platos")
public class PlatoController {

    @Autowired
    private PlatoService platoService;
    @PostMapping
    public Plato crearPlato(@RequestBody Plato plato) {
        return platoService.registrarPlato(plato);
    }


    @GetMapping
    public List<Plato> listarPlatos() {
        return platoService.listarPlatos();
    }

    @GetMapping("/{id}")
    public Plato obtenerPlato(@PathVariable Long id) {
        return platoService.obtenerPlatoPorId(id);
    }

    // ---
    // Endpoint para RF5: Ver la "receta" de un plato
    // URL: GET /api/platos/5/insumos
    // ---
    @GetMapping("/{idPlato}/insumos")
    public List<PlatoInsumo> getInsumosDelPlato(@PathVariable Long idPlato) {
        return platoService.obtenerInsumosPorPlato(idPlato);
    }


    @PostMapping("/{idPlato}/insumos")
    public PlatoInsumo asociarInsumo(@PathVariable Long idPlato, @RequestBody AsociacionDTO dto) {
        return platoService.asociarInsumo(idPlato, dto.getIdInsumo(), dto.getCantidad());
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'cocinero')")
    public Plato actualizarPlato(@PathVariable Long id, @RequestBody Plato platoActualizado) {
        return platoService.actualizarPlato(id, platoActualizado);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'cocinero')")
    public void eliminarPlato(@PathVariable Long id) {
        platoService.eliminarPlato(id);
    }
}