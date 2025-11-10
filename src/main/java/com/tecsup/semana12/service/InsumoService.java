package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Insumo;

import java.util.List;

public interface InsumoService {
    Insumo registrarInsumo(Insumo insumo);
    List<Insumo> listarInsumos();
    Insumo obtenerInsumoPorId(Long id);
    Insumo actualizarStock(Long id, double cantidadComprada); // Para RF14 (Compras)
    Insumo actualizarInsumo(Long id, Insumo insumoActualizado);
    void eliminarInsumo(Long id);
    // RF15: Metodo para verificar y alertar stock bajo
    List<Insumo> listarInsumosConStockBajo();
}
