const databaseProvider = byId("db-provider");
const providers = {
  mysql: {name: "MySQL", group: "com.mysql", artifact: "mysql-connector-j", version: "9.3.0"},
  supabase: {name: "Supabase (PostgreSQL)", group: "org.postgresql", artifact: "postgresql", version: "42.7.14"}
};

function databaseExample(context) {
  const vehicle = context.model === "Vehiculo";
  const table = javaName(context.model);
  const s = context.spec;
  const keySqlType = context.key === "UUID" ? "VARCHAR(40)" : "VARCHAR(20)";
  const fields = [
    [s.codeAttr, "String", "CHAR(8)", s.codeExample],
    [s.keyAttr, "String", keySqlType, s.keyExample],
    [s.groupAttr, "String", "VARCHAR(50)", s.groupExample],
    [s.nameAttr, "String", "VARCHAR(50)", s.nameExample],
    [s.yearAttr, "int", "INT", s.yearExample],
    [s.bool1Attr, "boolean", "BOOLEAN", s.bool1Default],
    [s.bool2Attr, "boolean", "BOOLEAN", s.bool2Default],
    [s.typeAttr, "String", "VARCHAR(50)", s.typeExample],
    [s.colorAttr, "String", "VARCHAR(50)", s.colorExample],
    [s.modeAttr, "String", "VARCHAR(50)", s.modeExample]
  ];
  return {vehicle, table, fields, database: vehicle ? "automotora_db" : `${table}_db`};
}

function databaseFiles(context, example, providerKey) {
  const provider = providers[providerKey];
  const supabase = providerKey === "supabase";
  const {vehicle, table, fields, database} = example;
  const {model, spec} = context;
  const main = vehicle ? "AutomotoraMaven" : `${model}Maven`;
  const names = fields.map(([name]) => name);
  const [key, ...editable] = names;
  const [, keyType] = fields[0];
  const columns = names.join(", ");
  const sqlTable = supabase ? `public.${table}` : table;
  const dependency = `        <dependency>
            <groupId>${provider.group}</groupId>
            <artifactId>${provider.artifact}</artifactId>
            <version>${provider.version}</version>
        </dependency>`;
  const values = fields.map(([, , , value]) => JSON.stringify(value)).join(", ");
  const getter = ([name, type]) => (type === "boolean" ? "is" : "get") + name[0].toUpperCase() + name.slice(1);
  const jdbcType = type => ({String: "String", int: "Int", boolean: "Boolean"})[type];
  const bind = columns => columns.map((field, index) =>
    `            ps.set${jdbcType(field[1])}(${index + 1}, ficha.${getter(field)}());`).join("\n");
  const sqlFields = fields.map(([name, , type], index) => {
    const constraint = index === 0 ? " PRIMARY KEY" : index === 1 ? " UNIQUE" : "";
    const defaultValue = name === spec.bool1Attr
      ? ` DEFAULT ${spec.bool1Default ? "TRUE" : "FALSE"}`
      : name === spec.bool2Attr
        ? ` DEFAULT ${spec.bool2Default ? "TRUE" : "FALSE"}`
        : "";
    return `    ${name} ${type} NOT NULL${constraint}${defaultValue}`;
  }).join(",\n");

  return [
    ["esquema.sql", `${supabase ? "" : `CREATE DATABASE IF NOT EXISTS ${database} CHARACTER SET utf8mb4;
USE ${database};

`}CREATE TABLE IF NOT EXISTS ${sqlTable} (
${sqlFields}
);
${supabase ? `
ALTER TABLE ${sqlTable} ENABLE ROW LEVEL SECURITY;
` : ""}
SELECT ${columns} FROM ${sqlTable};`],
    ["pom.xml", `<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>cl.automotora</groupId>
    <artifactId>${main}</artifactId>
    <version>1.0-SNAPSHOT</version>
    <properties>
        <maven.compiler.release>17</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
${dependency}
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.12.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.13.0</version>
            </plugin>
            <plugin>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.3.1</version>
            </plugin>
        </plugins>
    </build>
</project>`],
    [`src/main/java/cl/automotora/modelo/${model}.java`, `package cl.automotora.modelo;

public class ${model} {
${fields.map(([name, type]) => `    private ${type} ${name};`).join("\n")}

    public ${model}() {
    }

    public ${model}(${fields.map(([name, type]) => `${type} ${name}`).join(", ")}) {
${names.map(name => `        this.${name} = ${name};`).join("\n")}
    }

${fields.map(field => {
  const [name, type] = field;
  const accessor = getter(field);
  const suffix = accessor.slice(type === "boolean" ? 2 : 3);
  return `    public ${type} ${accessor}() {
        return ${name};
    }

    public void set${suffix}(${type} ${name}) {
        this.${name} = ${name};
    }`;
}).join("\n\n")}

    @Override
    public String toString() {
        return "${model}{" + ${names.map((name, i) => `${i === 0 ? '"' : '", '}${name}=" + ${name}`).join(" + ")} + '}';
    }
}`],
    ["src/main/java/cl/automotora/conexion/ConexionBD.java", `package cl.automotora.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class ConexionBD {
    private ConexionBD() {}

    public static Connection conectar() throws SQLException {
${supabase ? `        String url = variable("SUPABASE_DB_URL");
        String usuario = variable("SUPABASE_DB_USER");
        String password = variable("SUPABASE_DB_PASSWORD");
        return DriverManager.getConnection(url, usuario, password);
    }

    private static String variable(String nombre) throws SQLException {
        String valor = System.getenv(nombre);
        if (valor == null || valor.isBlank()) {
            throw new SQLException("Falta configurar " + nombre);
        }
        return valor;` : `        String url = "jdbc:mysql://localhost:3306/${database}";
        String usuario = "root";
        String password = "";
        return DriverManager.getConnection(url, usuario, password);`}
    }
}`],
    [`src/main/java/cl/automotora/dao/${model}DAO.java`, `package cl.automotora.dao;

import cl.automotora.conexion.ConexionBD;
import cl.automotora.modelo.${model};
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ${model}DAO {
    public boolean registrar(${model} ficha) throws SQLException {
        String sql = "INSERT INTO ${sqlTable} (${columns}) VALUES (${names.map(() => "?").join(", ")})";
        try (Connection con = ConexionBD.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {
${bind(fields)}
            return ps.executeUpdate() == 1;
        }
    }

    public List<${model}> listar() throws SQLException {
        String sql = "SELECT ${columns} FROM ${sqlTable} ORDER BY ${key}";
        List<${model}> fichas = new ArrayList<>();
        try (Connection con = ConexionBD.conectar();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet filas = ps.executeQuery()) {
            while (filas.next()) {
                fichas.add(leerFila(filas));
            }
        }
        return fichas;
    }

    public ${model} buscar(${keyType} ${key}) throws SQLException {
        String sql = "SELECT ${columns} FROM ${sqlTable} WHERE ${key} = ?";
        try (Connection con = ConexionBD.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.set${jdbcType(keyType)}(1, ${key});
            try (ResultSet filas = ps.executeQuery()) {
                return filas.next() ? leerFila(filas) : null;
            }
        }
    }

    public boolean actualizar(${model} ficha) throws SQLException {
        String sql = "UPDATE ${sqlTable} SET ${editable.map(name => name + " = ?").join(", ")} WHERE ${key} = ?";
        try (Connection con = ConexionBD.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {
${bind([...fields.slice(1), fields[0]])}
            return ps.executeUpdate() == 1;
        }
    }

    public boolean eliminar(${keyType} ${key}) throws SQLException {
        String sql = "DELETE FROM ${sqlTable} WHERE ${key} = ?";
        try (Connection con = ConexionBD.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.set${jdbcType(keyType)}(1, ${key});
            return ps.executeUpdate() == 1;
        }
    }

    private ${model} leerFila(ResultSet filas) throws SQLException {
        return new ${model}(
${fields.map(([name, type]) => `            filas.get${jdbcType(type)}("${name}")`).join(",\n")}
        );
    }
}`],
    [`src/main/java/cl/automotora/${main}.java`, `package cl.automotora;

import cl.automotora.dao.${model}DAO;
import cl.automotora.modelo.${model};
import java.sql.SQLException;

public class ${main} {
    public static void main(String[] args) throws SQLException {
        ${model} ficha = new ${model}(${values});
        ${model}DAO dao = new ${model}DAO();

        System.out.println("Registro insertado: " + dao.registrar(ficha));
        ${model} encontrada = dao.buscar(ficha.${getter(fields[0])}());
        if (encontrada != null) {
            System.out.println("Clave recuperada: " + encontrada.${getter(fields[0])}());
        }
        System.out.println("Total de fichas: " + dao.listar().size());
    }
}`]
  ];
}

function renderDatabaseLesson(context) {
  const providerKey = databaseProvider.value;
  const provider = providers[providerKey];
  const example = databaseExample(context);
  const {vehicle, table, fields} = example;
  const [[key]] = fields;
  const {model, spec} = context;
  const s = spec;
  const files = databaseFiles(context, example, providerKey);
  const projectName = vehicle ? "AutomotoraMaven" : `${model}Maven`;
  const supabase = providerKey === "supabase";
  const sqlTable = supabase ? `public.${table}` : table;

  byId("context-title").textContent = `Java, Maven y ${provider.name} · ${context.name}`;
  byId("context-description").textContent =
    `Construye el proyecto ${projectName} en Java 17 y NetBeans. La clase ${model} representa la ficha, ${model}DAO ejecuta sentencias SQL sobre la tabla ${sqlTable} con PreparedStatement y ConexionBD abre la sesión hacia ${provider.name}.`;
  byId("db-driver").textContent = `${provider.group}:${provider.artifact}:${provider.version}`;
  if (byId("db-dependency-xml")) {
    byId("db-dependency-xml").textContent = `<dependencies>
    <dependency>
      <groupId>${provider.group}</groupId>
      <artifactId>${provider.artifact}</artifactId>
      <version>${provider.version}</version>
  </dependency>
  </dependencies>`;
  }
  byId("db-engine").textContent = provider.name;
  byId("mysql-setup").hidden = providerKey !== "mysql";
  byId("supabase-setup").hidden = providerKey !== "supabase";
  byId("db-table-description").textContent =
    `La tabla ${sqlTable} usa ${s.codeAttr} (CHAR(8)) como PRIMARY KEY y exige ${s.keyAttr} (${s.keyLabel}) UNIQUE.`;

  if (byId("db-project-heading")) {
    byId("db-project-heading").textContent = projectName;
  }

  // Tabla comparativa ArrayList vs JDBC + SQL adaptada al dominio
  const compTbody = byId("db-comparison-tbody");
  if (compTbody) {
    compTbody.innerHTML = `
      <tr>
        <td><strong>Almacenamiento</strong></td>
        <td><code>private final List&lt;${model}&gt; registros = new ArrayList&lt;&gt;();</code> (temporal en RAM)</td>
        <td>Tabla física <code>${sqlTable}</code> en disco gestionada por MySQL o PostgreSQL</td>
      </tr>
      <tr>
        <td><strong>Guardar / Registrar</strong></td>
        <td>Verifica con <code>buscar(${s.keyAttr}) == null</code> y ejecuta <code>registros.add(ficha)</code></td>
        <td><code>INSERT INTO ${sqlTable} (...) VALUES (?, ?, ...)</code> + <code>ps.executeUpdate() == 1</code></td>
      </tr>
      <tr>
        <td><strong>Buscar por clave</strong></td>
        <td>Recorre el <code>ArrayList</code> con un ciclo <code>for</code> comparando <code>.equals(clave)</code></td>
        <td><code>SELECT * FROM ${sqlTable} WHERE ${key} = ?</code> + <code>if (filas.next()) return leerFila(filas);</code></td>
      </tr>
      <tr>
        <td><strong>Listar todas</strong></td>
        <td><code>return new ArrayList&lt;&gt;(registros);</code> (copia defensiva)</td>
        <td><code>SELECT * FROM ${sqlTable} ORDER BY ${key}</code> + <code>while (filas.next()) fichas.add(leerFila(filas));</code></td>
      </tr>
      <tr>
        <td><strong>Actualizar</strong></td>
        <td><code>registros.set(registros.indexOf(anterior), ficha);</code></td>
        <td><code>UPDATE ${sqlTable} SET ${s.keyAttr} = ?, ${s.groupAttr} = ?, ... WHERE ${key} = ?</code></td>
      </tr>
      <tr>
        <td><strong>Eliminar</strong></td>
        <td><code>return registros.remove(buscar(${s.keyAttr}));</code></td>
        <td><code>DELETE FROM ${sqlTable} WHERE ${key} = ?</code> + <code>return ps.executeUpdate() == 1;</code></td>
      </tr>
    `;
  }

  // 6 Ejercicios dinámicos de Base de Datos y JDBC
  const exercisesGrid = byId("db-exercises-grid");
  if (exercisesGrid) {
    const exercises = [
      {
        level: "Nivel 1 · Básico",
        badgeClass: "pro-badge-emerald",
        title: `Ejercicio 1: Buscar ${model} por ${s.keyLabel} (${s.keyAttr}) con JDBC`,
        desc: `En <code>${model}DAO</code>, escribe el método <code>public ${model} buscarPor${cap(s.keyAttr)}(String ${s.keyAttr}) throws SQLException</code> que ejecute <code>SELECT * FROM ${sqlTable} WHERE ${s.keyAttr} = ?</code> y reconstruya el objeto con <code>leerFila(filas)</code>.`,
        hint: `Pista: Usa <code>ps.setString(1, ${s.keyAttr})</code> y <code>if (filas.next()) return leerFila(filas);</code>.`,
        code: `public ${model} buscarPor${cap(s.keyAttr)}(String ${s.keyAttr}) throws SQLException {
    String sql = "SELECT * FROM ${sqlTable} WHERE ${s.keyAttr} = ?";
    try (Connection con = ConexionBD.conectar();
         PreparedStatement ps = con.prepareStatement(sql)) {
        ps.setString(1, ${s.keyAttr});
        try (ResultSet filas = ps.executeQuery()) {
            return filas.next() ? leerFila(filas) : null;
        }
    }
}`
      },
      {
        level: "Nivel 1 · Básico",
        badgeClass: "pro-badge-emerald",
        title: `Ejercicio 2: Listar ${context.title.toLowerCase()}s por ${s.groupLabel} con WHERE`,
        desc: `Crea el método <code>public List&lt;${model}&gt; listarPor${cap(s.groupAttr)}(String ${s.groupAttr}) throws SQLException</code> que filtre directamente en SQL con <code>WHERE ${s.groupAttr} = ? ORDER BY ${s.nameAttr}</code>.`,
        hint: `Pista: Recorre el <code>ResultSet</code> con <code>while (filas.next())</code> y añade cada fila a un <code>ArrayList&lt;${model}&gt;</code>.`,
        code: `public List<${model}> listarPor${cap(s.groupAttr)}(String ${s.groupAttr}) throws SQLException {
    String sql = "SELECT * FROM ${sqlTable} WHERE ${s.groupAttr} = ? ORDER BY ${s.nameAttr}";
    List<${model}> lista = new ArrayList<>();
    try (Connection con = ConexionBD.conectar();
         PreparedStatement ps = con.prepareStatement(sql)) {
        ps.setString(1, ${s.groupAttr});
        try (ResultSet filas = ps.executeQuery()) {
            while (filas.next()) {
                lista.add(leerFila(filas));
            }
        }
    }
    return lista;
}`
      },
      {
        level: "Nivel 2 · Intermedio",
        badgeClass: "pro-badge-indigo",
        title: `Ejercicio 3: Contar registros con SELECT COUNT(*)`,
        desc: `En lugar de traer todas las filas a memoria para contarlas, escribe <code>public int contarTotal() throws SQLException</code> usando la función de agregación SQL <code>SELECT COUNT(*) FROM ${sqlTable}</code>.`,
        hint: `Pista: Avanza una vez con <code>filas.next()</code> y lee la primera columna con <code>filas.getInt(1)</code>.`,
        code: `public int contarTotal() throws SQLException {
    String sql = "SELECT COUNT(*) FROM ${sqlTable}";
    try (Connection con = ConexionBD.conectar();
         PreparedStatement ps = con.prepareStatement(sql);
         ResultSet filas = ps.executeQuery()) {
        return filas.next() ? filas.getInt(1) : 0;
    }
}`
      },
      {
        level: "Nivel 2 · Intermedio",
        badgeClass: "pro-badge-indigo",
        title: `Ejercicio 4: Actualizar solo un booleano (${s.bool2Attr}) por clave`,
        desc: `Crea el método <code>public boolean cambiar${cap(s.bool2Attr)}(String ${key}, boolean nuevoEstado) throws SQLException</code> que ejecute un <code>UPDATE ${sqlTable} SET ${s.bool2Attr} = ? WHERE ${key} = ?</code>.`,
        hint: `Pista: El primer <code>?</code> es <code>ps.setBoolean(1, nuevoEstado)</code> y el segundo es <code>ps.setString(2, ${key})</code>.`,
        code: `public boolean cambiar${cap(s.bool2Attr)}(String ${key}, boolean nuevoEstado) throws SQLException {
    String sql = "UPDATE ${sqlTable} SET ${s.bool2Attr} = ? WHERE ${key} = ?";
    try (Connection con = ConexionBD.conectar();
         PreparedStatement ps = con.prepareStatement(sql)) {
        ps.setBoolean(1, nuevoEstado);
        ps.setString(2, ${key});
        return ps.executeUpdate() == 1;
    }
}`
      },
      {
        level: "Nivel 3 · Avanzado",
        badgeClass: "pro-badge-amber",
        title: `Ejercicio 5: Búsqueda parcial con LIKE en SQL`,
        desc: `Implementa <code>public List&lt;${model}&gt; buscarPor${cap(s.nameAttr)}Like(String texto) throws SQLException</code> que busque coincidencias parciales en la columna <code>${s.nameAttr}</code> usando el operador SQL <code>LIKE ?</code>.`,
        hint: `Pista: Concatena los comodines <code>"%" + texto.trim() + "%"</code> al pasar el argumento en <code>ps.setString(1, ...)</code>.`,
        code: `public List<${model}> buscarPor${cap(s.nameAttr)}Like(String texto) throws SQLException {
    String sql = "SELECT * FROM ${sqlTable} WHERE ${s.nameAttr} LIKE ? ORDER BY ${s.nameAttr}";
    List<${model}> resultado = new ArrayList<>();
    try (Connection con = ConexionBD.conectar();
         PreparedStatement ps = con.prepareStatement(sql)) {
        ps.setString(1, "%" + texto.trim() + "%");
        try (ResultSet filas = ps.executeQuery()) {
            while (filas.next()) {
                resultado.add(leerFila(filas));
            }
        }
    }
    return resultado;
}`
      },
      {
        level: "Nivel 3 · Reto Transaccional",
        badgeClass: "pro-badge-rose",
        title: `Ejercicio 6: Filtrar por rango de ${s.yearLabel.toLowerCase()} con BETWEEN`,
        desc: `Escribe <code>public List&lt;${model}&gt; listarPorRango${cap(s.yearAttr)}(int desde, int hasta) throws SQLException</code> usando <code>WHERE ${s.yearAttr} BETWEEN ? AND ? ORDER BY ${s.yearAttr} DESC</code>.`,
        hint: `Pista: Enlaza ambos límites enteros con <code>ps.setInt(1, desde)</code> y <code>ps.setInt(2, hasta)</code>.`,
        code: `public List<${model}> listarPorRango${cap(s.yearAttr)}(int desde, int hasta) throws SQLException {
    String sql = "SELECT * FROM ${sqlTable} WHERE ${s.yearAttr} BETWEEN ? AND ? ORDER BY ${s.yearAttr} DESC";
    List<${model}> resultado = new ArrayList<>();
    try (Connection con = ConexionBD.conectar();
         PreparedStatement ps = con.prepareStatement(sql)) {
        ps.setInt(1, desde);
        ps.setInt(2, hasta);
        try (ResultSet filas = ps.executeQuery()) {
            while (filas.next()) {
                resultado.add(leerFila(filas));
            }
        }
    }
    return resultado;
}`
      }
    ];

    exercisesGrid.innerHTML = exercises.map((ex, idx) => `
      <article class="exercise-card">
        <div>
          <div class="exercise-header">
            <span class="pro-badge ${ex.badgeClass}">${ex.level}</span>
            <span class="font-mono text-xs text-ink/50">JDBC #${idx + 1}</span>
          </div>
          <h3 class="mt-3 text-base font-bold">${ex.title}</h3>
          <p class="mt-2 text-xs leading-5 text-ink/75">${ex.desc}</p>
        </div>
        <div>
          <div class="exercise-hint">${ex.hint}</div>
          <details class="solution-accordion">
            <summary>Ver solución JDBC (${model}DAO)</summary>
            <div class="code-window mt-2">
              <pre class="overflow-x-auto p-4 text-xs leading-5"><code id="db-ex-code-${idx}"></code></pre>
            </div>
          </details>
        </div>
      </article>
    `).join("");

    exercises.forEach((ex, idx) => renderCode(`db-ex-code-${idx}`, ex.code));
  }

  renderProjectFiles(files, projectName, 1);
  byId("db-output").textContent = "Pulsa 'Ejecutar simulación' para ver la traza JDBC y SQL.";
}

const simulatedDatabases = new Map();
databaseProvider.addEventListener("change", () => renderDatabaseLesson(active));

function getCurrentTableState() {
  const providerKey = databaseProvider.value;
  const {name} = providers[providerKey];
  const {table, database, fields} = databaseExample(active);
  const supabase = providerKey === "supabase";
  const sqlTable = supabase ? `public.${table}` : table;
  const connection = supabase ? "SUPABASE_DB_URL por JDBC (SSL)" : `jdbc:mysql://localhost:3306/${database}`;
  const [[key, , , identifier]] = fields;
  const databaseKey = `${providerKey}:${table}`;
  if (!simulatedDatabases.has(databaseKey)) simulatedDatabases.set(databaseKey, new Map());
  return {name, sqlTable, connection, fields, key, identifier, rows: simulatedDatabases.get(databaseKey)};
}

byId("run-db").addEventListener("click", () => {
  const {name, sqlTable, connection, fields, key, identifier, rows} = getCurrentTableState();
  const exists = rows.has(identifier);
  if (!exists) rows.set(identifier, fields.map(([col, , , value]) => `${col}=${value}`).join(" · "));
  byId("db-output").textContent = [
    `1. ConexionBD.conectar() → abre sesión hacia ${connection}`,
    `2. ${active.model}DAO.registrar() → INSERT INTO ${sqlTable} VALUES (?, ?, ...)`,
    exists
      ? `   ✖ ERROR SQL (${name}): clave primaria duplicada '${identifier}' para columna '${key}'.\n   En Java se lanza java.sql.SQLIntegrityConstraintViolationException.`
      : `   ✔ ps.executeUpdate() devuelve 1 (fila insertada). try-with-resources cierra PreparedStatement y Connection.`,
    `3. ${active.model}DAO.buscar("${identifier}") → SELECT * FROM ${sqlTable} WHERE ${key} = ?`,
    `   ✔ ResultSet.next() == true → leerFila() reconstruye new ${active.model}(...):`,
    `   [ ${rows.get(identifier)} ]`
  ].join("\n");
});

byId("run-db-update")?.addEventListener("click", () => {
  const {sqlTable, connection, fields, key, identifier, rows} = getCurrentTableState();
  if (!rows.has(identifier)) {
    byId("db-output").textContent = [
      `1. ConexionBD.conectar() → ${connection}`,
      `2. ${active.model}DAO.actualizar() → UPDATE ${sqlTable} SET ... WHERE ${key} = '${identifier}'`,
      `   ✖ ps.executeUpdate() devuelve 0 (la fila aún no existe. Pulsa primero 'Ejecutar simulación' para insertarla).`
    ].join("\n");
    return;
  }
  const updatedRow = fields.map(([col, , , value], idx) =>
    `${col}=${idx === 2 ? value + " (Actualizado)" : value}`).join(" · ");
  rows.set(identifier, updatedRow);
  byId("db-output").textContent = [
    `1. ConexionBD.conectar() → ${connection}`,
    `2. ${active.model}DAO.actualizar() → UPDATE ${sqlTable} SET ... WHERE ${key} = ?`,
    `   ✔ ps.executeUpdate() devuelve 1 (1 fila modificada en la tabla).`,
    `3. Estado actual de la fila en ${sqlTable}:`,
    `   [ ${rows.get(identifier)} ]`
  ].join("\n");
});

byId("run-db-delete")?.addEventListener("click", () => {
  const {sqlTable, connection, key, identifier, rows} = getCurrentTableState();
  const existed = rows.delete(identifier);
  byId("db-output").textContent = [
    `1. ConexionBD.conectar() → ${connection}`,
    `2. ${active.model}DAO.eliminar("${identifier}") → DELETE FROM ${sqlTable} WHERE ${key} = ?`,
    existed
      ? `   ✔ ps.executeUpdate() devuelve 1 → return true (fila eliminada de ${sqlTable}).`
      : `   ✖ ps.executeUpdate() devuelve 0 → return false (no existía ninguna fila con ${key} = '${identifier}').`
  ].join("\n");
});

initContext();
