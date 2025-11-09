package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Mesa;
import com.tecsup.semana12.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesaServiceImpl implements MesaService {

    @Autowired
    private MesaRepository mesaRepository;

    // --- Implementación del CRUD ---

    @Override
    public Mesa crearMesa(Mesa mesa) {
        // Al crear una mesa, por defecto debe estar "disponible"
        mesa.setEstado("disponible");
        return mesaRepository.save(mesa);
    }

    @Override
    public List<Mesa> listarTodasLasMesas() {
        return mesaRepository.findAll();
    }

    @Override
    public Mesa obtenerMesaPorId(Long id) {
        return mesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada con ID: " + id));
    }

    @Override
    public void eliminarMesa(Long id) {
        mesaRepository.deleteById(id);
    }

    // --- Implementación de RF2: Asignar y Liberar ---

    @Override
    public Mesa asignarMesa(Long id) {
        Mesa mesa = obtenerMesaPorId(id);

        // Validación de negocio: Solo se puede asignar una mesa "disponible"
        if (!"disponible".equals(mesa.getEstado())) {
            throw new RuntimeException("La mesa " + id + " no está disponible.");
        }

        mesa.setEstado("ocupada");
        return mesaRepository.save(mesa);
    }

    @Override
    public Mesa liberarMesa(Long id) {
        Mesa mesa = obtenerMesaPorId(id);

        // Aquí podrías validar que solo mesas "ocupadas" o "reservadas" se liberen
        mesa.setEstado("disponible");
        return mesaRepository.save(mesa);
    }

    @Override
    public Mesa reservarMesa(Long id) {
        Mesa mesa = obtenerMesaPorId(id);
        if (!"disponible".equals(mesa.getEstado())) {
            throw new RuntimeException("La mesa " + id + " no está disponible para reservar.");
        }
        mesa.setEstado("reservada");
        return mesaRepository.save(mesa);
    }

    @Override
    public Mesa ponerEnMantenimiento(Long id) {
        Mesa mesa = obtenerMesaPorId(id);
        mesa.setEstado("mantenimiento");
        return mesaRepository.save(mesa);
    }

    // --- Implementación de RF3: Listar Disponibles ---

    @Override
    public List<Mesa> listarMesasDisponibles() {
        // Reutilizamos el metodo que creamos en el repositorio
        return mesaRepository.findByEstado("disponible");
    }
}