package com.tecsup.semana12.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class FacturaDTO {

    private Long idFactura;
    private LocalDateTime fechaemision;
    private BigDecimal total;
    private String metodoPago;
    private String estado;


}
