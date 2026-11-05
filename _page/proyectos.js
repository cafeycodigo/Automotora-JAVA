function javaName(label) {
  return label.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function buildJavaProject(context) {
  const {model, key, format, example, fields} = context;
  const keyName = javaName(key);
  const columns = [[key, example, format], ...fields];
  const names = columns.map(([label]) => javaName(label));
  const values = columns.map(([, value]) => JSON.stringify(value)).join(", ");
  const updated = columns.map(([, value], index) =>
    JSON.stringify(index === 1 ? value + " actualizado" : value)).join(", ");
  const attributes = names.map(name => `    private final String ${name};`).join("\n");
  const parameters = names.map(name => `String ${name}`).join(", ");
  const checks = columns.map(([label, , pattern], index) => {
    const name = names[index];
    const input = index === 0 ? `normalizarClave(${name})` : `textoObligatorio(${name}, "${label}")`;
    return [
      `        this.${name} = ${input};`,
      ...(pattern ? [
        `        if (!this.${name}.matches(${JSON.stringify(pattern.source)})) {`,
        `            throw new IllegalArgumentException("${label} inválido.");`,
        "        }"
      ] : [])
    ].join("\n");
  }).join("\n");
  const normalize = key === "UUID" ? "toLowerCase" : "toUpperCase";
  const getter = "get" + keyName[0].toUpperCase() + keyName.slice(1);
  return [
    [`${model}.java`, `import java.util.Locale;

public class ${model} {
${attributes}

    public ${model}(${parameters}) {
${checks}
    }

    public String ${getter}() {
        return ${keyName};
    }

    static String normalizarClave(String valor) {
        return textoObligatorio(valor, "${key}").${normalize}(Locale.ROOT);
    }

    private static String textoObligatorio(String valor, String campo) {
        if (valor == null || valor.trim().isEmpty()) {
            throw new IllegalArgumentException(campo + " es obligatorio.");
        }
        return valor.trim();
    }

    @Override
    public String toString() {
        return ${names.join(' + " · " + ')};
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
}`],
    [`Demo${model}.java`, `public class Demo${model} {
    public static void main(String[] args) {
        ${model}DAO dao = new ${model}DAO();
        String ${keyName} = ${JSON.stringify(example)};
        ${model} registro = new ${model}(${values});

        System.out.println("Guardar: " + dao.guardar(registro));
        System.out.println("Guardar duplicado: " + dao.guardar(registro));
        System.out.println("Buscar: " + dao.buscar(${keyName}));
        System.out.println("Listar: " + dao.listar());

        ${model} actualizado = new ${model}(${updated});
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
    : `Guarda los tres archivos en la misma carpeta. Compila con javac *.java y ejecuta java Demo${context.model}. El modelo valida la ficha y el DAO administra la lista por ${context.key}.`;
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
