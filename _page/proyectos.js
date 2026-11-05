function javaName(label) {
  return label.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function buildJavaProject(context) {
  const {model, key, format, example, spec} = context;
  const s = spec;
  const cap = name => name[0].toUpperCase() + name.slice(1);
  const normalize = key === "UUID" ? "toLowerCase" : "toUpperCase";
  const keyName = s.keyAttr;
  const getter = "get" + cap(keyName);
  const pkgBase = javaName(model);
  const pkgDao = `com.mycompany.${pkgBase}dao`;
  const pkgDaoPath = `com/mycompany/${pkgBase}dao`;
  const pkgModelOnly = `com.mycompany.${pkgBase}`;
  const pkgModelOnlyPath = `com/mycompany/${pkgBase}`;
  const pkgDb = `com.mycompany.${pkgBase}db`;
  const pkgDbPath = `com/mycompany/${pkgBase}db`;

  const constructorArgs = `${JSON.stringify(s.codeExample)}, ${JSON.stringify(s.keyExample)}, ${JSON.stringify(s.groupExample)}, ${JSON.stringify(s.nameExample)}, ${s.yearExample}, ${s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorExample)}, ${JSON.stringify(s.modeExample)}`;
  const altArgs = `"88202602", ${JSON.stringify(s.keyAltExample)}, ${JSON.stringify(s.groupAlt)}, ${JSON.stringify(s.nameAlt)}, ${s.yearExample + 1}, ${!s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorAlt)}, ${JSON.stringify(s.modeExample)}`;

  const buildModelSource = pkg => `package ${pkg}.modelo;

import java.util.Locale;

public class ${model} {

    private String ${s.codeAttr};
    private String ${s.keyAttr};
    private String ${s.groupAttr};
    private String ${s.nameAttr};
    private int ${s.yearAttr};
    private boolean ${s.bool1Attr};
    private boolean ${s.bool2Attr};
    private String ${s.typeAttr};
    private String ${s.colorAttr};
    private String ${s.modeAttr};

    public ${model}() {
    }

    public ${model}(String ${s.codeAttr}, String ${s.keyAttr}, String ${s.groupAttr}, String ${s.nameAttr}, int ${s.yearAttr},
            boolean ${s.bool1Attr}, boolean ${s.bool2Attr}, String ${s.typeAttr}, String ${s.colorAttr}, String ${s.modeAttr}) {
        set${cap(s.codeAttr)}(${s.codeAttr});
        set${cap(s.keyAttr)}(${s.keyAttr});
        set${cap(s.groupAttr)}(${s.groupAttr});
        set${cap(s.nameAttr)}(${s.nameAttr});
        set${cap(s.yearAttr)}(${s.yearAttr});
        set${cap(s.bool1Attr)}(${s.bool1Attr});
        set${cap(s.bool2Attr)}(${s.bool2Attr});
        set${cap(s.typeAttr)}(${s.typeAttr});
        set${cap(s.colorAttr)}(${s.colorAttr});
        set${cap(s.modeAttr)}(${s.modeAttr});
    }

    public String get${cap(s.codeAttr)}() {
        return ${s.codeAttr};
    }

    public void set${cap(s.codeAttr)}(String ${s.codeAttr}) {
        if (${s.codeAttr} == null || ${s.codeAttr}.length() != 8) {
            throw new IllegalArgumentException("El ${s.codeLabel.toLowerCase()} debe tener exactamente 8 dígitos.");
        }
        for (int i = 0; i < ${s.codeAttr}.length(); i++) {
            if (!Character.isDigit(${s.codeAttr}.charAt(i))) {
                throw new IllegalArgumentException("El ${s.codeLabel.toLowerCase()} solo puede contener números.");
            }
        }
        this.${s.codeAttr} = ${s.codeAttr};
    }

    public String get${cap(s.keyAttr)}() {
        return ${s.keyAttr};
    }

    public void set${cap(s.keyAttr)}(String ${s.keyAttr}) {
        String limpia = normalizarClave(${s.keyAttr});
        if (!limpia.matches(${JSON.stringify(format.source)})) {
            throw new IllegalArgumentException("${s.keyLabel} inválido (${s.keyFormatDesc}).");
        }
        this.${s.keyAttr} = limpia;
    }

    public String get${cap(s.groupAttr)}() {
        return ${s.groupAttr};
    }

    public void set${cap(s.groupAttr)}(String ${s.groupAttr}) {
        this.${s.groupAttr} = textoObligatorio(${s.groupAttr}, "${s.groupLabel}");
    }

    public String get${cap(s.nameAttr)}() {
        return ${s.nameAttr};
    }

    public void set${cap(s.nameAttr)}(String ${s.nameAttr}) {
        String limpio = textoObligatorio(${s.nameAttr}, "${s.nameLabel}");
        if (limpio.length() < 2) {
            throw new IllegalArgumentException("Falta más información en ${s.nameLabel.toLowerCase()}.");
        }
        this.${s.nameAttr} = limpio;
    }

    public int get${cap(s.yearAttr)}() {
        return ${s.yearAttr};
    }

    public void set${cap(s.yearAttr)}(int ${s.yearAttr}) {
        if (${s.yearAttr} < 2015) {
            throw new IllegalArgumentException("El ${s.yearLabel.toLowerCase()} debe ser igual o posterior a 2015.");
        }
        this.${s.yearAttr} = ${s.yearAttr};
    }

    public boolean is${cap(s.bool1Attr)}() {
        return ${s.bool1Attr};
    }

    public void set${cap(s.bool1Attr)}(boolean ${s.bool1Attr}) {
        this.${s.bool1Attr} = ${s.bool1Attr};
    }

    public boolean is${cap(s.bool2Attr)}() {
        return ${s.bool2Attr};
    }

    public void set${cap(s.bool2Attr)}(boolean ${s.bool2Attr}) {
        this.${s.bool2Attr} = ${s.bool2Attr};
    }

    public String get${cap(s.typeAttr)}() {
        return ${s.typeAttr};
    }

    public void set${cap(s.typeAttr)}(String ${s.typeAttr}) {
        this.${s.typeAttr} = textoObligatorio(${s.typeAttr}, "${s.typeLabel}");
    }

    public String get${cap(s.colorAttr)}() {
        return ${s.colorAttr};
    }

    public void set${cap(s.colorAttr)}(String ${s.colorAttr}) {
        this.${s.colorAttr} = textoObligatorio(${s.colorAttr}, "${s.colorLabel}");
    }

    public String get${cap(s.modeAttr)}() {
        return ${s.modeAttr};
    }

    public void set${cap(s.modeAttr)}(String ${s.modeAttr}) {
        this.${s.modeAttr} = textoObligatorio(${s.modeAttr}, "${s.modeLabel}");
    }

    public static String normalizarClave(String valor) {
        return textoObligatorio(valor, "${s.keyLabel}").${normalize}(Locale.ROOT);
    }

    private static String textoObligatorio(String valor, String campo) {
        if (valor == null || valor.trim().isEmpty()) {
            throw new IllegalArgumentException(campo + " es obligatorio.");
        }
        return valor.trim();
    }

    @Override
    public String toString() {
        return "${model}{" + "${s.codeAttr}=" + ${s.codeAttr} + ", ${s.keyAttr}=" + ${s.keyAttr}
                + ", ${s.groupAttr}=" + ${s.groupAttr} + ", ${s.nameAttr}=" + ${s.nameAttr}
                + ", ${s.yearAttr}=" + ${s.yearAttr} + ", ${s.bool1Attr}=" + ${s.bool1Attr}
                + ", ${s.bool2Attr}=" + ${s.bool2Attr} + ", ${s.typeAttr}=" + ${s.typeAttr}
                + ", ${s.colorAttr}=" + ${s.colorAttr} + ", ${s.modeAttr}=" + ${s.modeAttr} + '}';
    }
}`;

  const buildFormXml = title => `<?xml version="1.0" encoding="UTF-8" ?>
<Form version="1.3" maxVersion="1.9" type="org.netbeans.modules.form.forminfo.JFrameFormInfo">
  <Properties>
    <Property name="defaultCloseOperation" type="int" value="3"/>
    <Property name="title" type="java.lang.String" value="${title}"/>
  </Properties>
  <SyntheticProperties>
    <SyntheticProperty name="formSizePolicy" type="int" value="1"/>
    <SyntheticProperty name="generateCenter" type="boolean" value="false"/>
  </SyntheticProperties>
  <SubComponents>
    <Component class="javax.swing.JTextField" name="txt${cap(s.codeAttr)}"/>
    <Component class="javax.swing.JTextField" name="txt${cap(s.keyAttr)}"/>
    <Component class="javax.swing.JTextField" name="txt${cap(s.groupAttr)}"/>
    <Component class="javax.swing.JTextField" name="txt${cap(s.nameAttr)}"/>
    <Component class="javax.swing.JTextField" name="txt${cap(s.yearAttr)}"/>
    <Component class="javax.swing.JCheckBox" name="check${cap(s.bool1Attr)}"/>
    <Component class="javax.swing.JCheckBox" name="check${cap(s.bool2Attr)}"/>
    <Component class="javax.swing.JComboBox" name="cb${cap(s.typeAttr)}"/>
    <Component class="javax.swing.JComboBox" name="cb${cap(s.colorAttr)}"/>
    <Component class="javax.swing.JButton" name="btnAgregar"/>
    <Component class="javax.swing.JButton" name="btnBuscar"/>
    <Component class="javax.swing.JButton" name="btnActualizar"/>
    <Component class="javax.swing.JButton" name="btnEliminar"/>
    <Component class="javax.swing.JButton" name="btnListar"/>
    <Component class="javax.swing.JTable" name="jTable1"/>
  </SubComponents>
</Form>`;

  const buildPomSource = (artifactId, mainClass) => `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.mycompany</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.release>17</maven.compiler.release>
        <exec.mainClass>${mainClass}</exec.mainClass>
    </properties>
</project>`;

  return [
    [
      `${model}DAO/src/main/java/${pkgDaoPath}/${model}DAOApp.java`,
      `package ${pkgDao};

import ${pkgDao}.dao.${model}DAO;
import ${pkgDao}.modelo.${model};

public class ${model}DAOApp {

    public static void main(String[] args) {
        ${model}DAO dao = new ${model}DAO();

        ${model} r1 = new ${model}(${constructorArgs});
        ${model} r2 = new ${model}(${altArgs});

        // 1. CREATE - GUARDAR
        System.out.println("Guardar r1: " + dao.guardar(r1));
        System.out.println("Guardar r2: " + dao.guardar(r2));
        System.out.println("Guardar duplicado r1: " + dao.guardar(r1));

        // 2. LISTAR TODOS
        System.out.println("\\n*********** LISTADO GENERAL ***********");
        for (${model} item : dao.listar()) {
            System.out.println(" -> " + item.toString());
        }

        // 3. READ - BUSCAR POR CLAVE (${s.keyLabel})
        String clave = ${JSON.stringify(example)};
        ${model} encontrado = dao.buscar(clave);
        System.out.println("\\nEncontrado (" + clave + "): " + encontrado);

        // 4. UPDATE - ACTUALIZAR
        if (encontrado != null) {
            encontrado.set${cap(s.colorAttr)}(${JSON.stringify(s.colorAlt)});
            System.out.println("Actualizado: " + dao.actualizar(encontrado));
        }

        // 5. CONSULTAS Y REPORTES DE NEGOCIO
        System.out.println("\\nCantidad total: " + dao.cantidadTotal());
        System.out.println("Contar ${s.bool1Plural.toLowerCase()}: " + dao.contar${cap(s.bool1Plural)}());
        System.out.println("Más antiguo: " + dao.obtener${model}MasAntiguo());
        System.out.println("Más nuevo: " + dao.obtener${model}MasNuevo());

        // 6. DELETE - ELIMINAR
        System.out.println("\\nEliminar " + clave + ": " + dao.eliminar(clave));
        System.out.println("Total final: " + dao.cantidadTotal());
    }
}`
    ],
    [
      `${model}DAO/src/main/java/${pkgDaoPath}/dao/${model}DAO.java`,
      `package ${pkgDao}.dao;

import ${pkgDao}.modelo.${model};
import java.util.ArrayList;

public class ${model}DAO {

    private final ArrayList<${model}> ${context.listName} = new ArrayList<>();

    public boolean guardar(${model} ${context.itemVar}) {
        if (${context.itemVar} == null) {
            return false;
        }
        if (buscar(${context.itemVar}.${getter}()) != null) {
            return false;
        }
        ${context.listName}.add(${context.itemVar});
        return true;
    }

    public ${model} buscar(String ${keyName}) {
        String clave = ${model}.normalizarClave(${keyName});
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.${getter}().equals(clave)) {
                return ${context.itemVar};
            }
        }
        return null;
    }

    public boolean actualizar(${model} ${context.itemVar}) {
        ${model} encontrado = buscar(${context.itemVar}.${getter}());
        if (encontrado == null) {
            return false;
        }
        encontrado.set${cap(s.codeAttr)}(${context.itemVar}.get${cap(s.codeAttr)}());
        encontrado.set${cap(s.groupAttr)}(${context.itemVar}.get${cap(s.groupAttr)}());
        encontrado.set${cap(s.nameAttr)}(${context.itemVar}.get${cap(s.nameAttr)}());
        encontrado.set${cap(s.yearAttr)}(${context.itemVar}.get${cap(s.yearAttr)}());
        encontrado.set${cap(s.bool1Attr)}(${context.itemVar}.is${cap(s.bool1Attr)}());
        encontrado.set${cap(s.bool2Attr)}(${context.itemVar}.is${cap(s.bool2Attr)}());
        encontrado.set${cap(s.typeAttr)}(${context.itemVar}.get${cap(s.typeAttr)}());
        encontrado.set${cap(s.colorAttr)}(${context.itemVar}.get${cap(s.colorAttr)}());
        encontrado.set${cap(s.modeAttr)}(${context.itemVar}.get${cap(s.modeAttr)}());
        return true;
    }

    public boolean eliminar(String ${keyName}) {
        int indice = 0;
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.${getter}().equals(${keyName})) {
                ${context.listName}.remove(indice);
                return true;
            }
            indice++;
        }
        return false;
    }

    public ArrayList<${model}> listar() {
        return new ArrayList<>(${context.listName});
    }

    // ==========================================
    // MÉTODOS DE CONSULTA Y REPORTES ("PREGUNTAS")
    // ==========================================
    public ArrayList<${model}> listar${cap(s.bool1Plural)}() {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.is${cap(s.bool1Attr)}()) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }

    public int contar${cap(s.bool1Plural)}() {
        int contador = 0;
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.is${cap(s.bool1Attr)}()) {
                contador++;
            }
        }
        return contador;
    }

    public ArrayList<${model}> listar${cap(s.bool2Plural)}() {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.is${cap(s.bool2Attr)}()) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }

    public ArrayList<${model}> buscarPor${cap(s.groupAttr)}(String ${s.groupAttr}) {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.groupAttr)}() != null && ${context.itemVar}.get${cap(s.groupAttr)}().equalsIgnoreCase(${s.groupAttr})) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }

    public ArrayList<${model}> buscarPor${cap(s.typeAttr)}(String ${s.typeAttr}) {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.typeAttr)}() != null && ${context.itemVar}.get${cap(s.typeAttr)}().equalsIgnoreCase(${s.typeAttr})) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }

    public int cantidadTotal() {
        return ${context.listName}.size();
    }

    public ArrayList<${model}> buscarPor${cap(s.modeAttr)}(String ${s.modeAttr}) {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.modeAttr)}() != null && ${context.itemVar}.get${cap(s.modeAttr)}().equalsIgnoreCase(${s.modeAttr})) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }

    public ArrayList<${model}> listarDesde${cap(s.yearAttr)}(int minimo) {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.yearAttr)}() >= minimo) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }

    public ArrayList<${model}> buscarPor${cap(s.colorAttr)}(String ${s.colorAttr}) {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.colorAttr)}() != null && ${context.itemVar}.get${cap(s.colorAttr)}().equalsIgnoreCase(${s.colorAttr})) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }

    public int contarPor${cap(s.bool2Attr)}(boolean estado) {
        int contador = 0;
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.is${cap(s.bool2Attr)}() == estado) {
                contador++;
            }
        }
        return contador;
    }

    public ${model} obtener${model}MasAntiguo() {
        if (${context.listName}.isEmpty()) {
            return null;
        }
        ${model} masAntiguo = ${context.listName}.get(0);
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.yearAttr)}() < masAntiguo.get${cap(s.yearAttr)}()) {
                masAntiguo = ${context.itemVar};
            }
        }
        return masAntiguo;
    }

    public ${model} obtener${model}MasNuevo() {
        if (${context.listName}.isEmpty()) {
            return null;
        }
        ${model} masNuevo = ${context.listName}.get(0);
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.yearAttr)}() > masNuevo.get${cap(s.yearAttr)}()) {
                masNuevo = ${context.itemVar};
            }
        }
        return masNuevo;
    }

    public ArrayList<${model}> buscarPor${cap(s.nameAttr)}Parcial(String texto) {
        ArrayList<${model}> resultado = new ArrayList<>();
        for (${model} ${context.itemVar} : ${context.listName}) {
            if (${context.itemVar}.get${cap(s.nameAttr)}() != null
                    && ${context.itemVar}.get${cap(s.nameAttr)}().toLowerCase().contains(texto.toLowerCase())) {
                resultado.add(${context.itemVar});
            }
        }
        return resultado;
    }
}`
    ],
    [
      `${model}DAO/src/main/java/${pkgDaoPath}/modelo/${model}.java`,
      buildModelSource(pkgDao)
    ],
    [
      `${model}DAO/src/main/java/${pkgDaoPath}/vista/${model}Vista.form`,
      buildFormXml(`Mantención de ${context.name}`)
    ],
    [
      `${model}DAO/src/main/java/${pkgDaoPath}/vista/${model}Vista.java`,
      `package ${pkgDao}.vista;

import ${pkgDao}.dao.${model}DAO;
import ${pkgDao}.modelo.${model};
import javax.swing.table.DefaultTableModel;

public class ${model}Vista extends javax.swing.JFrame {

    private final ${model}DAO dao = new ${model}DAO();
    private final DefaultTableModel modeloTabla = new DefaultTableModel(
        new Object[]{"${s.codeLabel}", "${s.keyLabel}", "${s.groupLabel}", "${s.nameLabel}", "${s.yearLabel}"}, 0
    );

    public void actualizarTabla() {
        modeloTabla.setRowCount(0);
        for (${model} ${context.itemVar} : dao.listar()) {
            modeloTabla.addRow(new Object[]{
                ${context.itemVar}.get${cap(s.codeAttr)}(),
                ${context.itemVar}.get${cap(s.keyAttr)}(),
                ${context.itemVar}.get${cap(s.groupAttr)}(),
                ${context.itemVar}.get${cap(s.nameAttr)}(),
                ${context.itemVar}.get${cap(s.yearAttr)}()
            });
        }
    }
}`
    ],
    [
      `${model}DAO/pom.xml`,
      buildPomSource(`${model}DAO`, `${pkgDao}.${model}DAOApp`)
    ],
    [
      `${model}/src/main/java/${pkgModelOnlyPath}/${model}App.java`,
      `package ${pkgModelOnly};

import ${pkgModelOnly}.modelo.${model};

public class ${model}App {

    public static void main(String[] args) {
        ${model} ficha = new ${model}(${constructorArgs});
        System.out.println("Ficha creada -> " + ficha.toString());
    }
}`
    ],
    [
      `${model}/src/main/java/${pkgModelOnlyPath}/modelo/${model}.java`,
      buildModelSource(pkgModelOnly)
    ],
    [
      `${model}/src/main/java/${pkgModelOnlyPath}/vista/${model}Vista.form`,
      buildFormXml(`Registro de ${context.name}`)
    ],
    [
      `${model}/src/main/java/${pkgModelOnlyPath}/vista/${model}Vista.java`,
      `package ${pkgModelOnly}.vista;

import ${pkgModelOnly}.modelo.${model};

public class ${model}Vista extends javax.swing.JFrame {
    // Vista Swing inicial conectada a la clase ${model}
}`
    ],
    [
      `${model}/pom.xml`,
      buildPomSource(model, `${pkgModelOnly}.${model}App`)
    ],
    [
      `${model}DB/src/main/java/${pkgDbPath}/${model}DB.java`,
      `package ${pkgDb};

public class ${model}DB {

    public static void main(String[] args) {
        System.out.println("Módulo base para persistencia JDBC de ${model}");
    }
}`
    ],
    [
      `${model}DB/pom.xml`,
      buildPomSource(`${model}DB`, `${pkgDb}.${model}DB`)
    ]
  ];
}

function renderProject(context, isVehicle) {
  const files = isVehicle ? automotoraFiles : buildJavaProject(context);
  byId("project-title").textContent = isVehicle ? "Fuentes de Automotora" : `Fuentes de ${context.domain}`;
  byId("project-description").textContent = isVehicle
    ? "Explora el modelo, el DAO, los puntos de entrada, las vistas Swing, los formularios de NetBeans y los POM de los tres módulos. AutomotoraDB contiene un punto de partida."
    : `Explora los tres módulos Maven (${context.model}DAO, ${context.model} y ${context.model}DB) con sus carpetas y paquetes modelo, dao, vista y pom.xml adaptados a ${context.name}.`;
  const initial = files.findIndex(([path]) => path.endsWith(`/modelo/${context.model}.java`));
  renderProjectFiles(files, null, initial >= 0 ? initial : 0);
}

function renderProjectFiles(files, projectName, initial) {
  const controls = byId("project-files");
  controls.replaceChildren();
  const folders = new Map();

  function folder(parent, label, icon, open, kind = "folder") {
    if (!folders.has(parent)) folders.set(parent, new Map());
    const children = folders.get(parent);
    if (!children.has(label)) {
      const branch = document.createElement("details");
      branch.className = `tree-branch tree-${kind}`;
      branch.open = open;
      const summary = document.createElement("summary");
      summary.className = "tree-summary";
      const text = document.createElement("span");
      text.className = "tree-label";
      text.textContent = label;
      summary.append(treeIcon(icon), text);
      branch.append(summary);
      const body = document.createElement("div");
      body.className = "tree-children";
      branch.append(body);
      parent.append(branch);
      children.set(label, body);
    }
    return children.get(label);
  }

  const buttons = files.map(([path]) => {
    const parts = path.split("/");
    const name = parts.pop();
    const module = projectName ?? parts.shift();
    const primary = projectName !== null || module.endsWith("DAO");
    const root = folder(controls, module, "☕", primary, "project");
    const isSource = name.endsWith(".java") || name.endsWith(".form");
    let parent = folder(
      root,
      isSource ? "Source Packages" : "Project Files",
      "📁",
      isSource || projectName !== null,
      "source-root"
    );
    if (isSource) {
      const pkgParts = parts.slice(3);
      if (pkgParts.length > 0) {
        let basePkgCount = 1;
        if (pkgParts[0] === "com" && pkgParts.length >= 3) basePkgCount = 3;
        else if (pkgParts[0] === "cl" && pkgParts.length >= 2) basePkgCount = 2;

        const basePkg = pkgParts.slice(0, basePkgCount).join(".");
        parent = folder(parent, basePkg, "📦", true, "package");

        const subFolders = pkgParts.slice(basePkgCount);
        for (const sub of subFolders) {
          parent = folder(parent, sub, "📁", true, "subfolder");
        }
      } else {
        parent = folder(parent, "<default package>", "📦", true, "package");
      }
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "tree-file";
    button.append(treeIcon(name.endsWith(".java") ? "♨" : "📄"), name);
    parent.append(button);
    return button;
  });

  function select(index) {
    const [path, source] = files[index];
    buttons.forEach((button, position) => button.setAttribute("aria-pressed", position === index));
    byId("project-tab").textContent = path.split("/").pop();
    byId("project-path").textContent = path;
    const lineCount = source.replace(/\n$/, "").split("\n").length;
    byId("project-lines").textContent = Array.from({length: lineCount}, (_, line) => line + 1).join("\n");
    byId("project-lines").parentElement.scrollTo(0, 0);
    byId("project-copy-status").textContent = "";
    renderCode("project-code", source);
  }
  buttons.forEach((button, index) => button.addEventListener("click", () => select(index)));
  select(initial);
}

function treeIcon(symbol) {
  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.className = "mr-1 inline-block w-5 text-center";
  icon.textContent = symbol;
  return icon;
}
