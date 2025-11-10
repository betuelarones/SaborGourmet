package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Mesa;

import java.util.List;

public interface MesaService {
    Mesa crearMesa(Mesa mesa);
    List<Mesa> listarTodasLasMesas();
    Mesa obtenerMesaPorId(Long id);
    Mesa actualizarMesa(Long id, Mesa mesaActualizada);
    void eliminarMesa(Long id);

    // --- Métodos para RF2: Asignar y liberar ---
    Mesa asignarMesa(Long id);
    Mesa liberarMesa(Long id);
    // (Opcional) Otros cambios de estado
    Mesa reservarMesa(Long id);
    Mesa ponerEnMantenimiento(Long id);

    // --- Método para RF3: Mostrar disponibles ---
    List<Mesa> listarMesasDisponibles();
}
