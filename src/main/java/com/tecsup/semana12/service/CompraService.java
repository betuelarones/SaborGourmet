    package com.tecsup.semana12.service;

    import com.tecsup.semana12.dto.CompraRequestDTO;
    import com.tecsup.semana12.model.Compra;

    public interface CompraService {

        Compra registrarCompra(CompraRequestDTO compraDTO);
    }
