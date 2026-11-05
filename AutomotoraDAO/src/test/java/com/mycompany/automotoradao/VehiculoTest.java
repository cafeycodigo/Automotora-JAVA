package com.mycompany.automotoradao;

import com.mycompany.automotoradao.modelo.Vehiculo;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class VehiculoTest {
    @Test
    void normalizaLaPatente() {
        Vehiculo vehiculo = new Vehiculo();

        vehiculo.setPatente(" abcd12 ");

        assertEquals("ABCD12", vehiculo.getPatente());
    }

    @Test
    void rechazaUnCodigoConLetras() {
        Vehiculo vehiculo = new Vehiculo();

        assertThrows(IllegalArgumentException.class, () -> vehiculo.setCodigo("8820260A"));
    }

    @Test
    void rechazaUnAnioAnteriorA2015() {
        Vehiculo vehiculo = new Vehiculo();

        assertThrows(IllegalArgumentException.class, () -> vehiculo.setAnio(2014));
    }
}
