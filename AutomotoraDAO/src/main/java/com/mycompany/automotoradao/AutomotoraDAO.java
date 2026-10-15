/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.automotoradao;

import com.mycompany.automotoradao.dao.VehiculoDAO;
import com.mycompany.automotoradao.modelo.Vehiculo;
import com.mycompany.automotoradao.vista.VehiculoVista;
import java.util.ArrayList;

/**
 *
 * @author benja
 */
public class AutomotoraDAO {

    public static void main(String[] args) {

        VehiculoDAO dao = new VehiculoDAO();

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

        // GUARDAR
        dao.guardar(v1);
        dao.guardar(v2);
        dao.guardar(v3);
        dao.guardar(v4);
        dao.guardar(v5);
        dao.guardar(v6);
        dao.guardar(v7);
        dao.guardar(v8);
        dao.guardar(v9);
        
        if (dao.guardar(v10)) {
            System.out.println("\n\nSe ha guardado correctamente " + v10.getPatente() + "\n\n");
        }

        // LISTAR
        System.out.println("\n *********** LISTADO ****************** \n");
        for (Vehiculo vehiculo : dao.listar()) {
            System.out.println("Vehiculo -> " + vehiculo.toString());
        }
        
        
        // BUSCAR
        String patente =  "ABCD12";
        Vehiculo vEncontrar = dao.buscar(patente);
        
        if (vEncontrar == null) {
            System.out.println("Vehiculo no encontrado");
        }
        System.out.println("Vehiculo no encontrado");
        
        salto();
        
        


//        
//        VehiculoVista vista = new VehiculoVista();
//        vista.setVisible(true);

    }
    
    
    public static void salto() {
        System.out.println("");
    }
    
    public static void linea(String t) {
        if (!t.isEmpty()) {
            t = " " + t + " ";
        }
        System.out.println("*********" + t + "**********");
    }
    
    public static void imprimir(String t) {
        System.out.println(t);
    }
}
