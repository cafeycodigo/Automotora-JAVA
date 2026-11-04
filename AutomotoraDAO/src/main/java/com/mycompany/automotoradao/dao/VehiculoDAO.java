/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.automotoradao.dao;

import com.mycompany.automotoradao.modelo.Vehiculo;
import java.util.ArrayList;

/**
 *
 * @author benja
 */
public class VehiculoDAO {

    private final ArrayList<Vehiculo> vehiculos = new ArrayList<>();

    public boolean guardar(Vehiculo vehiculo) {
        if (vehiculo == null) {
            return false;
        }

        if (buscar(vehiculo.getPatente()) != null) {
            return false;
        }

        vehiculos.add(vehiculo);
        return true;
    }

    public Vehiculo buscar(String patente) {
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getPatente().equals(patente)) {
                return vehiculo;
            }
        }

        return null;
    }

    public boolean actualizar(Vehiculo vehiculo) {
        Vehiculo vehiculoEncontrado = buscar(vehiculo.getPatente());

        if (vehiculoEncontrado == null) {
            return false;
        }

        vehiculoEncontrado.setCodigo(vehiculo.getCodigo());
//        vehiculoEncontrado.setPatente(vehiculo.getPatente());
        vehiculoEncontrado.setMarca(vehiculo.getMarca());
        vehiculoEncontrado.setModelo(vehiculo.getModelo());
        vehiculoEncontrado.setAnio(vehiculo.getAnio());
        vehiculoEncontrado.setElectrico(vehiculo.isElectrico());
        vehiculoEncontrado.setDisponible(vehiculo.isDisponible());
        vehiculoEncontrado.setTipo(vehiculo.getTipo());
        vehiculoEncontrado.setColor(vehiculo.getColor());
        vehiculoEncontrado.setTransmision(vehiculo.getTransmision());

        return true;
    }

    public boolean eliminar(String patente) {
        int indice = 0;
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getPatente().equals(patente)) {
                vehiculos.remove(indice);
                return true;
            }

            indice++;
            //indice = indice + 1;
        }

        return false;
    }

    public ArrayList<Vehiculo> listar() {
        return vehiculos;
    }

    // ==========================================
    // MÉTODOS DE CONSULTA Y REPORTES ("PREGUNTAS")
    // ==========================================
    // 1. Listar solo los vehículos eléctricos
    public ArrayList<Vehiculo> listarElectricos() {
        ArrayList<Vehiculo> electricos = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.isElectrico()) {
                electricos.add(vehiculo);
            }
        }
        return electricos;
    }

    // 2. Contar cuántos vehículos eléctricos hay
    public int contarElectricos() {
        int contador = 0;
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.isElectrico()) {
                contador++;
            }
        }
        return contador;
    }

    // 3. Listar vehículos disponibles para arriendo/venta
    public ArrayList<Vehiculo> listarDisponibles() {
        ArrayList<Vehiculo> disponibles = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.isDisponible()) {
                disponibles.add(vehiculo);
            }
        }
        return disponibles;
    }

    // 4. Buscar vehículos por marca (ej: "Toyota", "Chevrolet")
    public ArrayList<Vehiculo> buscarPorMarca(String marca) {
        ArrayList<Vehiculo> resultado = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getMarca() != null && vehiculo.getMarca().equalsIgnoreCase(marca)) {
                resultado.add(vehiculo);
            }
        }
        return resultado;
    }

    // 5. Buscar vehículos por tipo (ej: "SUV", "Sedán", "Camioneta")
    public ArrayList<Vehiculo> buscarPorTipo(String tipo) {
        ArrayList<Vehiculo> resultado = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getTipo() != null && vehiculo.getTipo().equalsIgnoreCase(tipo)) {
                resultado.add(vehiculo);
            }
        }
        return resultado;
    }

    // 6. Conteo total de vehículos registrados
    public int cantidadTotal() {
        return vehiculos.size();
    }

    // 7. Listar vehículos por tipo de transmisión (ej: "Manual", "Automática")
    public ArrayList<Vehiculo> buscarPorTransmision(String transmision) {
        ArrayList<Vehiculo> resultado = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getTransmision() != null && vehiculo.getTransmision().equalsIgnoreCase(transmision)) {
                resultado.add(vehiculo);
            }
        }
        return resultado;
    }

    // 8. Listar vehículos desde un año en adelante (ej: autos del 2020 en adelante)
    public ArrayList<Vehiculo> listarDesdeAnio(int anioMinimo) {
        ArrayList<Vehiculo> resultado = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getAnio() >= anioMinimo) {
                resultado.add(vehiculo);
            }
        }
        return resultado;
    }

    // 9. Buscar vehículos por color
    public ArrayList<Vehiculo> buscarPorColor(String color) {
        ArrayList<Vehiculo> resultado = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getColor() != null && vehiculo.getColor().equalsIgnoreCase(color)) {
                resultado.add(vehiculo);
            }
        }
        return resultado;
    }

    // 10. Contar cuántos vehículos hay según su disponibilidad (true = disponibles, false = no disponibles/arrendados)
    public int contarPorDisponibilidad(boolean estado) {
        int contador = 0;
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.isDisponible() == estado) {
                contador++;
            }
        }
        return contador;
    }

    // 11. Obtener el vehículo más antiguo del inventario
    public Vehiculo obtenerVehiculoMasAntiguo() {
        if (vehiculos.isEmpty()) {
            return null;
        }
        Vehiculo masAntiguo = vehiculos.get(0);
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getAnio() < masAntiguo.getAnio()) {
                masAntiguo = vehiculo;
            }
        }
        return masAntiguo;
    }

    // 12. Obtener el vehículo más nuevo del inventario
    public Vehiculo obtenerVehiculoMasNuevo() {
        if (vehiculos.isEmpty()) {
            return null;
        }
        Vehiculo masNuevo = vehiculos.get(0);
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getAnio() > masNuevo.getAnio()) {
                masNuevo = vehiculo;
            }
        }
        return masNuevo;
    }

    // 13. Buscar coincidencias parciales en el modelo (ej: buscar "Corolla" dentro de "Toyota Corolla")
    public ArrayList<Vehiculo> buscarPorModeloParcial(String textoModelo) {
        ArrayList<Vehiculo> resultado = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getModelo() != null && vehiculo.getModelo().toLowerCase().contains(textoModelo.toLowerCase())) {
                resultado.add(vehiculo);
            }
        }
        return resultado;
    }
}
