package com.tecsup.semana12.controller;

import com.tecsup.semana12.dto.CompraRequestDTO;
import com.tecsup.semana12.model.Compra;
import com.tecsup.semana12.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compras")
public class CompraController {

    @Autowired
    private CompraService compraService;


    @PostMapping
    public Compra registrarCompra(@RequestBody CompraRequestDTO compraDTO) {
        return compraService.registrarCompra(compraDTO);
    }
}