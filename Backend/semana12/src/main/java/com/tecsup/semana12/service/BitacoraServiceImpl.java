package com.tecsup.semana12.service;

import com.tecsup.semana12.model.Bitacora;
import com.tecsup.semana12.repository.BitacoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BitacoraServiceImpl implements BitacoraService {

    @Autowired
    private BitacoraRepository bitacoraRepository;

    @Override
    public void registrarAccion(Bitacora bitacora) {
        bitacoraRepository.save(bitacora);
    }
}
