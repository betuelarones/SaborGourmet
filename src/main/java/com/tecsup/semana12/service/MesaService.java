package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Mesa;
import com.tecsup.semana12.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesaService {
    @Autowired
    private MesaRepository repo;

    public Mesa asignarMesa(Long idMesa) {
        Mesa mesa = repo.findById(idMesa).orElseThrow(() -> new RuntimeException("Mesa no encontrada"));
        if(!mesa.getEstado().equals("disponible")) throw new RuntimeException("Mesa ocupada");
        mesa.setEstado("ocupada");
        return repo.save(mesa);
    }

    public List<Mesa> mesasDisponibles() {
        return repo.findByEstado("disponible");
    }
}