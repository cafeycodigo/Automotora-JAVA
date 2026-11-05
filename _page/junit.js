function renderJUnitLesson(context, isVehicle) {
  const {model, key, example, spec} = context;
  const s = spec;
  const modelTestFile = `${model}Test.java`;
  const filename = `${model}DAOTest.java`;
  const testPath = isVehicle
    ? `AutomotoraDAO/src/test/java/com/mycompany/automotoradao/${filename}`
    : `src/test/java/${filename}`;
  const imports = isVehicle ? `package com.mycompany.automotoradao;

import com.mycompany.automotoradao.dao.VehiculoDAO;
import com.mycompany.automotoradao.modelo.Vehiculo;
` : "";
  const modelImports = isVehicle ? `package com.mycompany.automotoradao;

import com.mycompany.automotoradao.modelo.Vehiculo;
` : "";

  const constructorValues = `${JSON.stringify(s.codeExample)}, ${JSON.stringify(s.keyExample)}, ${JSON.stringify(s.groupExample)}, ${JSON.stringify(s.nameExample)}, ${s.yearExample}, ${s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorExample)}, ${JSON.stringify(s.modeExample)}`;
  const rawInputValues = `${JSON.stringify(s.codeExample)}, ${JSON.stringify(s.keyRawExample)}, ${JSON.stringify(" " + s.groupExample + " ")}, ${JSON.stringify(s.nameExample)}, ${s.yearExample}, ${s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorExample)}, ${JSON.stringify(s.modeExample)}`;
  const badCodeValues = `"8820260A", ${JSON.stringify(s.keyExample)}, ${JSON.stringify(s.groupExample)}, ${JSON.stringify(s.nameExample)}, ${s.yearExample}, ${s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorExample)}, ${JSON.stringify(s.modeExample)}`;
  const badYearValues = `${JSON.stringify(s.codeExample)}, ${JSON.stringify(s.keyExample)}, ${JSON.stringify(s.groupExample)}, ${JSON.stringify(s.nameExample)}, 2014, ${s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorExample)}, ${JSON.stringify(s.modeExample)}`;

  byId("context-title").textContent = `Prueba automáticamente el Modelo y el DAO de ${context.name}`;
  byId("context-description").textContent =
    `Usa JUnit Jupiter 5 y la clave ${key} (${example}) para verificar que ${model} valida sus 10 atributos y que ${model}DAO recupera fichas guardadas y rechaza duplicados.`;

  if (byId("junit-model-filename")) byId("junit-model-filename").textContent = modelTestFile;
  byId("junit-filename").textContent = filename;
  byId("junit-test-path").textContent = isVehicle
    ? `Ruta de las pruebas en el repositorio: ${testPath} y ${modelTestFile}.`
    : `Guarda las pruebas en ${testPath} y src/test/java/${modelTestFile}, y coloca las clases del proyecto en src/main/java de tu módulo Maven.`;

  if (byId("junit-model-code")) {
    renderCode("junit-model-code", `${modelImports}import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ${model}Test {
    @Test
    void normaliza${cap(s.keyAttr)}Y${cap(s.groupAttr)}() {
        // 1. Arrange & 2. Act
        ${model} ficha = new ${model}(${rawInputValues});

        // 3. Assert: limpia espacios y normaliza la clave ${s.keyLabel}
        assertEquals(${JSON.stringify(s.keyExample)}, ficha.get${cap(s.keyAttr)}());
        assertEquals(${JSON.stringify(s.groupExample)}, ficha.get${cap(s.groupAttr)}());
    }

    @Test
    void rechazaUnCodigoConLetras() {
        // Debe lanzar IllegalArgumentException porque "8820260A" tiene una letra
        assertThrows(IllegalArgumentException.class, () -> new ${model}(${badCodeValues}));
    }

    @Test
    void rechazaUn${cap(s.yearAttr)}AnteriorA2015() {
        // Debe lanzar IllegalArgumentException porque 2014 < 2015
        assertThrows(IllegalArgumentException.class, () -> new ${model}(${badYearValues}));
    }
}`);
  }

  renderCode("junit-code", `${imports}import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ${model}DAOTest {
    @Test
    void encuentraLaFichaGuardada() {
        // 1. Arrange (Preparar)
        ${model}DAO dao = new ${model}DAO();
        ${model} ficha = crearFicha();

        // 2. Act (Actuar)
        assertTrue(dao.guardar(ficha));
        ${model} encontrada = dao.buscar(${JSON.stringify(example)});

        // 3. Assert (Comprobar)
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

  if (byId("junit-lambda-code")) {
    renderCode("junit-lambda-code", `// ❌ INCORRECTO: Lanza la excepción antes de que assertThrows tome el control
// assertThrows(IllegalArgumentException.class, ficha.set${cap(s.yearAttr)}(2010));

// ✅ CORRECTO: La expresión lambda () -> retrasa la ejecución para que JUnit la capture
IllegalArgumentException error = assertThrows(
    IllegalArgumentException.class,
    () -> ficha.set${cap(s.yearAttr)}(2010)
);
// Incluso puedes verificar el mensaje exacto del error:
assertEquals("El ${s.yearLabel.toLowerCase()} debe ser igual o posterior a 2015.", error.getMessage());`);
  }

  if (byId("junit-bug-label-1")) {
    byId("junit-bug-label-1").innerHTML = `<strong>Bug en ${model}DAO:</strong> Ignorar validación de ${s.keyLabel} duplicado en <code class="font-mono text-xs">guardar()</code>.`;
  }
  if (byId("junit-bug-label-2")) {
    byId("junit-bug-label-2").innerHTML = `<strong>Bug en ${model}:</strong> Olvidar normalizar <code class="font-mono text-xs">${s.keyAttr}</code> con <code class="font-mono text-xs">.trim()</code> en <code class="font-mono text-xs">set${cap(s.keyAttr)}()</code>.`;
  }
  if (byId("junit-bug-label-3")) {
    byId("junit-bug-label-3").innerHTML = `<strong>Bug en ${model}:</strong> Permitir <code class="font-mono text-xs">${s.yearAttr} &lt; 2015</code> sin lanzar <code class="font-mono text-xs">IllegalArgumentException</code>.`;
  }

  // 6 Ejercicios dinámicos de JUnit 5
  const exercisesGrid = byId("junit-exercises-grid");
  if (exercisesGrid) {
    const exercises = [
      {
        level: "Nivel 1 · Básico",
        badgeClass: "pro-badge-emerald",
        title: `Ejercicio 1: Probar el constructor vacío y setters de ${model}`,
        desc: `Escribe un método <code>@Test void modificaAtributosConSetters()</code> en <code>${model}Test</code> que cree un <code>new ${model}()</code> vacío, asigne <code>set${cap(s.groupAttr)}(${JSON.stringify(" " + s.groupExample + " ")})</code> y <code>set${cap(s.yearAttr)}(${s.yearExample})</code>, y verifique los valores con <code>assertEquals</code>.`,
        hint: `Pista: <code>get${cap(s.groupAttr)}()</code> debe devolver <code>${JSON.stringify(s.groupExample)}</code> sin espacios laterales.`,
        code: `@Test
void modificaAtributosConSetters() {
    ${model} item = new ${model}();
    item.set${cap(s.groupAttr)}(${JSON.stringify("  " + s.groupExample + "  ")});
    item.set${cap(s.yearAttr)}(${s.yearExample});

    assertEquals(${JSON.stringify(s.groupExample)}, item.get${cap(s.groupAttr)}());
    assertEquals(${s.yearExample}, item.get${cap(s.yearAttr)}());
}`
      },
      {
        level: "Nivel 1 · Básico",
        badgeClass: "pro-badge-emerald",
        title: `Ejercicio 2: Verificar clave inválida en set${cap(s.keyAttr)}()`,
        desc: `Agrega un test en <code>${model}Test</code> llamado <code>rechaza${cap(s.keyAttr)}ConFormatoInvalido()</code> que use <code>assertThrows</code> para comprobar que <code>set${cap(s.keyAttr)}(${JSON.stringify(s.keyBadExample)})</code> lanza <code>IllegalArgumentException</code>.`,
        hint: `Pista: Usa una expresión lambda <code>() -> item.set${cap(s.keyAttr)}(${JSON.stringify(s.keyBadExample)})</code>.`,
        code: `@Test
void rechaza${cap(s.keyAttr)}ConFormatoInvalido() {
    ${model} item = new ${model}();
    assertThrows(
        IllegalArgumentException.class,
        () -> item.set${cap(s.keyAttr)}(${JSON.stringify(s.keyBadExample)})
    );
}`
      },
      {
        level: "Nivel 2 · Intermedio",
        badgeClass: "pro-badge-indigo",
        title: `Ejercicio 3: Probar eliminar() existente e inexistente en ${model}DAO`,
        desc: `En <code>${model}DAOTest</code>, escribe <code>eliminaFichaExistenteYRechazaInexistente()</code>: guarda una ficha (${JSON.stringify(s.keyExample)}), verifica que el primer <code>dao.eliminar(${JSON.stringify(s.keyExample)})</code> devuelva <code>true</code>, que <code>dao.buscar(${JSON.stringify(s.keyExample)})</code> sea <code>null</code>, y que un segundo <code>eliminar</code> devuelva <code>false</code>.`,
        hint: `Pista: Combina <code>assertTrue</code>, <code>assertNull</code> y <code>assertFalse</code>.`,
        code: `@Test
void eliminaFichaExistenteYRechazaInexistente() {
    ${model}DAO dao = new ${model}DAO();
    dao.guardar(crearFicha());

    assertTrue(dao.eliminar(${JSON.stringify(s.keyExample)}));
    assertNull(dao.buscar(${JSON.stringify(s.keyExample)}));
    assertFalse(dao.eliminar(${JSON.stringify(s.keyExample)}));
}`
      },
      {
        level: "Nivel 2 · Intermedio",
        badgeClass: "pro-badge-indigo",
        title: `Ejercicio 4: Probar actualizar() en ${model}DAO`,
        desc: `Escribe un test que guarde <code>crearFicha()</code>, cree otro objeto <code>${model}</code> con la misma clave <code>${JSON.stringify(s.keyExample)}</code> pero cambiando el color a <code>${JSON.stringify(s.colorAlt)}</code>, llame a <code>dao.actualizar(modificada)</code> y compruebe que el color almacenado ahora sea <code>${JSON.stringify(s.colorAlt)}</code>.`,
        hint: `Pista: Recupera la ficha con <code>dao.buscar(${JSON.stringify(s.keyExample)}).get${cap(s.colorAttr)}()</code>.`,
        code: `@Test
void actualizaFichaExistente() {
    ${model}DAO dao = new ${model}DAO();
    dao.guardar(crearFicha());

    ${model} modificada = crearFicha();
    modificada.set${cap(s.colorAttr)}(${JSON.stringify(s.colorAlt)});

    assertTrue(dao.actualizar(modificada));
    assertEquals(${JSON.stringify(s.colorAlt)}, dao.buscar(${JSON.stringify(s.keyExample)}).get${cap(s.colorAttr)}());
}`
      },
      {
        level: "Nivel 3 · Avanzado",
        badgeClass: "pro-badge-amber",
        title: `Ejercicio 5: Probar que listar() devuelve una copia defensiva`,
        desc: `Escribe un test <code>listarDevuelveCopiaDefensiva()</code> que guarde una ficha en <code>${model}DAO</code>, obtenga la lista con <code>dao.listar()</code>, ejecute <code>.clear()</code> sobre esa lista externa y compruebe que <code>dao.contarTotal()</code> siga valiendo <code>1</code>.`,
        hint: `Pista: Como <code>listar()</code> retorna <code>new ArrayList<>(registros)</code>, vaciar la copia no afecta al DAO.`,
        code: `@Test
void listarDevuelveCopiaDefensiva() {
    ${model}DAO dao = new ${model}DAO();
    dao.guardar(crearFicha());

    List<${model}> copiaExterna = dao.listar();
    copiaExterna.clear();

    assertEquals(1, dao.contarTotal());
}`
      },
      {
        level: "Nivel 3 · Reto JaCoCo 100%",
        badgeClass: "pro-badge-rose",
        title: `Ejercicio 6: Probar filtros y conteos con assertAll()`,
        desc: `Escribe un test que inserte dos fichas en <code>${model}DAO</code> (una con <code>${s.bool1Attr} = true</code> y otra con <code>false</code>) y use <code>assertAll()</code> para verificar en bloque: <code>contarTotal() == 2</code>, <code>contar${cap(s.bool1Plural)}() == 1</code> y <code>listarPor${cap(s.groupAttr)}(${JSON.stringify(s.groupExample)}).size() == 2</code>.`,
        hint: `Pista: <code>assertAll</code> recibe múltiples lambdas <code>() -> assertEquals(...)</code> separadas por coma.`,
        code: `@Test
void verificaReportesYConteosConAssertAll() {
    ${model}DAO dao = new ${model}DAO();
    ${model} f1 = crearFicha();
    f1.set${cap(s.bool1Attr)}(true);

    ${model} f2 = crearFicha();
    f2.set${cap(s.keyAttr)}(${JSON.stringify(s.keyAltExample)});
    f2.set${cap(s.bool1Attr)}(false);

    dao.guardar(f1);
    dao.guardar(f2);

    assertAll(
        () -> assertEquals(2, dao.contarTotal()),
        () -> assertEquals(1, dao.contar${cap(s.bool1Plural)}()),
        () -> assertEquals(2, dao.listarPor${cap(s.groupAttr)}(${JSON.stringify(s.groupExample)}).size())
    );
}`
      }
    ];

    exercisesGrid.innerHTML = exercises.map((ex, idx) => `
      <article class="exercise-card">
        <div>
          <div class="exercise-header">
            <span class="pro-badge ${ex.badgeClass}">${ex.level}</span>
            <span class="font-mono text-xs text-ink/50">@Test #${idx + 1}</span>
          </div>
          <h3 class="mt-3 text-base font-bold">${ex.title}</h3>
          <p class="mt-2 text-xs leading-5 text-ink/75">${ex.desc}</p>
        </div>
        <div>
          <div class="exercise-hint">${ex.hint}</div>
          <details class="solution-accordion">
            <summary>Ver solución JUnit 5 (${model})</summary>
            <div class="code-window mt-2">
              <pre class="overflow-x-auto p-4 text-xs leading-5"><code id="junit-ex-code-${idx}"></code></pre>
            </div>
          </details>
        </div>
      </article>
    `).join("");

    exercises.forEach((ex, idx) => renderCode(`junit-ex-code-${idx}`, ex.code));
  }

  byId("junit-bug").checked = false;
  if (byId("junit-bug-patente")) byId("junit-bug-patente").checked = false;
  if (byId("junit-bug-anio")) byId("junit-bug-anio").checked = false;
  byId("junit-output").textContent = "Pulsa \"Ejecutar Suite JUnit (5 @Test)\" para correr las pruebas.";
  byId("junit-copy-status").textContent = "";
}

byId("run-junit").addEventListener("click", () => {
  const acceptsDuplicates = byId("junit-bug").checked;
  const skipNormalize = byId("junit-bug-patente")?.checked ?? false;
  const skipYearCheck = byId("junit-bug-anio")?.checked ?? false;
  const s = active.spec;
  const model = active.model;

  // Simular las 5 pruebas adaptadas al dominio activo
  const results = [];
  let failures = 0;

  // Test 1: normalización de clave
  const rawKey = s.keyRawExample;
  const expectedKey = s.keyExample;
  const obtainedKey = skipNormalize
    ? rawKey
    : (active.key === "UUID" ? rawKey.trim().toLowerCase() : rawKey.trim().toUpperCase());
  const test1Name = `${model}Test.normaliza${cap(s.keyAttr)}Y${cap(s.groupAttr)}()`;
  if (obtainedKey === expectedKey) {
    results.push(`✔ ${test1Name} ............... OK (4 ms)`);
  } else {
    failures++;
    results.push(`✖ ${test1Name} ............... FALLÓ\n    org.opentest4j.AssertionFailedError: expected: <${expectedKey}> but was: <${obtainedKey}>`);
  }

  // Test 2: rechazaUnCodigoConLetras
  results.push(`✔ ${model}Test.rechazaUnCodigoConLetras() ................ OK (2 ms)`);

  // Test 3: rechazaUnAnioAnteriorA2015
  const test3Name = `${model}Test.rechazaUn${cap(s.yearAttr)}AnteriorA2015()`;
  if (!skipYearCheck) {
    results.push(`✔ ${test3Name} .............. OK (2 ms)`);
  } else {
    failures++;
    results.push(`✖ ${test3Name} .............. FALLÓ\n    org.opentest4j.AssertionFailedError: Expected java.lang.IllegalArgumentException to be thrown, but nothing was thrown.`);
  }

  // Test 4: encuentraLaFichaGuardada
  const records = [];
  const guardar = record => {
    if (!acceptsDuplicates && records.some(item => item.key === record.key)) return false;
    records.push(record);
    return true;
  };
  const record = {key: active.example};
  guardar(record);
  const found = records.find(item => item.key === record.key);
  if (found === record) {
    results.push(`✔ ${model}DAOTest.encuentraLaFichaGuardada() .......... OK (3 ms)`);
  } else {
    failures++;
    results.push(`✖ ${model}DAOTest.encuentraLaFichaGuardada() .......... FALLÓ`);
  }

  // Test 5: rechazaUnaClaveDuplicada
  records.length = 0;
  guardar(record);
  const duplicate = guardar({key: record.key});
  if (!duplicate) {
    results.push(`✔ ${model}DAOTest.rechazaUnaClaveDuplicada() .......... OK (1 ms)`);
  } else {
    failures++;
    results.push(`✖ ${model}DAOTest.rechazaUnaClaveDuplicada() .......... FALLÓ\n    org.opentest4j.AssertionFailedError: Segundo intento con clave ${active.example}: expected: <false> but was: <true>`);
  }

  const badge = byId("junit-status-badge");
  if (badge) {
    badge.textContent = failures === 0 ? "5/5 PASS (BUILD SUCCESS)" : `${failures} FALLO(S) (BUILD FAILURE)`;
    badge.className = failures === 0
      ? "rounded-full bg-lime px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink"
      : "rounded-full bg-rose-400 px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink";
  }

  byId("junit-output").textContent = [
    `[INFO] --- surefire:3.3.1:test (default-test) @ ${model}DAO ---`,
    ...results,
    "------------------------------------------------------------------------",
    `Tests run: 5, Failures: ${failures}, Errors: 0, Skipped: 0`,
    failures === 0
      ? "[INFO] BUILD SUCCESS · Todas las reglas verificadas."
      : "[ERROR] BUILD FAILURE · Revisa las aserciones fallidas arriba."
  ].join("\n");
});
setupCopy("copy-junit-code", "junit-code", "junit-copy-status");

initContext();
