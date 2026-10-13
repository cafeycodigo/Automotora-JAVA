/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.automotora;

import com.mycompany.automotora.modelo.Vehiculo;
import com.mycompany.automotora.vista.VehiculoVista;
import java.util.ArrayList;

/**
 *
 * @author benja
 */
public class Automotora {

    public static void main(String[] args) {
        System.out.println("Hello World!");
        
        //String codigo = "a";
        //Vehiculo vTestCodigo = new Vehiculo(codigo, "ABCD12", "Ferrari", "F8 Tributo", 2016, false, true, "Superdeportivo", "Rojo Furia (Rosso Corsa)", "Secuencial F1");
      
         
//        String patente = "1";
//        Vehiculo vTestPatente = new Vehiculo("12345678", patente, "Ferrari", "F8 Tributo", 2016, false, true, "Superdeportivo", "Rojo Furia (Rosso Corsa)", "Secuencial F1");
      
//        int anio = 2000;
//        Vehiculo vTestAnio = new Vehiculo("12345678", "ABCD12", "Ferrari", "F8 Tributo", anio, false, true, "Superdeportivo", "Rojo Furia (Rosso Corsa)", "Secuencial F1");

  

        ArrayList<Vehiculo> listaVehiculos = new ArrayList<>();

        Vehiculo v1 = new Vehiculo("88202601", "ABCD12", "Ferrari", "F8 Tributo", 2023, false, true, "Superdeportivo", "Rojo Furia (Rosso Corsa)", "Secuencial F1");
        Vehiculo v2 = new Vehiculo("88202602", "BBCC34", "Porsche", "911 GT3", 2024, false, true, "Superdeportivo", "Gris Nardo", "Automática de Doble Embrague");
        Vehiculo v3 = new Vehiculo("88202603", "WXYZ78", "Tesla", "Model S Plaid", 2025, true, true, "Sedán Ejecutivo", "Blanco Diamante", "Direct-Drive Eléctrica");
        Vehiculo v4 = new Vehiculo("88202604", "JKLM56", "Aston Martin", "Vantage", 2022, false, false, "Convertible / Roadster", "Azul Perla (Blu Corsa)", "Automática de Doble Embrague");
        Vehiculo v5 = new Vehiculo("88202605", "PRST90", "Lamborghini", "Huracán EVO", 2023, false, true, "Superdeportivo", "Negro Metálico (Nero Daytona)", "Secuencial F1");
        Vehiculo v6 = new Vehiculo("88202606", "HJKD11", "McLaren", "Artura", 2024, true, true, "Superdeportivo", "Azul Perla (Blu Corsa)", "Automática de Doble Embrague");
        Vehiculo v7 = new Vehiculo("88202607", "MNBV22", "Maserati", "MC20", 2023, false, false, "Superdeportivo", "Blanco Diamante", "Secuencial F1");
        Vehiculo v8 = new Vehiculo("88202608", "ZXCV33", "Porsche", "Taycan Turbo S", 2025, true, true, "Sedán Ejecutivo", "Gris Nardo", "Direct-Drive Eléctrica");
        Vehiculo v9 = new Vehiculo("88202609", "QWER44", "Ferrari", "Roma", 2022, false, true, "Convertible / Roadster", "Negro Metálico (Nero Daytona)", "Automática de Doble Embrague");
        Vehiculo v10 = new Vehiculo("88202610", "TYUI55", "Tesla", "Model X Plaid", 2026, true, true, "SUV de Lujo", "Blanco Diamante", "Direct-Drive Eléctrica");

        System.out.println("Vehiculo 1 " + v1.toString());

        listaVehiculos.add(v1);
        listaVehiculos.add(v2);
        listaVehiculos.add(v3);
        listaVehiculos.add(v4);
        listaVehiculos.add(v5);
        listaVehiculos.add(v6);
        listaVehiculos.add(v7);
        listaVehiculos.add(v8);
        listaVehiculos.add(v9);
        listaVehiculos.add(v10);

        // Listar todos los vehiculos
        for (Vehiculo vehiculo : listaVehiculos) {
            System.out.println("Vehiculo -> " + vehiculo.toString());
        }
        
        
        VehiculoVista vista = new VehiculoVista();
        vista.setVisible(true);

    }
}
