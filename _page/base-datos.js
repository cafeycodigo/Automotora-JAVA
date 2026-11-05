const databaseProvider = byId("db-provider");
const providers = {
  mysql: {name: "MySQL", group: "com.mysql", artifact: "mysql-connector-j", version: "9.3.0"},
  supabase: {name: "Supabase (PostgreSQL)", group: "org.postgresql", artifact: "postgresql", version: "42.7.14"}
};

function databaseExample(context) {
  const vehicle = context.model === "Vehiculo";
  const table = javaName(context.model);
  const fields = vehicle ? [
    ["codigo", "String", "CHAR(8)", "88202601"],
    ["patente", "String", "VARCHAR(10)", "ABCD12"],
    ["marca", "String", "VARCHAR(50)", "Ferrari"],
    ["modelo", "String", "VARCHAR(50)", "F8 Tributo"],
    ["anio", "int", "INT", 2023],
    ["electrico", "boolean", "BOOLEAN", false],
    ["disponible", "boolean", "BOOLEAN", true],
    ["tipo", "String", "VARCHAR(50)", "Superdeportivo"],
    ["color", "String", "VARCHAR(50)", "Rojo"],
    ["transmision", "String", "VARCHAR(50)", "Automática"]
  ] : [[context.key, context.example], ...context.fields].map(([label, value], index) =>
    [javaName(label), "String", index === 0 ? "VARCHAR(64)" : "VARCHAR(100)", value]);
  return {vehicle, table, fields, database: vehicle ? "automotora_db" : `${table}_db`};
}

function databaseFiles(context, example, providerKey) {
  const provider = providers[providerKey];
  const supabase = providerKey === "supabase";
  const {vehicle, table, fields, database} = example;
  const {model} = context;
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
    const constraint = index === 0 ? " PRIMARY KEY" : name === "patente" ? " UNIQUE" : "";
    const defaultValue = name === "electrico" ? " DEFAULT FALSE" : name === "disponible" ? " DEFAULT TRUE" : "";
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
  const files = databaseFiles(context, example, providerKey);
  const projectName = vehicle ? "AutomotoraMaven" : `${context.model}Maven`;
  byId("context-title").textContent = `Java, Maven y ${provider.name} · ${context.name}`;
  byId("context-description").textContent =
    `Construye un proyecto Java 17 en NetBeans. El modelo representa la ficha, el DAO ejecuta SQL y ConexionBD abre una conexión a ${provider.name}.`;
  byId("db-driver").textContent = `${provider.group}:${provider.artifact}:${provider.version}`;
  byId("db-engine").textContent = provider.name;
  byId("mysql-setup").hidden = providerKey !== "mysql";
  byId("supabase-setup").hidden = providerKey !== "supabase";
  byId("db-table-description").textContent = vehicle
    ? "El esquema usa código como clave primaria y exige una patente única. En la lección del DAO en memoria, la búsqueda usa patente."
    : `Crea la tabla ${table} y usa ${context.key} (${key}) como clave primaria. Cada atributo de la ficha tiene su columna.`;

  renderProjectFiles(files, projectName, 1);
  byId("db-output").textContent = "Los resultados aparecerán aquí.";
}

const simulatedDatabases = new Map();
databaseProvider.addEventListener("change", () => renderDatabaseLesson(active));
byId("run-db").addEventListener("click", () => {
  const providerKey = databaseProvider.value;
  const {name} = providers[providerKey];
  const {table, database, fields} = databaseExample(active);
  const supabase = providerKey === "supabase";
  const sqlTable = supabase ? `public.${table}` : table;
  const connection = supabase ? "SUPABASE_DB_URL por JDBC" : `jdbc:mysql://localhost:3306/${database}`;
  const [[key, , , identifier]] = fields;
  const databaseKey = `${providerKey}:${table}`;
  if (!simulatedDatabases.has(databaseKey)) simulatedDatabases.set(databaseKey, new Map());
  const rows = simulatedDatabases.get(databaseKey);
  const exists = rows.has(identifier);
  if (!exists) rows.set(identifier, fields.map(([name, , , value]) => `${name}=${value}`).join(" · "));
  byId("db-output").textContent = [
    `1. ConexionBD usa ${connection}.`,
    `2. DAO.registrar → INSERT en ${sqlTable}.`,
    exists
      ? `   ${name} rechaza el duplicado de ${key} ${identifier}. En el ejemplo Java se propaga SQLException.`
      : "   Fila insertada. El DAO cierra la conexión.",
    `3. Consulta independiente: SELECT * FROM ${sqlTable} WHERE ${key} = ?`,
    `   ${rows.get(identifier)}`
  ].join("\n");
});

initContext();
