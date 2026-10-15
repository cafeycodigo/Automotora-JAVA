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
}
