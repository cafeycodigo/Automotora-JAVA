package com.mycompany.automotoradao;

import com.mycompany.automotoradao.dao.VehiculoDAO;
import com.mycompany.automotoradao.modelo.Vehiculo;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

class VehiculoDAOTest {
    @Test
    void encuentraLaFichaGuardada() {
        VehiculoDAO dao = new VehiculoDAO();
        Vehiculo ficha = crearFicha();

        assertTrue(dao.guardar(ficha));

        assertSame(ficha, dao.buscar("ABCD12"));
    }

    @Test
    void rechazaUnaClaveDuplicada() {
        VehiculoDAO dao = new VehiculoDAO();
        assertTrue(dao.guardar(crearFicha()));

        boolean segundoIntento = dao.guardar(crearFicha());

        assertFalse(segundoIntento);
    }

    private Vehiculo crearFicha() {
        return new Vehiculo("88202601", "ABCD12", "Ferrari", "F8 Tributo", 2023,
                false, true, "Superdeportivo", "Rojo", "Secuencial");
    }
}
