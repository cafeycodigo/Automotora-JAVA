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

        // CREATE - GUARDAR
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
        // VOLVER A GUARDAR EL MISMO VEHICULO
        if (dao.guardar(v10)) {
            System.out.println("\n\nSe ha guardado correctamente " + v10.getPatente() + "\n\n");
        } else {
            System.out.println("ERROR: No ha guardado " + v10.getPatente() + "\n\n");
        }

        // SHOW GENERAL - LISTAR
        System.out.println("\n *********** LISTADO ****************** \n");
        for (Vehiculo vehiculo : dao.listar()) {
            System.out.println("Vehiculo -> " + vehiculo.toString());
        }
        System.out.println("\n *********** LISTADO ****************** \n");

        // READ - BUSCAR
        String patente = "ABCD12";
        Vehiculo vEncontrar = dao.buscar(patente);

        if (vEncontrar == null) {
            System.out.println("Vehiculo no encontrado");
        } else {
            System.out.println("Vehiculo encontrado -> " + vEncontrar.toString());
        }

        // UPDATE  - ACTUALIZAR
        String patenteActualizar = "PRST90";
        Vehiculo vEncontrarParaActualizar = dao.buscar(patenteActualizar);

        System.out.println("El color del vehiculo es " + vEncontrarParaActualizar.getColor());

        //Vehiculo v5 = new Vehiculo("88202605", "PRST90", "Lamborghini", "Huracán EVO", 2023, false, true, "Superdeportivo", "Negro Metálico (Nero Daytona)", "Secuencial F1");
        vEncontrarParaActualizar.setColor("Amarillo");

        if (dao.actualizar(vEncontrarParaActualizar)) {
            System.out.println("Se ha actualizado [" + patenteActualizar + "]");
        } else {
            System.out.println("No se ha actualizado");
        }

        // SHOW GENERAL - LISTAR
        System.out.println("\n *********** LISTADO ****************** \n");
        for (Vehiculo vehiculo : dao.listar()) {
            System.out.println("Vehiculo -> " + vehiculo.toString());
        }
        System.out.println("\n *********** LISTADO ****************** \n");

        // DELETE - ELMINIAR
        String patenteEliminar = "PRST90";

        if (dao.eliminar(patenteEliminar)) {
            System.out.println("Se ha eliminado [" + patenteEliminar + "]");
        } else {
            System.out.println("Error no se ha podido eliminar");
        }

        // SHOW GENERAL - LISTAR
        System.out.println("\n *********** LISTADO ****************** \n");
        for (Vehiculo vehiculo : dao.listar()) {
            System.out.println("Vehiculo -> " + vehiculo.toString());
        }
        System.out.println("\n *********** LISTADO ****************** \n");

        // ==========================================
        // MÉTODOS DE CONSULTA Y REPORTES ("PREGUNTAS")
        // ==========================================
        // Conteo total
        System.out.println("Cantidad total de vehículos: " + dao.cantidadTotal());

        // 1 y 2. Eléctricos (Listado y Conteo)
        System.out.println("\n--- Vehículos Eléctricos ---");
        System.out.println("Cantidad de eléctricos: " + dao.contarElectricos());
        for (Vehiculo v : dao.listarElectricos()) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo() + " (" + v.getPatente() + ")");
        }

        // 3. Disponibles
        System.out.println("\n--- Vehículos Disponibles ---");
        for (Vehiculo v : dao.listarDisponibles()) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo() + " [Patente: " + v.getPatente() + "]");
        }

        // 4. Buscar por Marca
        String marcaBuscada = "Toyota";
        System.out.println("\n--- Búsqueda por marca: " + marcaBuscada + " ---");
        for (Vehiculo v : dao.buscarPorMarca(marcaBuscada)) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo() + " Año: " + v.getAnio());
        }

        // 5. Buscar por Tipo
        String tipoBuscado = "SUV";
        System.out.println("\n--- Búsqueda por tipo: " + tipoBuscado + " ---");
        for (Vehiculo v : dao.buscarPorTipo(tipoBuscado)) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo() + " (" + v.getTipo() + ")");
        }

        // 7. Buscar por Transmisión
        String transmisionBuscada = "Automática";
        System.out.println("\n--- Búsqueda por transmisión: " + transmisionBuscada + " ---");
        for (Vehiculo v : dao.buscarPorTransmision(transmisionBuscada)) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo() + " - " + v.getTransmision());
        }

        // 8. Listar desde un año en adelante
        int anioMinimo = 2022;
        System.out.println("\n--- Vehículos del año " + anioMinimo + " en adelante ---");
        for (Vehiculo v : dao.listarDesdeAnio(anioMinimo)) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo() + " (" + v.getAnio() + ")");
        }

        // 9. Buscar por Color
        String colorBuscado = "Rojo";
        System.out.println("\n--- Búsqueda por color: " + colorBuscado + " ---");
        for (Vehiculo v : dao.buscarPorColor(colorBuscado)) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo() + " (" + v.getColor() + ")");
        }

        // 10. Contar por disponibilidad (true o false)
        System.out.println("\n--- Estadísticas de Disponibilidad ---");
        System.out.println("Disponibles (true): " + dao.contarPorDisponibilidad(true));
        System.out.println("No disponibles (false): " + dao.contarPorDisponibilidad(false));

        // 11 y 12. Más antiguo y más nuevo
        System.out.println("\n--- Extremos del Inventario ---");
        Vehiculo antiguo = dao.obtenerVehiculoMasAntiguo();
        if (antiguo != null) {
            System.out.println("Vehículo más antiguo: " + antiguo.getMarca() + " " + antiguo.getModelo() + " (" + antiguo.getAnio() + ")");
        }

        Vehiculo nuevo = dao.obtenerVehiculoMasNuevo();
        if (nuevo != null) {
            System.out.println("Vehículo más nuevo: " + nuevo.getMarca() + " " + nuevo.getModelo() + " (" + nuevo.getAnio() + ")");
        }

        // 13. Búsqueda parcial por modelo
        String textoParcial = "Mod";
        System.out.println("\n--- Búsqueda parcial de modelo con: '" + textoParcial + "' ---");
        for (Vehiculo v : dao.buscarPorModeloParcial(textoParcial)) {
            System.out.println(" - " + v.getMarca() + " " + v.getModelo());
        }

        System.out.println("\n==========================================");
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
