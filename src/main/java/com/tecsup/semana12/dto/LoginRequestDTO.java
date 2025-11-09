package com.tecsup.semana12.dto;

public class LoginRequestDTO {
    private String nombreUsuario;
    private String contraseña;
    // Getters y Setters
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String n) { this.nombreUsuario = n; }
    public String getContraseña() { return contraseña; }
    public void setContraseña(String c) { this.contraseña = c; }
}
