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
  const constructorArgs = `${JSON.stringify(s.codeExample)}, ${JSON.stringify(s.keyExample)}, ${JSON.stringify(s.groupExample)}, ${JSON.stringify(s.nameExample)}, ${s.yearExample}, ${s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorExample)}, ${JSON.stringify(s.modeExample)}`;
  const updatedArgs = `${JSON.stringify(s.codeExample)}, ${JSON.stringify(s.keyExample)}, ${JSON.stringify(s.groupExample)}, ${JSON.stringify(s.nameAlt)}, ${s.yearExample}, ${!s.bool1Default}, ${s.bool2Default}, ${JSON.stringify(s.typeExample)}, ${JSON.stringify(s.colorAlt)}, ${JSON.stringify(s.modeExample)}`;

  return [
    [`${model}.java`, `import java.util.Locale;

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
        String limpio = textoObligatorio(${s.codeAttr}, "${s.codeLabel}");
        if (!limpio.matches("\\\\d{8}")) {
            throw new IllegalArgumentException("El ${s.codeLabel.toLowerCase()} debe tener 8 números.");
        }
        this.${s.codeAttr} = limpio;
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
        this.${s.nameAttr} = textoObligatorio(${s.nameAttr}, "${s.nameLabel}");
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

    static String normalizarClave(String valor) {
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
        return "${model}{${s.codeAttr}=" + ${s.codeAttr} + ", ${s.keyAttr}=" + ${s.keyAttr}
                + ", ${s.groupAttr}=" + ${s.groupAttr} + ", ${s.nameAttr}=" + ${s.nameAttr}
                + ", ${s.yearAttr}=" + ${s.yearAttr} + ", ${s.bool1Attr}=" + ${s.bool1Attr}
                + ", ${s.bool2Attr}=" + ${s.bool2Attr} + ", ${s.typeAttr}=" + ${s.typeAttr}
                + ", ${s.colorAttr}=" + ${s.colorAttr} + ", ${s.modeAttr}=" + ${s.modeAttr} + '}';
    }
}`],
    [`${model}DAO.java`, `import java.util.ArrayList;
import java.util.List;

public class ${model}DAO {
    private final List<${model}> registros = new ArrayList<>();

    public boolean guardar(${model} registro) {
        if (registro == null || buscar(registro.${getter}()) != null) {
            return false;
        }
        return registros.add(registro);
    }

    public ${model} buscar(String ${keyName}) {
        String clave = ${model}.normalizarClave(${keyName});
        for (${model} registro : registros) {
            if (registro.${getter}().equals(clave)) {
                return registro;
            }
        }
        return null;
    }

    public List<${model}> listar() {
        return new ArrayList<>(registros);
    }

    public boolean actualizar(${model} registro) {
        ${model} anterior = buscar(registro.${getter}());
        if (anterior == null) {
            return false;
        }
        registros.set(registros.indexOf(anterior), registro);
        return true;
    }

    public boolean eliminar(String ${keyName}) {
        return registros.remove(buscar(${keyName}));
    }

    public List<${model}> listarPor${cap(s.groupAttr)}(String ${s.groupAttr}) {
        String filtro = textoFiltro(${s.groupAttr});
        List<${model}> resultado = new ArrayList<>();
        for (${model} registro : registros) {
            if (registro.get${cap(s.groupAttr)}().equalsIgnoreCase(filtro)) {
                resultado.add(registro);
            }
        }
        return resultado;
    }

    public List<${model}> listarPor${cap(s.typeAttr)}(String ${s.typeAttr}) {
        String filtro = textoFiltro(${s.typeAttr});
        List<${model}> resultado = new ArrayList<>();
        for (${model} registro : registros) {
            if (registro.get${cap(s.typeAttr)}().equalsIgnoreCase(filtro)) {
                resultado.add(registro);
            }
        }
        return resultado;
    }

    public List<${model}> listarPor${cap(s.yearAttr)}(int ${s.yearAttr}) {
        List<${model}> resultado = new ArrayList<>();
        for (${model} registro : registros) {
            if (registro.get${cap(s.yearAttr)}() == ${s.yearAttr}) {
                resultado.add(registro);
            }
        }
        return resultado;
    }

    public List<${model}> listar${cap(s.bool1Plural)}() {
        List<${model}> resultado = new ArrayList<>();
        for (${model} registro : registros) {
            if (registro.is${cap(s.bool1Attr)}()) {
                resultado.add(registro);
            }
        }
        return resultado;
    }

    public List<${model}> listar${cap(s.bool2Plural)}() {
        List<${model}> resultado = new ArrayList<>();
        for (${model} registro : registros) {
            if (registro.is${cap(s.bool2Attr)}()) {
                resultado.add(registro);
            }
        }
        return resultado;
    }

    public int contarTotal() {
        return registros.size();
    }

    public int contar${cap(s.bool1Plural)}() {
        return listar${cap(s.bool1Plural)}().size();
    }

    public int contar${cap(s.bool2Plural)}() {
        return listar${cap(s.bool2Plural)}().size();
    }

    private static String textoFiltro(String valor) {
        return valor == null ? "" : valor.trim();
    }
}`],
    [`Demo${model}.java`, `public class Demo${model} {
    public static void main(String[] args) {
        ${model}DAO dao = new ${model}DAO();
        String ${keyName} = ${JSON.stringify(example)};
        ${model} registro = new ${model}(${constructorArgs});

        System.out.println("Guardar: " + dao.guardar(registro));
        System.out.println("Guardar duplicado: " + dao.guardar(registro));
        System.out.println("Buscar: " + dao.buscar(${keyName}));
        System.out.println("Total: " + dao.contarTotal());

        ${model} actualizado = new ${model}(${updatedArgs});
        System.out.println("Actualizar: " + dao.actualizar(actualizado));
        System.out.println("Después de actualizar: " + dao.buscar(${keyName}));
        System.out.println("Eliminar: " + dao.eliminar(${keyName}));
        System.out.println("Listado final: " + dao.listar());
    }
}`]
  ];
}

function renderProject(context, isVehicle) {
  const files = isVehicle ? automotoraFiles : buildJavaProject(context);
  byId("project-title").textContent = isVehicle ? "Fuentes de Automotora" : `Proyecto Java · ${context.name}`;
  byId("project-description").textContent = isVehicle
    ? "Explora el modelo, el DAO, los puntos de entrada, las vistas Swing, los formularios de NetBeans y los POM de los tres módulos. AutomotoraDB contiene un punto de partida."
    : `Guarda los tres archivos en la misma carpeta. Compila con javac *.java y ejecuta java Demo${context.model}. El modelo ${context.model} valida los 10 atributos y ${context.model}DAO administra la lista por ${context.key}.`;
  const initial = isVehicle ? files.findIndex(([path]) => path.startsWith("AutomotoraDAO/") && path.endsWith("/Vehiculo.java")) : 0;
  renderProjectFiles(files, isVehicle ? null : context.model, initial);
}

function renderProjectFiles(files, projectName, initial) {
  const controls = byId("project-files");
  controls.replaceChildren();
  const folders = new Map();
  function folder(parent, label, icon, open) {
    if (!folders.has(parent)) folders.set(parent, new Map());
    const children = folders.get(parent);
    if (!children.has(label)) {
      const branch = document.createElement("details");
      const summary = document.createElement("summary");
      branch.open = open;
      summary.append(treeIcon(icon), label);
      branch.append(summary);
      parent.append(branch);
      children.set(label, branch);
    }
    return children.get(label);
  }

  const buttons = files.map(([path]) => {
    const parts = path.split("/");
    const name = parts.pop();
    const module = projectName ?? parts.shift();
    const primary = projectName !== null || module === "AutomotoraDAO";
    const root = folder(controls, module, "☕", primary);
    const isSource = name.endsWith(".java") || name.endsWith(".form");
    let parent = folder(root, isSource ? "Source Packages" : "Project Files", "📁", isSource || projectName !== null);
    if (isSource) {
      const packageName = parts.slice(3).join(".") || "<default package>";
      parent = folder(parent, packageName, "📦", true);
    }
    const button = document.createElement("button");
    button.type = "button";
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
