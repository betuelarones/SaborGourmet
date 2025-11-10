package com.tecsup.semana12.dto;

public class RegisterRequestDTO {
    private String nombreUsuario;
    private String contraseña;
    private String rol;
    // Getters y Setters
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String n) { this.nombreUsuario = n; }
    public String getContraseña() { return contraseña; }
    public void setContraseña(String c) { this.contraseña = c; }
    public String getRol() { return rol; }
    public void setRol(String r) { this.rol = r; }
}
