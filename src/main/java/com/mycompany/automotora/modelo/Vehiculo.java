/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.automotora.modelo;

/**
 *
 * @author benja
 */
public class Vehiculo {

    private String codigo;         // Identificador único de 8 dígitos fijos
    private String patente;        // Patente oficial chilena
    private String marca;          // Marca de alta gama
    private String modelo;         // Modelo específico
    private int anio;               // Año de fabricación
    private boolean electrico;
    private boolean disponible;
    private String tipo;
    private String color;
    private String transmision;

    public Vehiculo() {
    }

    public Vehiculo(String codigo, String patente, String marca, String modelo, int anio, boolean electrico, boolean disponible, String tipo, String color, String transmision) {
        //this.codigo = codigo;

        setCodigo(codigo);
        setPatente(patente);
        setMarca(marca);
        setModelo(modelo);
        setAnio(anio);
        setElectrico(electrico);
        setDisponible(disponible);
        setTipo(tipo);
        setColor(color);
        setTransmision(transmision);
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        patente = patente.trim().toUpperCase();
        
        if (patente == null) {
            throw new IllegalArgumentException("La patente es obligatoria.");
        }

        if (patente.length() != 6) {
            throw new IllegalArgumentException("Solo esta permitido 6 caracteres");
        }

        // VALIDAR QUE SEA DEL FORMATO AAAA12 Y AA1234
        if (Character.isLetter(patente.charAt(0))
                && Character.isLetter(patente.charAt(1))
                && Character.isLetter(patente.charAt(2))
                && Character.isLetter(patente.charAt(3))
                && Character.isDigit(patente.charAt(4))
                && Character.isDigit(patente.charAt(5))) {
            throw new IllegalArgumentException(
                    "La patente debe tener formato AAAA12 o AA1234."
            );
        }

        if (Character.isLetter(patente.charAt(0))
                && Character.isLetter(patente.charAt(1))
                && Character.isDigit(patente.charAt(2))
                && Character.isDigit(patente.charAt(3))
                && Character.isDigit(patente.charAt(4))
                && Character.isDigit(patente.charAt(5))) {
            throw new IllegalArgumentException(
                    "La patente debe tener formato AAAA12 o AA1234."
            );
        }

        this.patente = patente;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public boolean isElectrico() {
        return electrico;
    }

    public void setElectrico(boolean electrico) {
        this.electrico = electrico;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getTransmision() {
        return transmision;
    }

    public void setTransmision(String transmision) {
        this.transmision = transmision;
    }

    @Override
    public String toString() {
        return "Vehiculo{" + "codigo=" + codigo + ", patente=" + patente + ", marca=" + marca + ", modelo=" + modelo + ", anio=" + anio + ", electrico=" + electrico + ", disponible=" + disponible + ", tipo=" + tipo + ", color=" + color + ", transmision=" + transmision + '}';
    }

}
