function renderJUnitLesson(context, isVehicle) {
  const {model, key, example} = context;
  const filename = `${model}DAOTest.java`;
  const testPath = isVehicle
    ? `AutomotoraDAO/src/test/java/com/mycompany/automotoradao/${filename}`
    : `src/test/java/${filename}`;
  const imports = isVehicle ? `package com.mycompany.automotoradao;

import com.mycompany.automotoradao.dao.VehiculoDAO;
import com.mycompany.automotoradao.modelo.Vehiculo;
` : "";
  const constructorValues = isVehicle
    ? '"88202601", "ABCD12", "Ferrari", "F8 Tributo", 2023, false, true, "Superdeportivo", "Rojo", "Secuencial"'
    : sampleValues(context).map(value => JSON.stringify(value)).join(", ");
  byId("context-title").textContent = `Prueba el DAO de ${context.name}`;
  byId("context-description").textContent =
    `Usa ${key} ${example} para comprobar que el DAO encuentra una ficha guardada y rechaza un segundo registro con la misma clave.`;
  byId("junit-filename").textContent = filename;
  byId("junit-test-path").textContent = isVehicle
    ? `La prueba del DAO está en ${testPath}. La del modelo está en la misma carpeta, en VehiculoTest.java.`
    : `Guarda la prueba en ${testPath} y coloca los archivos del proyecto de datos en src/main/java de un proyecto Maven.`;
  renderCode("junit-code", `${imports}import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ${model}DAOTest {
    @Test
    void encuentraLaFichaGuardada() {
        // Preparar
        ${model}DAO dao = new ${model}DAO();
        ${model} ficha = crearFicha();

        // Actuar
        assertTrue(dao.guardar(ficha));
        ${model} encontrada = dao.buscar(${JSON.stringify(example)});

        // Comprobar
        assertSame(ficha, encontrada);
    }

    @Test
    void rechazaUnaClaveDuplicada() {
        ${model}DAO dao = new ${model}DAO();
        ${model} ficha = crearFicha();
        assertTrue(dao.guardar(ficha));

        boolean segundoIntento = dao.guardar(crearFicha());

        assertFalse(segundoIntento);
    }

    private ${model} crearFicha() {
        return new ${model}(${constructorValues});
    }
}`);
  byId("junit-bug").checked = false;
  byId("junit-output").textContent = "Los resultados aparecerán aquí.";
  byId("junit-copy-status").textContent = "";
}

byId("run-junit").addEventListener("click", () => {
  const acceptsDuplicates = byId("junit-bug").checked;
  const records = [];
  const guardar = record => {
    if (!acceptsDuplicates && records.some(item => item.key === record.key)) return false;
    records.push(record);
    return true;
  };
  const record = {key: active.example};
  guardar(record);
  const found = records.find(item => item.key === record.key);
  records.length = 0;
  guardar(record);
  const duplicate = guardar({key: record.key});
  byId("junit-output").textContent = [
    `encuentraLaFichaGuardada · ${found === record ? "OK" : "FALLÓ"}`,
    `rechazaUnaClaveDuplicada · ${duplicate ? "FALLÓ" : "OK"}`,
    `  Segundo intento: esperado false, obtenido ${duplicate}.`
  ].join("\n");
});
setupCopy("copy-junit-code", "junit-code", "junit-copy-status");

initContext();
